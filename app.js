/* ============================================================
   Tradenest — B2B marketplace logic
   data · carousels · filters · quote modal · toasts
   ============================================================ */

// ---------- Categories ----------
const CATEGORIES = [
  { id: "all",         label: "All",             icon: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" },
  { id: "phones",      label: "Phones",          icon: "M7 2h10a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1zM10 19h4" },
  { id: "computers",   label: "Computers",       icon: "M4 6h16v10H4zM2 20h20" },
  { id: "audio",       label: "Audio",           icon: "M5 13v-1a7 7 0 0114 0v1M5 13h3v6H6a1 1 0 01-1-1zM19 13h-3v6h2a1 1 0 001-1z" },
  { id: "wearables",   label: "Wearables",       icon: "M9 2.5h6M9 21.5h6M7 6.5a2 2 0 012-2h6a2 2 0 012 2v11a2 2 0 01-2 2H9a2 2 0 01-2-2zM12 9.5v3l2 1.5" },
  { id: "lighting",    label: "Lighting",        icon: "M9 18h6M10 21h4M12 3a6 6 0 00-4 10c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3a6 6 0 00-4-10z" },
  { id: "appliances",  label: "Home & Gadgets",  icon: "M4 11.5 12 4l8 7.5M6 10v10h12V10M10 20v-6h4v6" },
  { id: "mens",        label: "Men's Apparel",   icon: "M8 3L4 6l2 3 2-1v11h8V8l2 1 2-3-4-3a4 4 0 01-8 0z" },
  { id: "womens",      label: "Women's Apparel", icon: "M10 3h4l-1 3 3 5-2 1 1 9H8l1-9-2-1 3-5z" },
  { id: "bags",        label: "Bags & Shoes",    icon: "M6 8h12l-1 12H7zM9 8V6a3 3 0 016 0v2" },
];

// ---------- Products ----------
// kw = image search keyword(s); glyph/grad = graceful fallback if photos don't load
const PRODUCTS = [
  { id: 1,  name: "TWS Wireless Earbuds",        cat: "audio",       kw: "earbuds",  glyph: "🎧", grad:["#7c3aed","#4c1d95"], supplier: "Shenzhen AudioTech",   origin: "Shenzhen",  moq: 100, price: 4.20,   rating: 4.8, reviews: 312, verified: true,  ready: true },
  { id: 2,  name: "6.7\" Flagship Smartphone",   cat: "phones",      kw: "smartphone",    glyph: "📱", grad:["#2563eb","#1e3a8a"], supplier: "Huaqiang Mobile",      origin: "Shenzhen",  moq: 50,  price: 78.00,  rating: 4.6, reviews: 188, verified: true,  ready: false },
  { id: 3,  name: "65W GaN USB-C Charger",       cat: "phones",      kw: "charger",         glyph: "🔌", grad:["#0ea5e9","#0c4a6e"], supplier: "VoltEdge Electronics", origin: "Dongguan",  moq: 200, price: 5.80,   rating: 4.7, reviews: 401, verified: true,  ready: true },
  { id: 4,  name: "20000mAh Power Bank",         cat: "phones",      kw: "powerbank",   glyph: "🔋", grad:["#059669","#064e3b"], supplier: "PowerCore Mfg.",       origin: "Shenzhen",  moq: 100, price: 7.50,   rating: 4.5, reviews: 254, verified: false, ready: false },
  { id: 5,  name: "Portable Bluetooth Speaker",  cat: "audio",       kw: "speaker",   glyph: "🔊", glyphGrad:0, grad:["#9333ea","#581c87"], supplier: "SoundWave Co.",        origin: "Guangzhou", moq: 100, price: 6.90,   rating: 4.6, reviews: 176, verified: true,  ready: true },
  { id: 6,  name: "AMOLED Smart Watch",          cat: "wearables",   kw: "smartwatch",    glyph: "⌚", grad:["#0d9488","#134e4a"], supplier: "WearTech Global",      origin: "Shenzhen",  moq: 50,  price: 12.40,  rating: 4.4, reviews: 533, verified: true,  ready: false, best: true },
  { id: 7,  name: "VR Headset 3D",               cat: "wearables",   kw: "vr",          glyph: "🥽", grad:["#4f46e5","#312e81"], supplier: "NovaView Tech",        origin: "Shenzhen",  moq: 20,  price: 58.00,  rating: 4.3, reviews: 92,  verified: false, ready: false },
  { id: 8,  name: "14\" Business Laptop",        cat: "computers",   kw: "laptop",     glyph: "💻", grad:["#475569","#1e293b"], supplier: "ByteLine Systems",     origin: "Shenzhen",  moq: 10,  price: 185.00, rating: 4.5, reviews: 64,  verified: true,  ready: false },
  { id: 9,  name: "RGB Mechanical Keyboard",     cat: "computers",   kw: "keyboard", glyph: "⌨️", grad:["#db2777","#831843"], supplier: "KeyForge Industrial",  origin: "Dongguan",  moq: 50,  price: 13.50,  rating: 4.7, reviews: 288, verified: true,  ready: true },
  { id: 10, name: "2.4G Wireless Mouse",         cat: "computers",   kw: "computer",      glyph: "🖱️", grad:["#0891b2","#164e63"], supplier: "KeyForge Industrial",  origin: "Shenzhen",  moq: 200, price: 2.30,   rating: 4.5, reviews: 357, verified: true,  ready: false },
  { id: 11, name: "RGB LED Strip 5m",            cat: "lighting",    kw: "led",           glyph: "💡", grad:["#f59e0b","#b45309"], supplier: "BrightLux Lighting",   origin: "Zhongshan", moq: 300, price: 1.80,   rating: 4.6, reviews: 612, verified: true,  ready: true },
  { id: 12, name: "1080P WiFi Security Camera",  cat: "appliances",  kw: "cctv",     glyph: "📷", grad:["#334155","#0f172a"], supplier: "GuardEye Vision",      origin: "Shenzhen",  moq: 50,  price: 9.90,   rating: 4.5, reviews: 203, verified: true,  ready: false },
  { id: 13, name: "4K Camera Drone",             cat: "appliances",  kw: "drone",    glyph: "🚁", grad:["#1d4ed8","#1e3a8a"], supplier: "AeroSky Robotics",     origin: "Shenzhen",  moq: 20,  price: 42.00,  rating: 4.3, reviews: 121, verified: false, ready: false },
  { id: 14, name: "Robot Vacuum Cleaner",        cat: "appliances",  kw: "vacuum",        glyph: "🤖", grad:["#0e7490","#155e75"], supplier: "HomeBot Appliances",   origin: "Ningbo",    moq: 30,  price: 46.00,  rating: 4.4, reviews: 145, verified: true,  ready: false },
  { id: 15, name: "Digital Air Fryer 5L",        cat: "appliances",  kw: "airfryer",    glyph: "🍳", grad:["#ea580c","#9a3412"], supplier: "KitchenPro Mfg.",      origin: "Ningbo",    moq: 50,  price: 19.50,  rating: 4.6, reviews: 276, verified: true,  ready: true },
  { id: 16, name: "Men's Cotton T-Shirt",        cat: "mens",        kw: "tshirt",      glyph: "👕", grad:["#2563eb","#1e40af"], supplier: "Canton Apparel Co.",   origin: "Guangzhou", moq: 300, price: 2.10,   rating: 4.7, reviews: 844, verified: true,  ready: true },
  { id: 17, name: "Slim-fit Denim Jeans",        cat: "mens",        kw: "jeans",         glyph: "👖", grad:["#1e3a8a","#172554"], supplier: "DenimWorks Factory",   origin: "Guangzhou", moq: 200, price: 6.80,   rating: 4.5, reviews: 419, verified: true,  ready: false },
  { id: 18, name: "Women's Summer Dress",        cat: "womens",      kw: "dress",       glyph: "👗", grad:["#db2777","#9d174d"], supplier: "Hangzhou Silk House",  origin: "Hangzhou",  moq: 100, price: 5.60,   rating: 4.6, reviews: 528, verified: true,  ready: false, best: true },
  { id: 19, name: "Running Sneakers",            cat: "bags",        kw: "sneakers",      glyph: "👟", grad:["#b45309","#78350f"], supplier: "StridePro Footwear",   origin: "Jinjiang",  moq: 100, price: 8.90,   rating: 4.6, reviews: 372, verified: true,  ready: false },
  { id: 20, name: "Travel Backpack",             cat: "bags",        kw: "backpack",      glyph: "🎒", grad:["#92400e","#451a03"], supplier: "UrbanCarry Bags",      origin: "Baigou",    moq: 100, price: 4.40,   rating: 4.5, reviews: 261, verified: true,  ready: true },
];

// ============================================================
//  PRODUCT IMAGES
//  Premium real product photos stored locally for presentation-safe rendering.
// ============================================================
const PHOTOS = {
  1: ["images/product-01-earbuds-card.jpg"],
  2: ["images/product-02-smartphone-card.jpg"],
  3: ["images/product-03-charger-card.jpg"],
  4: ["images/product-04-power-bank-card.jpg"],
  5: ["images/product-05-speaker-card.jpg"],
  6: ["images/product-06-smart-watch-card.jpg"],
  7: ["images/product-07-vr-headset-card.jpg"],
  8: ["images/product-08-laptop-card.jpg"],
  9: ["images/product-09-keyboard-card.jpg"],
  10: ["images/product-10-mouse-card.jpg"],
  11: ["images/product-11-led-strip-card.jpg"],
  12: ["images/product-12-security-camera-card.jpg"],
  13: ["images/product-13-drone-card.jpg"],
  14: ["images/product-14-robot-vacuum-card.jpg"],
  15: ["images/product-15-air-fryer-card.jpg"],
  16: ["images/product-16-tshirt-card.jpg"],
  17: ["images/product-17-jeans-card.jpg"],
  18: ["images/product-18-dress-card.jpg"],
  19: ["images/product-19-sneakers-card.jpg"],
  20: ["images/product-20-backpack-card.jpg"],
};

// build image list + price tiers + lead time for each product
// DEALS: product id -> discount % (drives the Amazon-style sale pricing)
const DEALS = { 1: 25, 3: 15, 5: 18, 6: 30, 9: 20, 11: 33, 12: 20, 15: 22, 18: 28, 20: 20 };
PRODUCTS.forEach((p) => {
  p.images = PHOTOS[p.id] || [];
  p.tiers = [
    { min: p.moq,      price: +(p.price).toFixed(2) },
    { min: p.moq * 5,  price: +(p.price * 0.93).toFixed(2) },
    { min: p.moq * 10, price: +(p.price * 0.86).toFixed(2) },
  ];
  p.priceLow = p.tiers[2].price;
  p.priceHigh = p.tiers[0].price;
  p.lead = p.ready ? "3\u20137 days" : "15\u201330 days";
  // deal / compare-at pricing
  const d = DEALS[p.id] || 0;
  p.discount = d;
  p.deal = d > 0;
  if (d) {
    p.listLow = +(p.priceLow / (1 - d / 100)).toFixed(2);
    p.listHigh = +(p.priceHigh / (1 - d / 100)).toFixed(2);
  }
});

// ---------- State ----------
const state = {
  category: "all", query: "", sort: "recommended",
  readyOnly: false, verifiedOnly: false, onSale: false,
  minRating: 0, price: "any", priceMin: null, priceMax: null, moq: "any", qty: null,
  filtersOpen: true, currency: "USD", wishlist: new Set(), cart: new Map(),
};

// ---------- Currencies ----------
const CURRENCIES = {
  USD: { symbol: "US$", rate: 1 },
  EUR: { symbol: "\u20ac",  rate: 0.92 },
  GBP: { symbol: "\u00a3",  rate: 0.79 },
  INR: { symbol: "\u20b9",  rate: 83.2 },
  CNY: { symbol: "\u00a5",  rate: 7.25 },
};

// ---------- Helpers ----------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const catById = (id) => CATEGORIES.find((c) => c.id === id);
const usd = (n) => "US$" + n.toFixed(2);
const money = (n) => {
  const c = CURRENCIES[state.currency];
  const v = n * c.rate;
  return c.symbol + (v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(2));
};
const prodById = (id) => PRODUCTS.find((p) => p.id === id);
// pick the unit price for a given order quantity (volume tiers)
const tierPrice = (p, qty) => {
  let price = p.tiers[0].price;
  for (const t of p.tiers) if (qty >= t.min) price = t.price;
  return price;
};
const catIcon = (cat, size = 24) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="${cat.icon}"/></svg>`;
const starSvg = `<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 .9l2.2 4.5 5 .7-3.6 3.5.9 4.9L8 12.7 3.6 15l.9-4.9L.9 6.6l5-.7z"/></svg>`;
// Amazon-style 5-star row with partial fill + blue review-count link
function starsRow(rating, reviews) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  const five = starSvg.repeat(5);
  return `<span class="stars" role="img" aria-label="${rating} out of 5 stars">
      <span class="stars-bg">${five}</span>
      <span class="stars-fg" style="width:${pct}%">${five}</span>
    </span>${reviews != null ? `<a class="reviews" href="#" onclick="return false">${reviews.toLocaleString()}</a>` : ""}`;
}
const checkSvg = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 1l5 2v4c0 3.4-2.2 6.4-5 7.4C5.2 13.4 3 10.4 3 7V3l5-2z"/><path d="M5.8 7.8l1.5 1.5L10.4 6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const xSvg = `<svg viewBox="0 0 16 16" width="15" height="15" fill="none"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;

// graceful image fallback (called inline on <img> error)
window.imgFail = function (img) {
  const slide = img.closest(".slide, .m-main");
  if (!slide) return;
  const grad = img.dataset.grad, glyph = img.dataset.glyph;
  img.remove();
  slide.classList.add("fallback", "ready");
  slide.style.setProperty("--g", `linear-gradient(135deg, ${grad})`);
  if (!slide.querySelector(".fb-glyph") && !slide.querySelector(".fb"))
    slide.insertAdjacentHTML("beforeend", `<span class="fb-glyph">${glyph}</span>`);
};
window.imgOk = function (img) {
  img.classList.add("loaded");
  const slide = img.closest(".slide");
  if (slide) slide.classList.add("ready");
};

// ============================================================
//  Category tabs + search dropdown
// ============================================================
function renderCategories() {
  const track = $("#catTrack");
  const select = $("#qCategory");
  track.innerHTML = "";
  while (select.options.length > 1) select.remove(1);

  CATEGORIES.forEach((cat) => {
    const count = cat.id === "all" ? PRODUCTS.length : PRODUCTS.filter((p) => p.cat === cat.id).length;
    const btn = document.createElement("button");
    btn.className = "cat-item" + (state.category === cat.id ? " is-active" : "");
    btn.type = "button";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", state.category === cat.id);
    btn.innerHTML = `<span class="ci-ico">${catIcon(cat)}</span><span>${cat.label}</span>`;
    btn.addEventListener("click", () => {
      state.category = cat.id;
      renderCategories();
      render();
    });
    track.appendChild(btn);

    if (cat.id !== "all") {
      const opt = document.createElement("option");
      opt.value = cat.id;
      opt.textContent = `${cat.label} (${count})`;
      select.appendChild(opt);
    }
  });
  select.value = state.category;
}

// ============================================================
//  Filter sidebar (Amazon-style facets)
// ============================================================
const RATING_OPTS = [4.7, 4.5, 4.0];
const PRICE_OPTS = [
  { v: "u5",    label: "Under US$5",      test: (n) => n < 5 },
  { v: "5-20",  label: "US$5 to US$20",   test: (n) => n >= 5 && n < 20 },
  { v: "20-50", label: "US$20 to US$50",  test: (n) => n >= 20 && n < 50 },
  { v: "50p",   label: "US$50 & above",   test: (n) => n >= 50 },
];
const MOQ_OPTS = [
  { v: "50",  label: "50 pcs or fewer" },
  { v: "100", label: "100 pcs or fewer" },
  { v: "200", label: "200 pcs or fewer" },
];
const boxCheck = `<span class="box"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.5 3.5L13 5"/></svg></span>`;
const boxRadio = `<span class="box radio"></span>`;

