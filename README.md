# Tradenest — B2B Wholesale Marketplace

A demo B2B marketplace with an AI-powered sourcing assistant, built with Node.js, Express, SQLite, and Gemini 2.5 Flash.

---

## What's inside

```
misal-pav/
├── index.html       — frontend UI
├── app.js           — frontend logic (search, filters, cart, chat)
├── styles.css       — all styles
├── server.js        — Express server + Gemini AI route
├── db.js            — SQLite chat history store
├── images/          — product photos
├── data/            — auto-created, holds chat_history.db
└── package.json
└── package-lock.json
```

---

## Requirements

- **Node.js v22.5 or higher** (required for built-in SQLite)
  - Check your version: `node --version`
  - Download from: https://nodejs.org
- A free **Gemini API key**
  - Get one at: https://aistudio.google.com → Get API key → Create API key

---

## Run from scratch

### 1. Clone or download the project

```bash
git clone https://github.com/yourname/tradenest.git
cd misal-pav
```

Or if you downloaded a ZIP, extract it and open a terminal in the folder.

### 2. Install dependencies

```bash
npm install
```

This installs `express` and `dotenv`. Node's built-in SQLite needs no install.

### 3. Add your Gemini API key

Open `server.js` and find line 9:

```js
const GEMINI_API_KEY = "your_key_here";
```

Replace `your_key_here` with your actual key:

```js
const GEMINI_API_KEY = "AIzaSy...your_actual_key...";
```

Save the file.

### 4. Start the server

```bash
node server.js
```

You should see:

```
Tradenest  →  http://localhost:3000
SQLite DB  →  /path/to/data/chat_history.db
Gemini     →  enabled
```

### 5. Open the app

Go to **http://localhost:3000** in your browser.

---

## Using the app

| Feature | How to use |
|---|---|
| Browse products | Scroll the grid, use category tabs |
| Search | Type in the search bar — typo-tolerant |
| Filter | Use sidebar filters or the chip buttons |
| Sort | Use the sort dropdown (price, rating, discount) |
| Product detail | Click any product card |
| AI chat | Open any product → use the chat panel on the right |
| Cart | Click **Add** on any product, then the cart icon |
| Saved items | Click the heart on any product |
| Currency | Click the currency pill in the header |
| Request quote | Open a product → Request quote button |
| RFQ | Click **RFQ** in the nav |

---

## AI sourcing assistant

The chat panel inside each product modal is powered by **Gemini 2.5 Flash**.

- Answers questions about pricing, MOQ, shipping, samples, and customization
- Remembers the full conversation per product (stored in SQLite)
- Handles haggling — escalates discount offers gradually across messages
- Falls back gracefully if the API is unavailable

To reset a product's chat history, open the browser console and run:

```js
clearAssistantChat(6)  // replace 6 with the product ID
```

---

## Stopping the server

Press `Ctrl + C` in the terminal. The SQLite WAL is checkpointed cleanly on exit.

---

## Troubleshooting

**`MODULE_NOT_FOUND` error on start**
```bash
npm install
```

**`Cannot access 'app' before initialization`**
Make sure all `app.post/get` calls come after `const app = express()` in `server.js`.

**Gemini shows `disabled (fallback mode)`**
Your API key is still set to `"your_key_here"`. Edit line 9 of `server.js`.

**Chat not replying / getting old canned responses**
Hard refresh the browser with `Ctrl + Shift + R` to clear the cached `app.js`.

**Port 3000 already in use**
Change the port by editing `server.js`:
```js
const PORT = 3001;
```
Then open http://localhost:3001

**Node version too old (SQLite error)**
```bash
node --version   # must be v22.5 or higher
```
Download the latest LTS from https://nodejs.org

---

## Tech stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla JS, HTML, CSS |
| Backend | Node.js, Express |
| Database | SQLite (Node built-in, no install needed) |
| AI | Google Gemini 2.5 Flash (free tier) |

---

## Notes

- This is a demo project — no real payments or supplier connections
- Product images are stored locally in `/images`
- Chat history persists across page refreshes via SQLite
- If the server isn't running, chat falls back to localStorage automatically
