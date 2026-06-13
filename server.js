"use strict";

const path = require("path");
const express = require("express");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = "insert_api_key_here";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

app.use(express.json({ limit: "64kb" }));

app.use((err, _req, res, next) => {
  if (err && err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "invalid JSON body" });
  }
  next(err);
});

const PRICE_INTENT =
  /(negotiat|bargain|haggl|lower|cheaper|too (expensive|much|pricey)|come down|knock|reduce|drop the price|best price|better deal)/i;

function safe(handler) {
  return (req, res) => {
    try {
      handler(req, res);
    } catch (err) {
      console.error(`[api] ${req.method} ${req.path} failed:`, err.message);
      if (!res.headersSent) res.status(500).json({ error: "server error" });
    }
  };
}

// ============================================================
//  API routes
// ============================================================
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/chat/:chatId/messages", safe((req, res) => {
  const { chatId } = req.params;
  res.json({
    messages: db.getMessages(chatId),
    bargainCount: db.getBargainCount(chatId),
  });
}));

app.post("/api/chat/:chatId/messages", safe((req, res) => {
  const { chatId } = req.params;
  const { productId, role, content } = req.body || {};
  if (typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ error: "content is required" });
  }
  const safeRole    = role === "user" ? "user" : "bot";
  const safeContent = content.slice(0, 4000);
  const pid         = Number.parseInt(productId, 10) || 0;
  db.addMessage(chatId, pid, safeRole, safeContent);
  let bargained = false;
  if (safeRole === "user" && PRICE_INTENT.test(safeContent)) {
    db.incrementBargainCount(chatId, pid);
    bargained = true;
  }
  res.json({ ok: true, bargained, bargainCount: db.getBargainCount(chatId) });
}));

app.delete("/api/chat/:chatId/messages", safe((req, res) => {
  db.clearChat(req.params.chatId);
  res.json({ ok: true });
}));

// ============================================================
//  Gemini AI chat route
// ============================================================
app.post("/api/ai-chat", safe(async (req, res) => {
  const { chatId, userMessage, productContext } = req.body || {};
  if (!userMessage?.trim()) return res.status(400).json({ error: "userMessage required" });

  const history      = db.getMessages(chatId);
  const bargainCount = db.getBargainCount(chatId);

  const systemPrompt = `You are an expert B2B sourcing assistant on Tradenest, a wholesale marketplace.
Keep replies to 2-3 sentences — concise and confident.
Always mention a specific price or number when relevant.
Never say "I don't know" — use the product data below and be helpful.
If asked something outside the product data, give general B2B sourcing advice.
The buyer has haggled ${bargainCount} time(s) — if haggling, escalate discount offers gradually.
Do not use markdown. Do not use bullet points. Write in plain conversational sentences.

CRITICAL RULES:
- Never repeat information you already told the buyer in this conversation.
- If the buyer's question is vague, ask ONE clarifying question instead of dumping all product info.
- Read the full conversation history before replying — don't re-summarize everything.
- If the buyer seems done or satisfied, just confirm and offer to help with something else.
- Match the buyer's energy: short question = short answer. Don't over-explain.

PRODUCT DATA:
${JSON.stringify(productContext, null, 2)}`;

  const contents = [];
  let lastRole = null;

  for (let i = 0; i < history.length; i++) {
    const m = history[i];
    const role = m.role === "user" ? "user" : "model";

    // merge consecutive same-role messages (Gemini errors on these)
    if (role === lastRole && contents.length > 0) {
      contents[contents.length - 1].parts[0].text += "\n" + m.content;
      continue;
    }

    contents.push({ role, parts: [{ text: m.content }] });
    lastRole = role;
  }

  // Gemini requires conversation to start with "user"
  if (contents.length > 0 && contents[0].role === "model") {
    contents.shift();
  }

  // don't duplicate the latest message if it's already in history
  const alreadyHasLatest =
    contents.length > 0 &&
    contents[contents.length - 1].role === "user" &&
    contents[contents.length - 1].parts[0].text === userMessage;

  if (!alreadyHasLatest) {
    contents.push({ role: "user", parts: [{ text: userMessage }] });
  }

  try {
    const r = await fetch(GEMINI_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
      }),
      signal: AbortSignal.timeout(8000),
    });

    const data = await r.json();

    if (r.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
      const reply = data.candidates[0].content.parts[0].text.trim();
      console.log("[ai-chat] Gemini OK");
      return res.json({ reply, bargainCount, source: "gemini" });
    }

    console.warn("[ai-chat] Gemini bad response:", JSON.stringify(data).slice(0, 300));
    return res.status(502).json({ error: "AI unavailable", fallback: true });

  } catch (err) {
    console.warn("[ai-chat] Gemini failed:", err.message);
    return res.status(502).json({ error: "AI unavailable", fallback: true });
  }
}));

// ============================================================
//  Static site
// ============================================================
app.use((req, res, next) => {
  if (/^\/(server\.js|db\.js|package(-lock)?\.json|node_modules|data)(\/|$)/.test(req.path)) {
    return res.status(404).end();
  }
  next();
});
app.use(express.static(__dirname, { index: "index.html", extensions: ["html"] }));

const server = app.listen(PORT, () => {
  console.log(`Tradenest  →  http://localhost:${PORT}`);
  console.log(`SQLite DB  →  ${db.DB_PATH}`);
  console.log(`Gemini     →  enabled`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => {
      db.close();
      process.exit(0);
    });
  });
}