// ============================================================
//  Product search — tokenized, synonym-aware, typo-tolerant, ranked
// ============================================================
// Common B2B filler words that shouldn't drive matching on their own.
const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "for", "with", "of", "to", "in", "on", "my", "your",
  "pcs", "pc", "piece", "pieces", "unit", "units", "set", "pack", "lot",
  "buy", "cheap", "best", "good", "new", "hot", "sale", "price", "prices", "quality",
  "wholesale", "bulk", "factory", "supplier", "suppliers", "china", "oem", "odm",
]);

// Groups of interchangeable terms so buyers find items by alternate names.
const SYNONYM_GROUPS = [
  ["earbuds", "earbud", "earphone", "earphones", "headphone", "headphones", "airpods", "tws"],
  ["speaker", "speakers", "soundbar", "boombox"],
  ["phone", "smartphone", "mobile", "cellphone", "android"],
  ["laptop", "notebook", "ultrabook", "computer", "pc"],
  ["charger", "charging", "adapter", "gan"],
  ["power bank", "powerbank", "battery"],
  ["watch", "smartwatch", "wearable", "wristwatch"],
  ["vr", "headset", "goggles"],
  ["keyboard", "mechanical", "keypad"],
  ["mouse", "mice"],
  ["camera", "cctv", "surveillance", "security", "webcam"],
  ["drone", "quadcopter", "uav"],
  ["vacuum", "cleaner", "hoover"],
  ["led", "light", "lighting", "lamp"],
  ["tshirt", "t-shirt", "tee", "shirt"],
  ["jeans", "denim"],
  ["dress", "gown"],
  ["sneakers", "sneaker", "shoe", "shoes", "trainers", "footwear"],
  ["backpack", "bag", "rucksack", "daypack"],
  ["air fryer", "airfryer", "fryer"],
];
const SYN_INDEX = (() => {
  const idx = {};
  for (const group of SYNONYM_GROUPS) for (const w of group) idx[w] = group;
  return idx;
})();

const tokenize = (q) =>
  q.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t && !STOP_WORDS.has(t));

// terms cache so we don't re-tokenize for every product comparison
let _termsCache = { q: null, terms: [] };
function currentTerms() {
  if (_termsCache.q !== state.query) _termsCache = { q: state.query, terms: tokenize(state.query) };
  return _termsCache.terms;
}

// weighted searchable fields per product (cached on first use)
function searchFields(p) {
  if (!p._searchFields)
    p._searchFields = [
      { text: p.name.toLowerCase(), w: 10 },
      { text: catById(p.cat).label.toLowerCase(), w: 5 },
      { text: (p.kw || "").toLowerCase(), w: 4 },
      { text: p.supplier.toLowerCase(), w: 2 },
      { text: p.origin.toLowerCase(), w: 2 },
    ];
  return p._searchFields;
}

