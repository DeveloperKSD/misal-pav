"use strict";

// ============================================================
//  Tradenest server
//  - serves the existing static site (index.html, app.js, ...)
//  - exposes a tiny chat API backed by SQLite (see db.js)
// ============================================================

const path = require("path");
const express = require("express");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "64kb" }));

// Turn a malformed JSON body into a clean 400 instead of a noisy stack trace.
app.use((err, _req, res, next) => {
  if (err && err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "invalid JSON body" });
  }
  next(err);
});

// Words that signal a buyer is haggling -> bumps the bargain counter,
// which lets the assistant escalate its offer (see app.js).
const PRICE_INTENT =
  /(negotiat|bargain|haggl|lower|cheaper|too (expensive|much|pricey)|come down|knock|reduce|drop the price|best price|better deal)/i;

// ---------------- API ----------------

// Wrap a (synchronous) route handler so any DB error returns a clean 500
// instead of crashing the request. The front-end treats a non-2xx as
// "API unavailable" and falls back to its in-memory log, so the chat UI
// keeps working either way.
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

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Load a conversation (history + current bargain count)
app.get(
  "/api/chat/:chatId/messages",
  safe((req, res) => {
    const { chatId } = req.params;
    res.json({
      messages: db.getMessages(chatId),
      bargainCount: db.getBargainCount(chatId),
    });
  })
);

// Append a message; returns the (possibly incremented) bargain count
app.post(
  "/api/chat/:chatId/messages",
  safe((req, res) => {
    const { chatId } = req.params;
    const { productId, role, content } = req.body || {};

    if (typeof content !== "string" || !content.trim()) {
      return res.status(400).json({ error: "content is required" });
    }
    const safeRole = role === "user" ? "user" : "bot";
    const safeContent = content.slice(0, 4000); // boundary cap
    const pid = Number.parseInt(productId, 10) || 0;

    db.addMessage(chatId, pid, safeRole, safeContent);

    let bargained = false;
    if (safeRole === "user" && PRICE_INTENT.test(safeContent)) {
      db.incrementBargainCount(chatId, pid);
      bargained = true;
    }

    res.json({ ok: true, bargained, bargainCount: db.getBargainCount(chatId) });
  })
);

// Reset a conversation
app.delete(
  "/api/chat/:chatId/messages",
  safe((req, res) => {
    db.clearChat(req.params.chatId);
    res.json({ ok: true });
  })
);

// ---------------- Static site ----------------

// Never expose server-side files over HTTP
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
});

// Close the DB cleanly on Ctrl-C / termination so the WAL is checkpointed.
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(() => {
      db.close();
      process.exit(0);
    });
  });
}
