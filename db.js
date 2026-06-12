"use strict";

// ============================================================
//  Tradenest — SQLite store for the Sourcing Assistant
//  Uses Node's built-in `node:sqlite` (Node 22.5+), so there is
//  no native module to compile. Schema adapted from
//  XianyuAutoAgent's context_manager.py:
//    - messages        : full conversation history per chat
//    - bargain_counts  : how many times a buyer has haggled
// ============================================================

const { DatabaseSync } = require("node:sqlite");
const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, "chat_history.db");
const MAX_HISTORY = 100; // messages kept per chat (matches the reference)

const db = new DatabaseSync(DB_PATH);
// Concurrency / durability hardening:
//  - WAL          : readers never block the single writer
//  - busy_timeout : if the file is briefly locked by another writer (backup,
//                   WAL checkpoint, a second instance), wait up to 5s instead
//                   of failing with "SQLITE_BUSY / database is locked"
//  - synchronous=NORMAL : recommended companion to WAL — durable across an app
//                   crash, and faster than the default FULL
db.exec("PRAGMA journal_mode = WAL;");
db.exec("PRAGMA busy_timeout = 5000;");
db.exec("PRAGMA synchronous = NORMAL;");

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id    TEXT    NOT NULL,
    product_id INTEGER NOT NULL,
    role       TEXT    NOT NULL,           -- 'user' | 'bot'
    content    TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_messages_chat ON messages (chat_id, id);

  CREATE TABLE IF NOT EXISTS bargain_counts (
    chat_id      TEXT    PRIMARY KEY,
    product_id   INTEGER,
    count        INTEGER NOT NULL DEFAULT 0,
    last_updated TEXT    NOT NULL DEFAULT (datetime('now'))
  );
`);

// ---- prepared statements ----
const stmtInsert = db.prepare(
  "INSERT INTO messages (chat_id, product_id, role, content) VALUES (?, ?, ?, ?)"
);
const stmtPrune = db.prepare(
  `DELETE FROM messages
     WHERE chat_id = ?
       AND id NOT IN (
         SELECT id FROM messages WHERE chat_id = ? ORDER BY id DESC LIMIT ?
       )`
);
const stmtHistory = db.prepare(
  "SELECT role, content, created_at FROM messages WHERE chat_id = ? ORDER BY id ASC LIMIT ?"
);
const stmtGetBargain = db.prepare(
  "SELECT count FROM bargain_counts WHERE chat_id = ?"
);
const stmtUpsertBargain = db.prepare(
  `INSERT INTO bargain_counts (chat_id, product_id, count, last_updated)
     VALUES (?, ?, 1, datetime('now'))
   ON CONFLICT(chat_id)
     DO UPDATE SET count = count + 1, last_updated = datetime('now')`
);
const stmtDelMessages = db.prepare("DELETE FROM messages WHERE chat_id = ?");
const stmtDelBargain = db.prepare("DELETE FROM bargain_counts WHERE chat_id = ?");

// ---- public API ----
// insert + prune run as one atomic transaction: a single commit (one fsync
// instead of two) and the pair can never be left half-applied on a crash.
function addMessage(chatId, productId, role, content) {
  db.exec("BEGIN");
  try {
    stmtInsert.run(chatId, productId, role, content);
    stmtPrune.run(chatId, chatId, MAX_HISTORY); // keep only the newest MAX_HISTORY
    db.exec("COMMIT");
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }
}

function getMessages(chatId) {
  return stmtHistory.all(chatId, MAX_HISTORY);
}

function getBargainCount(chatId) {
  const row = stmtGetBargain.get(chatId);
  return row ? row.count : 0;
}

function incrementBargainCount(chatId, productId) {
  stmtUpsertBargain.run(chatId, productId);
  return getBargainCount(chatId);
}

function clearChat(chatId) {
  stmtDelMessages.run(chatId);
  stmtDelBargain.run(chatId);
}

// Checkpoint the WAL into the main db file and close cleanly on shutdown
// (stops the -wal file from growing and flushes the last writes).
function close() {
  try {
    db.exec("PRAGMA wal_checkpoint(TRUNCATE);");
    db.close();
  } catch {
    /* already closed */
  }
}

module.exports = {
  addMessage,
  getMessages,
  getBargainCount,
  incrementBargainCount,
  clearChat,
  close,
  DB_PATH,
  MAX_HISTORY,
};