// true if a and b differ by at most one edit (cheap typo tolerance)
function within1(a, b) {
  if (a === b) return true;
  const la = a.length, lb = b.length;
  if (Math.abs(la - lb) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < la && j < lb) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (la > lb) i++;
    else if (lb > la) j++;
    else { i++; j++; }
  }
  if (i < la || j < lb) edits++;
  return edits <= 1;
}

// score one query term against a product's fields (0 = no match for that term)
function termScore(term, fields) {
  const expansions = SYN_INDEX[term] || [term];
  let best = 0;
  for (const f of fields) {
    if (!f.text) continue;
    const words = f.text.split(/\s+/);
    for (const exp of expansions) {
      const syn = exp !== term ? 0.7 : 1; // synonym hits count a little less
      if (words.includes(exp)) best = Math.max(best, f.w * 1.5 * syn);            // exact word
      else if (exp.length >= 2 && words.some((w) => w.startsWith(exp))) best = Math.max(best, f.w * 1.0 * syn); // prefix
      else if (f.text.includes(exp)) best = Math.max(best, f.w * 0.7 * syn);       // substring
    }
    // typo tolerance on the typed term only (whole words, length >= 4)
    if (best === 0 && term.length >= 4 && words.some((w) => w.length >= 4 && within1(w, term)))
      best = f.w * 0.6;
  }
  return best;
}

// overall relevance for the current query (every term must match: AND)
function searchScore(p) {
  const terms = currentTerms();
  if (!terms.length) return 1; // no query -> neutral pass
  const fields = searchFields(p);
  let total = 0;
  for (const t of terms) {
    const s = termScore(t, fields);
    if (s === 0) return 0;
    total += s;
  }
  return total;
}

function inSearch(p) {
  return searchScore(p) > 0;
}
function ratingStars(threshold) {
  let s = "";
  for (let i = 1; i <= 5; i++)
    s += `<svg class="${i <= Math.round(threshold) ? "" : "off"}" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .9l2.2 4.5 5 .7-3.6 3.5.9 4.9L8 12.7 3.6 15l.9-4.9L.9 6.6l5-.7z"/></svg>`;
  return `<span class="rstars">${s}</span>`;
}
function fopt(active, kind, attrs, inner, count) {
  return `<button class="flt-opt ${active ? "on" : ""}" ${attrs}>
      ${kind === "radio" ? boxRadio : boxCheck}
      <span class="lbl">${inner}</span>
      ${count != null ? `<span class="cnt">${count}</span>` : ""}
    </button>`;
}

function renderFilters() {
  const el = $("#filters");
  if (!el) return;
  const base = categoryAndSearch();            // dept + search applied
  const inDept = (fn) => base.filter(fn).length;

  // Department
  const deptRows =
    fopt(state.category === "all", "radio", `data-flt="cat" data-val="all"`,
      "All departments", PRODUCTS.filter(inSearch).length) +
    CATEGORIES.filter((c) => c.id !== "all").map((c) =>
      fopt(state.category === c.id, "radio", `data-flt="cat" data-val="${c.id}"`,
        c.label, PRODUCTS.filter((p) => p.cat === c.id && inSearch(p)).length)
    ).join("");

  // Customer review
  const ratingRows = RATING_OPTS.map((v) =>
    fopt(state.minRating === v, "radio", `data-flt="rating" data-val="${v}"`,
      `${ratingStars(v)} &amp; up`, inDept((p) => p.rating >= v))
  ).join("");

  // Price
  const priceRows = PRICE_OPTS.map((o) =>
    fopt(state.price === o.v, "radio", `data-flt="price" data-val="${o.v}"`,
      o.label, inDept((p) => o.test(p.priceLow)))
  ).join("");
  const customPrice = `
    <div class="flt-price-row">
      <input id="fltMin" type="text" inputmode="numeric" placeholder="Min" value="${state.priceMin ?? ""}" aria-label="Min price" />
      <span>–</span>
      <input id="fltMax" type="text" inputmode="numeric" placeholder="Max" value="${state.priceMax ?? ""}" aria-label="Max price" />
    </div>
    <button class="flt-go" id="fltGo">Apply price</button>`;

  // Min order
  const moqRows = MOQ_OPTS.map((o) =>
    fopt(state.moq === o.v, "radio", `data-flt="moq" data-val="${o.v}"`,
      o.label, inDept((p) => p.moq <= Number(o.v)))
  ).join("");

  el.innerHTML = `
    <div class="flt-top">
      <h3>Filters</h3>
      <button class="flt-clear" id="fltClear">Clear all</button>
    </div>
    <div class="flt-group"><h4>Department</h4>${deptRows}</div>
    <div class="flt-group"><h4>Customer review</h4>${ratingRows}</div>
    <div class="flt-group"><h4>Price (US$/pc)</h4>${priceRows}${customPrice}</div>
    <div class="flt-group"><h4>Deals &amp; offers</h4>
      ${fopt(state.onSale, "check", `data-flt="onSale"`, "On sale", inDept((p) => p.deal))}
    </div>
    <div class="flt-group"><h4>Supplier</h4>
      ${fopt(state.verifiedOnly, "check", `data-flt="verified"`, "Verified supplier", inDept((p) => p.verified))}
    </div>
    <div class="flt-group"><h4>Availability</h4>
      ${fopt(state.readyOnly, "check", `data-flt="ready"`, "Ready to ship", inDept((p) => p.ready))}
    </div>
    <div class="flt-group"><h4>Min. order</h4>${moqRows}</div>`;
}

// active-filter count, chip sync, combined apply
function activeFilterCount() {
  let n = 0;
  if (state.category !== "all") n++;
  if (state.minRating > 0) n++;
  if (state.price !== "any" || state.priceMin != null || state.priceMax != null) n++;
  if (state.moq !== "any") n++;
  if (state.onSale) n++;
  if (state.verifiedOnly) n++;
  if (state.readyOnly) n++;
  return n;
}
function updateFilterCount() {
  const b = $("#ftCount");
  if (!b) return;
  const n = activeFilterCount();
  b.textContent = n; b.hidden = n === 0;
}
function syncChips() {
  $("#readyChip") && $("#readyChip").setAttribute("aria-pressed", String(state.readyOnly));
  $("#verifiedChip") && $("#verifiedChip").setAttribute("aria-pressed", String(state.verifiedOnly));
  $("#saleChip") && $("#saleChip").setAttribute("aria-pressed", String(state.onSale));
}
function applyAll() {
  render();
  renderFilters();
  syncChips();
  updateFilterCount();
}
function setFilters(open) {
  state.filtersOpen = open;
  document.querySelector(".main").classList.toggle("filters-open", open);
  $("#filterToggle") && $("#filterToggle").setAttribute("aria-expanded", String(open));
}
function clearFilters() {
  Object.assign(state, {
    category: "all", query: "", sort: "recommended",
    readyOnly: false, verifiedOnly: false, onSale: false,
    minRating: 0, price: "any", priceMin: null, priceMax: null, moq: "any", qty: null,
  });
  $("#qProduct").value = ""; $("#qCategory").value = "all"; $("#sortSelect").value = "recommended";
  $("#qQty") && ($("#qQty").value = "");
  renderCategories();
  applyAll();
}
function wireFilters() {
  const el = $("#filters");
  if (!el) return;
  el.addEventListener("click", (e) => {
    if (e.target.closest("#fltClear")) { clearFilters(); return; }
    if (e.target.closest("#fltGo")) {
      const mn = parseFloat($("#fltMin").value), mx = parseFloat($("#fltMax").value);
      state.priceMin = isNaN(mn) ? null : mn;
      state.priceMax = isNaN(mx) ? null : mx;
      state.price = "any";
      applyAll();
      return;
    }
    const opt = e.target.closest("[data-flt]");
    if (!opt) return;
    const f = opt.dataset.flt, v = opt.dataset.val;
    if (f === "cat") { state.category = v; renderCategories(); }
    else if (f === "rating") { state.minRating = state.minRating === Number(v) ? 0 : Number(v); }
    else if (f === "price") { state.price = state.price === v ? "any" : v; state.priceMin = null; state.priceMax = null; }
    else if (f === "moq") { state.moq = state.moq === v ? "any" : v; }
    else if (f === "onSale") { state.onSale = !state.onSale; }
    else if (f === "verified") { state.verifiedOnly = !state.verifiedOnly; }
    else if (f === "ready") { state.readyOnly = !state.readyOnly; }
    applyAll();
  });
}

// ============================================================
//  Filtering + sorting
// ============================================================
// products narrowed by department + search only (used for facet counts)
function categoryAndSearch() {
  let list = PRODUCTS.slice();
  if (state.category !== "all") list = list.filter((p) => p.cat === state.category);
  if (currentTerms().length) list = list.filter((p) => searchScore(p) > 0);
  return list;
}

// price-bucket predicate (uses the per-piece low tier)
function matchPrice(p) {
  const v = p.priceLow;
  if (state.priceMin != null && v < state.priceMin) return false;
  if (state.priceMax != null && v > state.priceMax) return false;
  switch (state.price) {
    case "u5":    return v < 5;
    case "5-20":  return v >= 5 && v < 20;
    case "20-50": return v >= 20 && v < 50;
    case "50p":   return v >= 50;
    default:      return true;
  }
}
function matchMoq(p) {
  return state.moq === "any" ? true : p.moq <= Number(state.moq);
}
// order-qty box: only show suppliers whose MOQ you can actually meet
function matchQty(p) {
  return state.qty == null ? true : p.moq <= state.qty;
}

function getVisible() {
  let list = categoryAndSearch();
  if (state.readyOnly) list = list.filter((p) => p.ready);
  if (state.verifiedOnly) list = list.filter((p) => p.verified);
  if (state.onSale) list = list.filter((p) => p.deal);
  if (state.minRating > 0) list = list.filter((p) => p.rating >= state.minRating);
  list = list.filter(matchPrice).filter(matchMoq).filter(matchQty);

  // an explicit sort always wins; otherwise rank by search relevance
  if (state.sort === "recommended" && currentTerms().length) {
    list.sort((a, b) => searchScore(b) - searchScore(a));
  } else {
    switch (state.sort) {
      case "priceAsc":  list.sort((a, b) => a.priceLow - b.priceLow); break;
      case "priceDesc": list.sort((a, b) => b.priceLow - a.priceLow); break;
      case "rating":    list.sort((a, b) => b.rating - a.rating); break;
      case "discount":  list.sort((a, b) => b.discount - a.discount); break;
      case "moq":       list.sort((a, b) => a.moq - b.moq); break;
    }
  }
  return list;
}

// ============================================================
//  Card markup
// ============================================================
// brand house mark (used inside placeholders)
const brandMarkSvg = `<svg viewBox="0 0 32 32" fill="none"><path d="M10 21V13l6-3.5 6 3.5v8" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 21v-4h6v4" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// elegant placeholder shown until a product has real photos
function placeholderHtml(p, large = false) {
  const cat = catById(p.cat);
  return `<div class="ph${large ? " ph-lg" : ""}" style="--tint:${p.grad[0]}">
      <span class="ph-tex"></span>
      <span class="ph-frame"></span>
      <span class="ph-mono">${brandMarkSvg}</span>
      <span class="ph-plate">${catIcon(cat, large ? 56 : 40)}</span>
      <span class="ph-cap">Image coming soon</span>
    </div>`;
}

// media: real-photo carousel, or placeholder when no photos yet
function mediaInner(p) {
  if (!p.images.length) return placeholderHtml(p);
  const slides = p.images
    .map(
      (src) =>
        `<div class="slide"><img src="${src}" alt="${p.name}" loading="lazy"
            data-grad="${p.grad.join(",")}" data-glyph="${p.glyph}"
            onload="imgOk(this)" onerror="imgFail(this)"></div>`
    )
    .join("");
  const multi = p.images.length > 1;
  const navs = multi
    ? `<button class="car-nav prev" data-dir="-1" aria-label="Previous image" disabled>
          <svg viewBox="0 0 16 16"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button class="car-nav next" data-dir="1" aria-label="Next image">
          <svg viewBox="0 0 16 16"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>`
    : "";
  const dots = multi
    ? `<div class="dots">${p.images.map((_, i) => `<i class="dot ${i === 0 ? "on" : ""}"></i>`).join("")}</div>`
    : "";
  return `<div class="carousel" data-idx="0"><div class="track">${slides}</div>${navs}${dots}</div>`;
}

function cardHtml(p) {
  const liked = state.wishlist.has(p.id);
  const ribbons = [];
  if (p.deal) ribbons.push(`<span class="ribbon deal">−${p.discount}%</span>`);
  if (p.best) ribbons.push(`<span class="ribbon best">Best seller</span>`);
  if (p.ready) ribbons.push(`<span class="ribbon ship">Ready to ship</span>`);

  const priceBlock = p.deal
    ? `<p class="price">
         <span class="now"><strong>${money(p.priceLow)}</strong>–${money(p.priceHigh)}</span> <span class="per">/ pc</span>
         <span class="deal-line"><span class="was">${money(p.listLow)}</span><span class="save">Save ${p.discount}%</span></span>
       </p>`
    : `<p class="price"><strong>${money(p.priceLow)}</strong>–${money(p.priceHigh)} <span class="per">/ pc</span></p>`;

  return `
  <article class="card" data-id="${p.id}">
    <div class="media">
      ${mediaInner(p)}
      ${ribbons.length ? `<div class="ribbons">${ribbons.join("")}</div>` : ""}
      <button class="wish ${liked ? "on" : ""}" data-like="${p.id}" aria-label="Shortlist" aria-pressed="${liked}">
        <svg viewBox="0 0 32 32"><path d="M16 28c7-4.7 13-10 13-16a6.5 6.5 0 00-13-1 6.5 6.5 0 00-13 1c0 6 6 11.3 13 16z"/></svg>
      </button>
    </div>
    <div class="info">
      <span class="title" title="${p.name}">${p.name}</span>
      <div class="stars-row">${starsRow(p.rating, p.reviews)}</div>
      <p class="supplier">${p.supplier}${p.verified ? ` <span class="vbadge">${checkSvg} Verified</span>` : ""}</p>
      <p class="moq">Min. order ${p.moq} pcs · ${p.origin}, CN</p>
      <div class="price-row">
        ${priceBlock}
        <button class="add-btn" data-add="${p.id}" aria-label="Add ${p.name} to inquiry cart">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg>
          Add
        </button>
      </div>
    </div>
  </article>`;
}

function skeletonHtml() {
  return `<div class="card sk-card"><div class="media"></div>
    <div class="sk-line w70"></div><div class="sk-line w50"></div><div class="sk-line w40"></div></div>`;
}

// ============================================================
//  Render
// ============================================================
let firstPaint = true;
function render() {
  const grid = $("#grid");
  const empty = $("#empty");
  const list = getVisible();

  // headline + count
  const cat = state.category === "all" ? "All categories" : catById(state.category).label;
  $("#headline").textContent = currentTerms().length
    ? `Results for “${state.query.trim()}”`
    : cat;

  if (list.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
    $("#count").textContent = "0 products";
    return;
  }
  empty.hidden = true;

  // brief skeleton on first paint for a polished load
  if (firstPaint) {
    grid.innerHTML = Array.from({ length: 10 }, skeletonHtml).join("");
    $("#count").textContent = "Loading products…";
    setTimeout(() => paint(list), 420);
    firstPaint = false;
  } else {
    paint(list);
  }
}

function paint(list) {
  const grid = $("#grid");
  grid.innerHTML = list.map(cardHtml).join("");
  $("#count").textContent = `${list.length} ${list.length === 1 ? "product" : "products"} · sourced from verified suppliers`;
}

// ============================================================
//  Card interactions (delegated)
// ============================================================
function wireGrid() {
  const grid = $("#grid");

  grid.addEventListener("click", (e) => {
    const nav = e.target.closest(".car-nav");
    const like = e.target.closest("[data-like]");
    const add = e.target.closest("[data-add]");
    const dot = e.target.closest(".dot");
    const card = e.target.closest(".card");

    if (nav) {
      e.stopPropagation();
      moveCarousel(nav.closest(".carousel"), Number(nav.dataset.dir));
      return;
    }
    if (dot) {
      e.stopPropagation();
      const dots = [...dot.parentElement.children];
      setCarousel(dot.closest(".carousel"), dots.indexOf(dot));
      return;
    }
    if (like) {
      e.stopPropagation();
      toggleWish(Number(like.dataset.like), like);
      return;
    }
    if (add) {
      e.stopPropagation();
      addToCart(Number(add.dataset.add));
      add.classList.add("added");
      add.innerHTML = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.5 3.5L13 5"/></svg> Added`;
      setTimeout(() => {
        add.classList.remove("added");
        add.innerHTML = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg> Add`;
      }, 1400);
      return;
    }
    if (card) openModal(Number(card.dataset.id));
  });
}

function moveCarousel(car, dir) {
  const n = car.querySelectorAll(".slide").length;
  let idx = Number(car.dataset.idx) + dir;
  idx = Math.max(0, Math.min(n - 1, idx));
  setCarousel(car, idx);
}
function setCarousel(car, idx) {
  const n = car.querySelectorAll(".slide").length;
  car.dataset.idx = idx;
  car.querySelector(".track").style.transform = `translateX(-${idx * 100}%)`;
  car.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("on", i === idx));
  car.querySelector(".prev").disabled = idx === 0;
  car.querySelector(".next").disabled = idx === n - 1;
}

function toggleWish(id, btn) {
  const liked = state.wishlist.has(id);
  if (liked) state.wishlist.delete(id);
  else state.wishlist.add(id);
  btn.classList.toggle("on", !liked);
  btn.classList.add("pop");
  btn.setAttribute("aria-pressed", String(!liked));
  setTimeout(() => btn.classList.remove("pop"), 320);
  updateBadges();
  if (currentDrawer === "saved") renderDrawer();
  toast(liked ? "Removed from shortlist" : "Added to shortlist");
}

// ============================================================
//  Chatbot persistence — SQLite backend when the server is running,
//  localStorage when it isn't. Saves every message and a per-chat
//  "bargain counter" so the assistant can escalate haggling across
//  visits (mirrors the XianyuAutoAgent bargain_count). Because of the
//  localStorage fallback the page also works opened directly (file://)
//  — chats just persist per-browser instead of in the shared database.
// ============================================================
let API_OK = true;
function visitorId() {
  let v = localStorage.getItem("tradenest_visitor");
  if (!v) {
    v = (window.crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : "v" + Date.now().toString(36) + Math.random().toString(36).slice(2);
    localStorage.setItem("tradenest_visitor", v);
  }
  return v;
}
const chatIdFor = (productId) => `${visitorId()}-p${productId}`;

// ---- offline fallback store (localStorage) ----
// Mirrors the server's behaviour so the chatbot fully works with no server:
// open index.html directly and conversations + bargain count survive refreshes.
const LS_HISTORY_CAP = 100; // mirror the server's MAX_HISTORY
// same haggle detector the server uses, so offline bargaining still escalates
const HAGGLE_INTENT = /(negotiat|bargain|haggl|lower|cheaper|too (expensive|much|pricey)|come down|knock|reduce|drop the price|best price|better deal)/i;
const localStore = {
  _key: (chatId) => `tradenest_chat_${chatId}`,
  _read(chatId) {
    try { return JSON.parse(localStorage.getItem(this._key(chatId))) || { messages: [], bargainCount: 0 }; }
    catch { return { messages: [], bargainCount: 0 }; }
  },
  _write(chatId, data) {
    try { localStorage.setItem(this._key(chatId), JSON.stringify(data)); } catch { /* quota / private mode */ }
  },
  getMessages(chatId) { return this._read(chatId).messages; },
  addMessage(chatId, role, content) {
    const d = this._read(chatId);
    d.messages.push({ role, content, created_at: new Date().toISOString() });
    if (d.messages.length > LS_HISTORY_CAP) d.messages = d.messages.slice(-LS_HISTORY_CAP);
    if (role === "user" && HAGGLE_INTENT.test(content)) d.bargainCount = (d.bargainCount || 0) + 1;
    this._write(chatId, d);
    return { bargainCount: d.bargainCount || 0 };
  },
  clear(chatId) { try { localStorage.removeItem(this._key(chatId)); } catch { /* ignore */ } },
};

async function apiGetMessages(chatId) {
  if (API_OK) {
    try {
      const r = await fetch(`/api/chat/${encodeURIComponent(chatId)}/messages`);
      if (!r.ok) throw new Error("HTTP " + r.status);
      const data = await r.json();
      return data.messages || [];
    } catch { API_OK = false; }
  }
  return localStore.getMessages(chatId); // no server -> localStorage
}
async function apiAddMessage(chatId, productId, role, content) {
  if (API_OK) {
    try {
      const r = await fetch(`/api/chat/${encodeURIComponent(chatId)}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, role, content }),
      });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.json();
    } catch { API_OK = false; }
  }
  return localStore.addMessage(chatId, role, content); // no server -> localStorage
}
async function apiClearChat(chatId) {
  if (API_OK) {
    try {
      const r = await fetch(`/api/chat/${encodeURIComponent(chatId)}/messages`, { method: "DELETE" });
      if (r.ok) return;
      throw new Error("HTTP " + r.status);
    } catch { API_OK = false; }
  }
  localStore.clear(chatId);
}
// console helper to reset a product's thread:  clearAssistantChat(6)
window.clearAssistantChat = (productId) => apiClearChat(chatIdFor(productId));

// ============================================================
//  Product AI assistant (answers from the product's own data)
// ============================================================
function assistantReply(p, qRaw, bargainCount = 0) {
  const cat = catById(p.cat);
  const q = qRaw.toLowerCase();
  const has = (...ks) => ks.some((k) => q.includes(k));
  const t = p.tiers;
  const priceLine = `${money(t[0].price)} at ${t[0].min} pcs, ${money(t[1].price)} from ${t[1].min} pcs, and ${money(t[2].price)} from ${t[2].min}+ pcs`;

  if (has("hello", "hi ", "hey", "help"))
    return `Hi! I can help with pricing, MOQ, shipping, samples, customization, or comparing options for the <b>${p.name}</b>. What would you like to know?`;

  if (has("price", "cost", "cheap", "how much", "rate", "unit"))
    return `Volume pricing for the <b>${p.name}</b>: ${priceLine}. ${p.deal ? `It's currently <b>${p.discount}% off</b> — a great time to order.` : "Larger orders unlock the lower tiers."}`;

  if (has("discount", "deal", "sale", "offer", "coupon"))
    return p.deal
      ? `Yes — the <b>${p.name}</b> is <b>${p.discount}% off</b> right now (was ${money(p.listLow)}/pc, now from ${money(p.priceLow)}/pc). You can stack the bulk tiers on top for even better rates.`
      : `There's no active discount on this item, but the price still drops with volume: ${priceLine}. You can also send a quote request to negotiate.`;

  if (has("moq", "minimum", "least", "smallest order", "min order", "how many"))
    return `The minimum order quantity (MOQ) is <b>${p.moq} pieces</b>. Need fewer for a trial? Ask for a sample first.`;

  if (has("ship", "deliver", "lead", "how fast", "how long", "arrive", "freight", "logistics"))
    return `Lead time is <b>${p.lead}</b>${p.ready ? " — this item is marked <b>Ready to ship</b>." : "."} It ships <b>FOB ${p.origin}</b>; sea, air, and express options are available at checkout.`;

  if (has("sample"))
    return `Samples are <b>available</b> for the ${p.name}. Click “Request a free sample →” and the supplier will arrange one so you can check quality before a bulk order.`;

  if (has("supplier", "manufacturer", "factory", "who makes", "seller", "trust", "legit", "genuine"))
    return `It's supplied by <b>${p.supplier}</b> in ${p.origin}, China.${p.verified ? " They're a <b>Verified Supplier</b> and orders are protected by <b>Trade Assurance</b>." : " Orders are protected by Trade Assurance."}`;

  if (has("rating", "review", "quality", "good", "reliable"))
    return `The ${p.name} is rated <b>${p.rating.toFixed(1)}/5</b> across <b>${p.reviews.toLocaleString()} reviews</b>${p.rating >= 4.6 ? " — one of the better-reviewed options in " + cat.label + "." : "."}`;

  if (has("payment", "pay", "escrow", "secure"))
    return `Payments go through <b>Trade Assurance</b>, which holds funds until you confirm the order shipped as described. Cards, bank transfer, and common methods are accepted.`;

  if (has("custom", "oem", "odm", "logo", "brand", "private label", "packaging"))
    return `Yes — OEM/ODM is typically supported. Add your logo, packaging, or spec requirements in a quote request and ${p.supplier} will confirm tooling and minimums.`;

  if (has("negotiate", "bargain", "lower", "cheaper", "too expensive", "come down", "reduce", "knock", "haggle")) {
    const floor = t[2].price;
    const lines = [
      `Best lever is volume: at <b>${t[2].min}+ pcs</b> you're already down to <b>${money(floor)}</b>/pc. Tell me your target and I'll see what ${p.supplier} can do.`,
      `I hear you. For a firm order at <b>${t[2].min}+ pcs</b> I can flag it for priority pricing at <b>${money(floor)}</b>/pc and ask ${p.supplier} to sharpen the quote.`,
      `You drive a hard bargain. On a confirmed bulk order I can push for about <b>${money(+(floor * 0.97).toFixed(2))}</b>/pc — just under the ${money(floor)} tier.`,
      `Okay — the best I can realistically get on this SKU is around <b>${money(+(floor * 0.94).toFixed(2))}</b>/pc for a committed order. That's near the floor; shall I send it to ${p.supplier} to confirm?`,
    ];
    const i = Math.min(Math.max(bargainCount - 1, 0), lines.length - 1);
    return lines[i];
  }

  if (has("spec", "material", "size", "detail", "feature", "what is", "about"))
    return `The <b>${p.name}</b> is a ${cat.label} product from ${p.origin}. Key facts: MOQ ${p.moq} pcs, lead time ${p.lead}, from ${money(p.priceLow)}/pc in volume, rated ${p.rating.toFixed(1)}/5. Want the full tier pricing or shipping details?`;

  if (has("compare", "alternative", "similar", "other"))
    return `Within <b>${cat.label}</b> I'd weigh price vs. MOQ vs. rating. This one is ${money(p.priceLow)}–${money(p.priceHigh)}/pc, MOQ ${p.moq}, rated ${p.rating.toFixed(1)}. Tell me your priority (lowest price, lowest MOQ, or top rated) and I'll point you the right way.`;

  if (has("thank", "thanks", "great", "ok", "cool"))
    return `You're welcome! Anything else about pricing, MOQ, or shipping for the ${p.name}?`;

  // fallback
  return `Good question about the <b>${p.name}</b>. I can break down volume pricing (${priceLine}), the <b>${p.moq}-pc</b> MOQ, <b>${p.lead}</b> lead time, samples, or customization. Which one helps most?`;
}

const ASSIST_CHIPS = ["What's the best price?", "Minimum order?", "How fast can it ship?", "Can I get a sample?"];

// ============================================================
//  Quote / detail modal
// ============================================================
function openModal(id) {
  const p = PRODUCTS.find((x) => x.id === id);
  if (!p) return;
  const cat = catById(p.cat);
  const modal = $("#modal");

  const hasPhotos = p.images.length > 0;
  const thumbs = p.images
    .map(
      (src, i) =>
        `<button class="m-thumb ${i === 0 ? "on" : ""}" data-src="${src}">
          <img src="${src}" alt="" onerror="this.parentElement.style.display='none'">
        </button>`
    )
    .join("");
  const galleryInner = hasPhotos
    ? `<div class="m-main" id="mMain">
         <img src="${p.images[0]}" alt="${p.name}"
           onerror="this.outerHTML='<div class=\\'fb\\' style=&quot;background:linear-gradient(135deg,${p.grad.join(",")})&quot;>${p.glyph}</div>'">
       </div>
       ${p.images.length > 1 ? `<div class="m-thumbs">${thumbs}</div>` : ""}`
    : `<div class="m-main" id="mMain">${placeholderHtml(p, true)}</div>`;

  const tierRows = p.tiers
    .map(
      (t, i) =>
        `<tr class="${i === 2 ? "best" : ""}"><td>${t.min}${i === 2 ? "+" : " – " + (p.tiers[i + 1] ? p.tiers[i + 1].min - 1 : "")} pcs</td><td class="p">${money(t.price)}</td></tr>`
    )
    .join("");

  modal.innerHTML = `
    <div class="modal-backdrop" data-close></div>
    <div class="modal" role="dialog" aria-modal="true" aria-label="${p.name}">
      <button class="modal-close" data-close aria-label="Close">
        <svg viewBox="0 0 16 16" width="15" height="15"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
      </button>
      <div class="m-product">
      <div class="m-gallery">
        ${galleryInner}
      </div>
      <div class="m-info">
        <div class="m-scroll">
          <div class="m-cat">${cat.label}</div>
          <h2 class="m-title">${p.name}</h2>
          <div class="m-meta">
            <span class="stars-row">${starsRow(p.rating, p.reviews)}</span>
            <span class="m-rating-num">${p.rating.toFixed(1)}</span>
            <span>·</span><span>Lead time ${p.lead}</span>
          </div>

          <div class="m-supplier">
            <span class="av">${p.supplier.charAt(0)}</span>
            <div>
              <b>${p.supplier}</b>
              <span>${p.origin}, China ${p.verified ? `· <span class="vbadge" style="color:var(--ok)">${checkSvg} Verified Supplier</span>` : ""}</span>
            </div>
          </div>

          <table class="m-tiers">
            <thead><tr><th>Quantity</th><th>Unit price</th></tr></thead>
            <tbody>${tierRows}</tbody>
          </table>

          <ul class="m-specs">
            <li><span>Category</span><b>${cat.label}</b></li>
            <li><span>Min. order</span><b>${p.moq} pieces</b></li>
            <li><span>Lead time</span><b>${p.lead}</b></li>
            <li><span>Samples</span><b>Available</b></li>
            <li><span>Payment</span><b>Trade Assurance</b></li>
            <li><span>Shipping</span><b>FOB ${p.origin}</b></li>
          </ul>

          <button class="link-sample" data-act="sample">Request a free sample →</button>
        </div>

        <div class="m-livecost" id="mLive"></div>
        <div class="m-actions">
          <div class="qty">
            <button data-q="-1" aria-label="Decrease">−</button>
            <input id="mQty" type="text" value="${p.moq}" inputmode="numeric" />
            <button data-q="1" aria-label="Increase">+</button>
          </div>
          <button class="btn-add" data-act="add">Add to cart</button>
          <button class="btn-cta" data-act="quote">Request quote</button>
        </div>
      </div>
      </div>
      <aside class="m-assist" aria-label="Product assistant">
        <div class="assist-head">
          <span class="assist-ico">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8zM18 14l.9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9z"/></svg>
          </span>
          <div class="assist-meta">
            <b>Sourcing Assistant</b>
            <span>AI responses may be inaccurate. Verify pricing and specs with the supplier before ordering.
</span>
          </div>
        </div>
        <div class="assist-log" id="assistLog"></div>
        <div class="assist-chips" id="assistChips"></div>
        <form class="assist-form" id="assistForm">
          <input id="assistInput" type="text" placeholder="Ask anything about this product…" autocomplete="off" />
          <button type="submit" aria-label="Send">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h11M9 4l4 4-4 4"/></svg>
          </button>
        </form>
      </aside>
    </div>`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";

  // gallery thumbs
  $$(".m-thumb", modal).forEach((t) => {
    t.addEventListener("click", () => {
      $$(".m-thumb", modal).forEach((x) => x.classList.remove("on"));
      t.classList.add("on");
      $("#mMain").innerHTML = `<img src="${t.dataset.src}" alt="${p.name}"
        onerror="this.outerHTML='<div class=\\'fb\\' style=&quot;background:linear-gradient(135deg,${p.grad.join(",")})&quot;>${p.glyph}</div>'">`;
    });
  });
  // qty stepper
  const qInput = $("#mQty", modal);
  const live = $("#mLive", modal);
  const updateLive = () => {
    const qty = Math.max(p.moq, parseInt(qInput.value, 10) || p.moq);
    const unit = tierPrice(p, qty);
    live.innerHTML = `Your price: <b>${money(unit)}</b> / pc · Subtotal <b>${money(unit * qty)}</b> for ${qty.toLocaleString()} pcs`;
  };
  updateLive();
  qInput.addEventListener("input", updateLive);
  $$(".qty button", modal).forEach((b) =>
    b.addEventListener("click", () => {
      const step = Number(b.dataset.q) * Math.max(1, Math.round(p.moq / 10));
      let v = (parseInt(qInput.value, 10) || p.moq) + step;
      qInput.value = Math.max(p.moq, v);
      updateLive();
    })
  );
  // actions
  $$("[data-act]", modal).forEach((b) =>
    b.addEventListener("click", () => {
      const qty = Math.max(p.moq, parseInt(qInput.value, 10) || p.moq);
      const act = b.dataset.act;
      if (act === "add") {
        addToCart(p.id, qty);
        closeModal();
      } else if (act === "sample") {
        closeModal();
        toast(`Sample request sent to ${p.supplier}`);
      } else {
        closeModal();
        toast(`Quote requested · ${qty.toLocaleString()} pcs of ${p.name}`);
      }
    })
  );
  // close handlers
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));

  // ----- AI sourcing assistant -----
  const log = $("#assistLog", modal);
  const chipWrap = $("#assistChips", modal);
  const form = $("#assistForm", modal);
  const input = $("#assistInput", modal);
  const pushMsg = (who, html) => {
    const el = document.createElement("div");
    el.className = `a-msg ${who}`;
    el.innerHTML = who === "bot" ? `<span class="a-av">AI</span><div class="a-bubble">${html}</div>` : `<div class="a-bubble">${html}</div>`;
    log.appendChild(el);
    log.scrollTop = log.scrollHeight;
    return el;
  };
  const botSay = (html, delay = 480) => {
    const typing = pushMsg("bot typing", `<span class="dots3"><i></i><i></i><i></i></span>`);
    setTimeout(() => {
      typing.querySelector(".a-bubble").innerHTML = html;
      typing.classList.remove("typing");
      log.scrollTop = log.scrollHeight;
    }, delay);
  };
  const chatId = chatIdFor(p.id);

let lastAsk = 0;
const ask = async (text) => {
  if (Date.now() - lastAsk < 1000) return;
  lastAsk = Date.now();

  pushMsg("user", text.replace(/</g, "&lt;"));
  await apiAddMessage(chatId, p.id, "user", text);

  input.disabled = true;
  input.placeholder = "Thinking…";

  const productContext = {
    name: p.name,
    supplier: p.supplier,
    origin: p.origin,
    category: catById(p.cat).label,
    moq: p.moq,
    leadTime: p.lead,
    verified: p.verified,
    readyToShip: p.ready,
    rating: p.rating,
    reviews: p.reviews,
    pricingTiers: p.tiers,
    deal: p.deal ? { discountPct: p.discount, wasLow: p.listLow, wasHigh: p.listHigh } : null,
  };

  try {
    const r = await fetch("/api/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, userMessage: text, productContext }),
    });
    if (!r.ok) throw new Error("HTTP " + r.status);
    const data = await r.json();
    if (!data.reply) throw new Error("no reply");
    const sourceTag = `<span style="font-size:10px;opacity:0.4;display:block;margin-top:4px">✦ Gemini 2.5 Flash</span>`;
    const delay = Math.min(300 + data.reply.length * 1.2, 1800);
    botSay(data.reply + sourceTag, delay);
    apiAddMessage(chatId, p.id, "bot", data.reply);
  } catch (err) {
    console.error("ask() failed:", err);
    botSay(`<span style="color:var(--color-text-danger);font-size:12px">⚠ Assistant unavailable, try again.</span>`);
  } finally {
    input.disabled = false;
    input.placeholder = "Ask anything about this product…";
    input.focus();
  }
};

  // resume saved conversation, or greet + persist the greeting
  (async () => {
    const history = await apiGetMessages(chatId);
    if (history.length) {
      history.forEach((m) =>
        pushMsg(m.role === "user" ? "user" : "bot",
          m.role === "user" ? m.content.replace(/</g, "&lt;") : m.content)
      );
      chipWrap.classList.add("used");
    } else {
      const greet = `Hi! I'm your sourcing assistant for the <b>${p.name}</b>. Ask me about pricing, MOQ, shipping, samples, or customization.`;
      pushMsg("bot", greet);
      apiAddMessage(chatId, p.id, "bot", greet);
    }
  })();
  ASSIST_CHIPS.forEach((c) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "a-chip"; b.textContent = c;
    b.addEventListener("click", () => { ask(c); chipWrap.classList.add("used"); });
    chipWrap.appendChild(b);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    ask(v);
    input.value = "";
    chipWrap.classList.add("used");
  });
}

function closeModal() {
  const modal = $("#modal");
  modal.hidden = true;
  modal.innerHTML = "";
  document.body.style.overflow = "";
}

// ============================================================
//  Toasts
// ============================================================
let toastTimer;
function toast(msg) {
  const wrap = $("#toasts");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span class="tk">${checkSvg}</span>${msg}`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.classList.add("out");
    setTimeout(() => el.remove(), 300);
  }, 2600);
}

// ============================================================
//  Cart + Saved badges
// ============================================================
function updateBadges() {
  const cartN = state.cart.size;
  const savedN = state.wishlist.size;
  const cb = $("#cartCount"), sb = $("#savedCount");
  cb.textContent = cartN; cb.hidden = cartN === 0;
  sb.textContent = savedN; sb.hidden = savedN === 0;
}
function bump(btn) { if (!btn) return; btn.classList.add("bump"); setTimeout(() => btn.classList.remove("bump"), 360); }

function addToCart(id, qty) {
  const p = prodById(id);
  if (!p) return;
  qty = qty || p.moq;
  state.cart.set(id, (state.cart.get(id) || 0) + qty);
  updateBadges();
  bump($("#cartBtn"));
  toast(`Added ${qty.toLocaleString()} pcs · ${p.name}`);
  if (currentDrawer === "cart") renderDrawer();
}
function setCartQty(id, qty) {
  if (qty <= 0) state.cart.delete(id);
  else state.cart.set(id, qty);
  updateBadges();
  renderDrawer();
}
function cartTotals() {
  let pcs = 0, sum = 0;
  for (const [id, qty] of state.cart) {
    const p = prodById(id);
    pcs += qty;
    sum += tierPrice(p, qty) * qty;
  }
  return { pcs, sum };
}

// ============================================================
//  Drawer (cart / saved)
// ============================================================
let currentDrawer = null;
function openDrawer(kind) {
  currentDrawer = kind;
  renderDrawer();
  $("#drawer").hidden = false;
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  currentDrawer = null;
  const d = $("#drawer");
  d.hidden = true; d.innerHTML = "";
  if ($("#modal").hidden && $("#dialog").hidden) document.body.style.overflow = "";
}
function lineImg(p) {
  return `<div class="line-img"><img src="${p.images[0]}" alt="" onerror="this.parentElement.innerHTML='<div class=\\'fb\\' style=&quot;background:linear-gradient(135deg,${p.grad.join(",")})&quot;>${p.glyph}</div>'"></div>`;
}
function renderDrawer() {
  const d = $("#drawer");
  if (!currentDrawer) return;
  d.innerHTML = currentDrawer === "cart" ? cartDrawerHtml() : savedDrawerHtml();
  $$("[data-dclose]", d).forEach((el) => el.addEventListener("click", closeDrawer));
  if (currentDrawer === "cart") wireCartDrawer(d);
  else wireSavedDrawer(d);
}

function cartDrawerHtml() {
  const ids = [...state.cart.keys()];
  const { pcs, sum } = cartTotals();
  const body = ids.length === 0
    ? `<div class="drawer-empty">
         <div class="de-ico"><svg viewBox="0 0 24 24" width="40" height="40"><path d="M6 8h12l-1 12H7zM9 8V6a3 3 0 016 0v2" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
         <h4>Your inquiry cart is empty</h4>
         <p>Add products to request one combined bulk quote.</p>
         <button class="btn-primary" data-dclose>Browse products</button>
       </div>`
    : ids.map((id) => {
        const p = prodById(id), qty = state.cart.get(id), unit = tierPrice(p, qty);
        return `<div class="line">
          ${lineImg(p)}
          <div class="line-main">
            <div class="line-name" title="${p.name}">${p.name}</div>
            <div class="line-sub">${p.supplier} · ${money(unit)}/pc</div>
            <div class="line-bottom">
              <div class="mini-qty">
                <button data-cq="-1" data-id="${id}" aria-label="Decrease">−</button>
                <input data-qi="${id}" value="${qty}" inputmode="numeric" aria-label="Quantity" />
                <button data-cq="1" data-id="${id}" aria-label="Increase">+</button>
              </div>
              <span class="line-total">${money(unit * qty)}</span>
            </div>
            <button class="line-rm" data-rm="${id}">Remove</button>
          </div>
        </div>`;
      }).join("");

  const foot = ids.length === 0 ? "" :
    `<div class="drawer-foot">
       <div class="sub-row"><span>Total quantity</span><span>${pcs.toLocaleString()} pcs</span></div>
       <div class="sub-row total"><span>Estimated subtotal</span><span>${money(sum)}</span></div>
       <button class="btn-cta" data-act="quote-all">Request bulk quote</button>
       <button class="btn-ghost" data-dclose>Continue sourcing</button>
     </div>`;

  return `<div class="drawer-backdrop" data-dclose></div>
    <aside class="drawer" role="dialog" aria-label="Inquiry cart">
      <div class="drawer-head">
        <div><h3>Inquiry cart</h3><div class="sub">${ids.length} ${ids.length === 1 ? "item" : "items"}</div></div>
        <button class="drawer-close" data-dclose aria-label="Close">${xSvg}</button>
      </div>
      <div class="drawer-body">${body}</div>
      ${foot}
    </aside>`;
}

function wireCartDrawer(d) {
  $$("[data-cq]", d).forEach((b) => b.addEventListener("click", () => {
    const id = Number(b.dataset.id), p = prodById(id);
    const step = Number(b.dataset.cq) * Math.max(1, Math.round(p.moq / 10));
    setCartQty(id, Math.max(0, (state.cart.get(id) || 0) + step));
  }));
  $$("[data-qi]", d).forEach((inp) => inp.addEventListener("change", () => {
    setCartQty(Number(inp.dataset.qi), Math.max(0, parseInt(inp.value, 10) || 0));
  }));
  $$("[data-rm]", d).forEach((b) => b.addEventListener("click", () => {
    setCartQty(Number(b.dataset.rm), 0);
    toast("Removed from cart");
  }));
  const quote = $('[data-act="quote-all"]', d);
  if (quote) quote.addEventListener("click", () => {
    const { pcs } = cartTotals();
    state.cart.clear(); updateBadges(); closeDrawer();
    toast(`Bulk quote requested for ${pcs.toLocaleString()} pcs`);
  });
}

function savedDrawerHtml() {
  const ids = [...state.wishlist];
  const body = ids.length === 0
    ? `<div class="drawer-empty">
         <div class="de-ico"><svg viewBox="0 0 32 32" width="40" height="40"><path d="M16 28c7-4.7 13-10 13-16a6.5 6.5 0 00-13-1 6.5 6.5 0 00-13 1c0 6 6 11.3 13 16z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></div>
         <h4>No saved items yet</h4>
         <p>Tap the heart on any product to save it here.</p>
         <button class="btn-primary" data-dclose>Browse products</button>
       </div>`
    : ids.map((id) => {
        const p = prodById(id);
        return `<div class="line">
          ${lineImg(p)}
          <div class="line-main">
            <div class="line-name" title="${p.name}">${p.name}</div>
            <div class="line-sub">${p.supplier} · ${money(p.priceLow)}–${money(p.priceHigh)}/pc</div>
            <div class="line-bottom">
              <button class="add-btn" data-saveadd="${id}"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg> Add to cart</button>
              <button class="line-rm" data-unsave="${id}">Remove</button>
            </div>
          </div>
        </div>`;
      }).join("");

  return `<div class="drawer-backdrop" data-dclose></div>
    <aside class="drawer" role="dialog" aria-label="Saved items">
      <div class="drawer-head">
        <div><h3>Saved items</h3><div class="sub">${ids.length} ${ids.length === 1 ? "item" : "items"}</div></div>
        <button class="drawer-close" data-dclose aria-label="Close">${xSvg}</button>
      </div>
      <div class="drawer-body">${body}</div>
    </aside>`;
}

function wireSavedDrawer(d) {
  $$("[data-saveadd]", d).forEach((b) => b.addEventListener("click", () => addToCart(Number(b.dataset.saveadd))));
  $$("[data-unsave]", d).forEach((b) => b.addEventListener("click", () => {
    state.wishlist.delete(Number(b.dataset.unsave));
    updateBadges();
    renderDrawer();
    if (!firstPaint) render();
    toast("Removed from shortlist");
  }));
}

// ============================================================
//  Popover menus (currency, account)
// ============================================================
function closePop() {
  const p = $("#activePop"); if (p) p.remove();
  $$("[aria-haspopup]").forEach((b) => b.setAttribute("aria-expanded", "false"));
}
function openPop(trigger, html, onWire) {
  const isOpen = trigger.getAttribute("aria-expanded") === "true";
  closePop();
  if (isOpen) return;
  trigger.setAttribute("aria-expanded", "true");
  const pop = document.createElement("div");
  pop.className = "pop"; pop.id = "activePop";
  pop.innerHTML = html;
  document.body.appendChild(pop);
  const r = trigger.getBoundingClientRect();
  pop.style.top = `${r.bottom + 8}px`;
  pop.style.right = `${Math.max(12, window.innerWidth - r.right)}px`;
  if (onWire) onWire(pop);
}
function currencyMenu() {
  const html = `<div class="pop-head">Currency</div>` + Object.entries(CURRENCIES).map(([code, c]) =>
    `<button class="pop-item ${code === state.currency ? "on" : ""}" data-cur="${code}">
       <span class="pi-ico">${code === state.currency ? checkSvg : ""}</span>${code}
       <span class="pi-sym">${c.symbol}</span>
     </button>`).join("");
  openPop($("#currencyBtn"), html, (pop) => {
    $$("[data-cur]", pop).forEach((b) => b.addEventListener("click", () => {
      state.currency = b.dataset.cur;
      $("#curCode").textContent = state.currency;
      closePop();
      if (!firstPaint) render();
      if (currentDrawer) renderDrawer();
      toast(`Currency set to ${state.currency}`);
    }));
  });
}
function accountMenu() {
  const items = [["signin", "Sign in / Register"], ["orders", "My orders"], ["messages", "Messages"], ["saved", "Saved items"], ["settings", "Settings"]];
  const html = `<div class="pop-head">Account</div>` + items.map(([k, label]) => `<button class="pop-item" data-acc="${k}">${label}</button>`).join("");
  openPop($("#accountBtn"), html, (pop) => {
    $$("[data-acc]", pop).forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.acc, label = b.textContent; closePop();
      if (k === "saved") openDrawer("saved");
      else if (k === "orders") openDrawer("cart");
      else toast(`${label} — demo action`);
    }));
  });
}

// ============================================================
//  Dialog (RFQ / Sell / Logistics)
// ============================================================
function openDialog(html) {
  const dlg = $("#dialog");
  dlg.innerHTML = `<div class="modal-backdrop" data-dialogclose></div>${html}`;
  dlg.hidden = false;
  document.body.style.overflow = "hidden";
  $$("[data-dialogclose]", dlg).forEach((el) => el.addEventListener("click", closeDialog));
  return dlg;
}
function closeDialog() {
  const dlg = $("#dialog");
  dlg.hidden = true; dlg.innerHTML = "";
  if ($("#drawer").hidden && $("#modal").hidden) document.body.style.overflow = "";
}
function rfqDialog() {
  const opts = CATEGORIES.filter((c) => c.id !== "all").map((c) => `<option value="${c.id}">${c.label}</option>`).join("");
  const dlg = openDialog(`<div class="sheet" role="dialog" aria-label="Request for Quote">
      <button class="sheet-close" data-dialogclose aria-label="Close">${xSvg}</button>
      <h2>Request for Quote</h2>
      <p class="sheet-sub">Tell suppliers what you need — get matched offers within 24h.</p>
      <form id="rfqForm">
        <div class="field"><label>Product name</label><input required name="prod" placeholder="e.g. TWS earbuds" /></div>
        <div class="field"><label>Category</label><select name="cat">${opts}</select></div>
        <div class="field-row">
          <div class="field"><label>Quantity</label><input required name="qty" placeholder="e.g. 1000 pcs" /></div>
          <div class="field"><label>Target price (US$/pc)</label><input name="target" placeholder="e.g. 4.50" /></div>
        </div>
        <div class="field"><label>Details</label><textarea name="notes" placeholder="Specs, packaging, certifications, ship-to country…"></textarea></div>
        <button class="btn-cta" type="submit">Submit RFQ</button>
        <div class="sheet-note">${checkSvg} Protected by Trade Assurance · suppliers contact you</div>
      </form>
    </div>`);
  $("#rfqForm", dlg).addEventListener("submit", (e) => {
    e.preventDefault();
    const prod = e.target.prod.value.trim() || "your product";
    closeDialog();
    toast(`RFQ submitted for “${prod}” — matching suppliers`);
  });
}
function sellDialog() {
  const opts = CATEGORIES.filter((c) => c.id !== "all").map((c) => `<option>${c.label}</option>`).join("");
  const dlg = openDialog(`<div class="sheet" role="dialog" aria-label="Sell on Tradenest">
      <button class="sheet-close" data-dialogclose aria-label="Close">${xSvg}</button>
      <h2>Sell on Tradenest</h2>
      <p class="sheet-sub">Reach millions of B2B buyers. Open your supplier storefront free.</p>
      <form id="sellForm">
        <div class="field"><label>Company name</label><input required name="co" placeholder="Your company" /></div>
        <div class="field"><label>Business email</label><input required type="email" name="email" placeholder="you@company.com" /></div>
        <div class="field"><label>Main product category</label><select name="cat">${opts}</select></div>
        <button class="btn-cta" type="submit">Create supplier account</button>
        <div class="sheet-note">${checkSvg} Free to list · verification in 2 business days</div>
      </form>
    </div>`);
  $("#sellForm", dlg).addEventListener("submit", (e) => {
    e.preventDefault(); closeDialog();
    toast("Supplier application received — we'll email next steps");
  });
}
function logisticsDialog() {
  openDialog(`<div class="sheet" role="dialog" aria-label="Logistics">
      <button class="sheet-close" data-dialogclose aria-label="Close">${xSvg}</button>
      <h2>Logistics & shipping</h2>
      <p class="sheet-sub">Door-to-door freight booked right inside Tradenest.</p>
      <ul class="m-specs" style="grid-template-columns:1fr">
        <li><span>Sea freight (FCL/LCL)</span><b>18–35 days</b></li>
        <li><span>Air freight</span><b>5–9 days</b></li>
        <li><span>Express courier</span><b>3–6 days</b></li>
        <li><span>Customs clearance</span><b>Included</b></li>
        <li><span>Cargo insurance</span><b>Optional</b></li>
      </ul>
      <button class="btn-cta" data-dialogclose style="width:100%;height:48px;margin-top:16px">Got it</button>
    </div>`);
}

// ============================================================
//  Top-level actions (header, nav, footer, back-to-top)
// ============================================================
function setNav(name) {
  $$(".hnav").forEach((b) => b.classList.toggle("is-active", b.dataset.nav === name));
}
function wireActions() {
  $("#sellBtn").addEventListener("click", sellDialog);
  $("#currencyBtn").addEventListener("click", currencyMenu);
  $("#accountBtn").addEventListener("click", accountMenu);
  $("#savedBtn").addEventListener("click", () => openDrawer("saved"));
  $("#cartBtn").addEventListener("click", () => openDrawer("cart"));

  $(".brand").addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });

  $$(".hnav").forEach((b) => b.addEventListener("click", () => {
    const nav = b.dataset.nav;
    setNav(nav);
    if (nav === "marketplace") {
      clearFilters();
      $(".main").scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (nav === "suppliers") {
      state.verifiedOnly = true;
      applyAll();
      $(".main").scrollIntoView({ behavior: "smooth", block: "start" });
      toast("Showing verified suppliers only");
    } else if (nav === "deals") {
      state.onSale = true;
      applyAll();
      $(".main").scrollIntoView({ behavior: "smooth", block: "start" });
      toast("Showing today's deals");
    } else if (nav === "rfq") {
      rfqDialog();
    } else if (nav === "logistics") {
      logisticsDialog();
    }
  }));

  $$("[data-foot]").forEach((a) => a.addEventListener("click", (e) => {
    e.preventDefault();
    const f = a.dataset.foot;
    if (f === "rfq") rfqDialog();
    else if (f === "sell") sellDialog();
    else if (f === "Logistics") logisticsDialog();
    else toast(`${a.textContent} — demo page`);
  }));

  const toTop = $("#toTop");
  window.addEventListener("scroll", () => { toTop.hidden = window.scrollY < 400; });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // promo banner
  $("#promoShop") && $("#promoShop").addEventListener("click", () => {
    state.onSale = true; applyAll();
    $(".main").scrollIntoView({ behavior: "smooth", block: "start" });
    toast("Showing today's deals");
  });
  $("#promoClose") && $("#promoClose").addEventListener("click", () => { $("#promo").hidden = true; });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".pop") && !e.target.closest("[aria-haspopup]")) closePop();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closePop(); closeDialog(); closeDrawer(); }
  });
}

// ============================================================
//  Header / category-bar chrome
// ============================================================
function wireChrome() {
  // sticky shadow
  window.addEventListener("scroll", () => {
    $("#hdr").classList.toggle("scrolled", window.scrollY > 8);
  });

  // category scroll arrows
  const track = $("#catTrack"), left = $("#catLeft"), right = $("#catRight");
  const updateArrows = () => {
    left.hidden = track.scrollLeft < 8;
    right.hidden = track.scrollLeft + track.clientWidth > track.scrollWidth - 8;
  };
  left.addEventListener("click", () => track.scrollBy({ left: -280, behavior: "smooth" }));
  right.addEventListener("click", () => track.scrollBy({ left: 280, behavior: "smooth" }));
  track.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);
  setTimeout(updateArrows, 100);

  // search
  $("#qProduct").addEventListener("input", (e) => { state.query = e.target.value; applyAll(); });
  $("#qCategory").addEventListener("change", (e) => { state.category = e.target.value; renderCategories(); applyAll(); });
  $("#qQty") && $("#qQty").addEventListener("input", (e) => {
    const n = parseInt(String(e.target.value).replace(/[^0-9]/g, ""), 10);
    state.qty = Number.isFinite(n) && n > 0 ? n : null;
    applyAll();
  });
  $("#searchbar").addEventListener("submit", (e) => { e.preventDefault(); applyAll(); });
  $("#sortSelect").addEventListener("change", (e) => { state.sort = e.target.value; render(); });

  // chips (mirror the sidebar facets)
  $("#readyChip").addEventListener("click", () => { state.readyOnly = !state.readyOnly; applyAll(); });
  $("#verifiedChip").addEventListener("click", () => { state.verifiedOnly = !state.verifiedOnly; applyAll(); });
  $("#saleChip").addEventListener("click", () => { state.onSale = !state.onSale; applyAll(); });

  // filters open/close (catbar button + mobile toolbar toggle)
  $("#filterBtn").addEventListener("click", () => setFilters(!state.filtersOpen));
  $("#filterToggle") && $("#filterToggle").addEventListener("click", () => setFilters(!state.filtersOpen));

  // reset
  $("#resetBtn").addEventListener("click", () => clearFilters());

  // ESC closes modal
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

// ---------- Init ----------
renderCategories();
wireChrome();
wireActions();
wireGrid();
wireFilters();
updateBadges();
setFilters(window.innerWidth >= 980);
render();
renderFilters();
syncChips();
updateFilterCount();

