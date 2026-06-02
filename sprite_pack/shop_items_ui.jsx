import { useState, useEffect, useRef } from "react";

const ITEMS = [
  { id: 1, name: "Nose Candy", vibe: "cocaine", effect: "Speed boost, multiplier spike, crash", type: "stimulant", color: "#e8f4f8", accent: "#5aabcc", icon: "✦" },
  { id: 2, name: "Liquid Mistake", vibe: "alcohol", effect: "Payout wobble, slurred UI", type: "depressant", color: "#fff8e8", accent: "#d4a017", icon: "◈" },
  { id: 3, name: "Elder Sigil", vibe: "magical rune", effect: "Unlocks hidden symbols", type: "arcane", color: "#f0e8ff", accent: "#8b5cf6", icon: "⬡" },
  { id: 4, name: "Sparkle Dust", vibe: "glitter", effect: "Random payout scatter", type: "chaotic", color: "#fff0f8", accent: "#ec4899", icon: "✦" },
  { id: 5, name: "The Good Marker", vibe: "smelling sharpie", effect: "Clears withdrawal timer", type: "cleanse", color: "#e8fff0", accent: "#22c55e", icon: "◉" },
  { id: 6, name: "Wake Salts", vibe: "smelling salts", effect: "Resets idle, doubles next spin", type: "stimulant", color: "#fff0e8", accent: "#f97316", icon: "◇" },
  { id: 7, name: "Tainted Chalice", vibe: "spiked drink", effect: "Random good or bad effect", type: "chaotic", color: "#ffe8e8", accent: "#ef4444", icon: "◈" },
  { id: 8, name: "Blue Essence", vibe: "mana potion", effect: "Feeds all multipliers for free once", type: "arcane", color: "#e8f0ff", accent: "#3b82f6", icon: "◆" },
  { id: 9, name: "Holy Tallow", vibe: "edible candle", effect: "Restores curse level by 1", type: "cleanse", color: "#fffbe8", accent: "#eab308", icon: "⬟" },
  { id: 10, name: "God's Confetti", vibe: "acid tablet", effect: "Full curse escalation, massive payout window", type: "escalation", color: "#ffeeff", accent: "#a855f7", icon: "✦" },
  { id: 11, name: "The Pill", vibe: "magical pill", effect: "Wildcard — unknown until used", type: "wildcard", color: "#f0f0f0", accent: "#6b7280", icon: "?" },
];

const TYPE_COLORS = {
  stimulant: { bg: "#e8f4ff", border: "#5aabcc", text: "#0369a1" },
  depressant: { bg: "#fffbe8", border: "#d4a017", text: "#92400e" },
  arcane: { bg: "#f5f0ff", border: "#8b5cf6", text: "#6d28d9" },
  chaotic: { bg: "#fff0f8", border: "#ec4899", text: "#be185d" },
  cleanse: { bg: "#ecfdf5", border: "#22c55e", text: "#166534" },
  escalation: { bg: "#fdf4ff", border: "#a855f7", text: "#7e22ce" },
  wildcard: { bg: "#f9fafb", border: "#9ca3af", text: "#374151" },
};

const GRAPES = 420;

function SlotMachine({ items, onBuy }) {
  const [spinning, setSpinning] = useState(false);
  const [current, setCurrent] = useState(items[0]);
  const [displayItem, setDisplayItem] = useState(items[0]);
  const [flash, setFlash] = useState(false);
  const timerRef = useRef(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    let count = 0;
    const total = 18 + Math.floor(Math.random() * 8);
    const run = () => {
      const pick = items[Math.floor(Math.random() * items.length)];
      setDisplayItem(pick);
      setFlash(true);
      setTimeout(() => setFlash(false), 60);
      count++;
      if (count < total) {
        const delay = count < total * 0.6 ? 60 : count < total * 0.85 ? 120 : 220;
        timerRef.current = setTimeout(run, delay);
      } else {
        setCurrent(pick);
        setDisplayItem(pick);
        setSpinning(false);
      }
    };
    timerRef.current = setTimeout(run, 60);
  };

  const price = Math.floor(20 + Math.random() * 60);

  return (
    <div style={{ background: "#111", borderRadius: 16, padding: "24px 28px", maxWidth: 400, margin: "0 auto", border: "1px solid #333", boxShadow: "0 0 40px rgba(0,0,0,0.5)" }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <span style={{ fontFamily: "monospace", fontSize: 11, color: "#555", letterSpacing: 3, textTransform: "uppercase" }}>Shop Slot Machine</span>
      </div>

      <div style={{
        background: flash ? "#1a1a2e" : "#0a0a0a",
        border: `2px solid ${flash ? displayItem.accent : "#2a2a2a"}`,
        borderRadius: 12,
        padding: "20px 24px",
        minHeight: 140,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transition: "border-color 0.1s",
        margin: "12px 0",
      }}>
        <span style={{ fontSize: 32, filter: spinning ? "blur(1px)" : "none", transition: "filter 0.1s", color: displayItem.accent }}>
          {displayItem.icon}
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>
          {displayItem.name}
        </span>
        <span style={{ fontSize: 12, color: "#888", fontStyle: "italic" }}>{displayItem.vibe}</span>
        <span style={{ fontSize: 11, color: "#666", textAlign: "center", maxWidth: 220 }}>{displayItem.effect}</span>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
        <button onClick={spin} disabled={spinning} style={{
          flex: 1,
          background: spinning ? "#222" : "#1a1a2e",
          border: `1px solid ${spinning ? "#333" : "#4a4a8a"}`,
          color: spinning ? "#555" : "#aab",
          borderRadius: 8, padding: "10px 0", cursor: spinning ? "not-allowed" : "pointer",
          fontFamily: "monospace", fontSize: 13, letterSpacing: 2,
        }}>
          {spinning ? "SPINNING..." : "▶ SPIN"}
        </button>
        <button onClick={() => onBuy(current)} disabled={spinning} style={{
          flex: 1,
          background: "#1a2e1a",
          border: "1px solid #2d6a2d",
          color: "#6db36d",
          borderRadius: 8, padding: "10px 0", cursor: "pointer",
          fontFamily: "monospace", fontSize: 13, letterSpacing: 1,
        }}>
          BUY · 🍇 {price}
        </button>
      </div>
    </div>
  );
}

function ItemCard({ item, owned, onBuy }) {
  const tc = TYPE_COLORS[item.type] || TYPE_COLORS.wildcard;
  return (
    <div style={{
      background: "#141414",
      border: `1px solid ${owned ? item.accent + "80" : "#222"}`,
      borderRadius: 12,
      padding: "16px 18px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      transition: "border-color 0.2s",
      position: "relative",
      overflow: "hidden",
    }}>
      {owned && <div style={{ position: "absolute", top: 8, right: 10, fontSize: 10, color: item.accent, fontFamily: "monospace", letterSpacing: 1 }}>OWNED</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20, color: item.accent }}>{item.icon}</span>
        <span style={{ fontFamily: "monospace", fontWeight: 700, color: "#e8e8e8", fontSize: 14 }}>{item.name}</span>
      </div>
      <span style={{ fontSize: 11, fontStyle: "italic", color: "#666" }}>{item.vibe}</span>
      <span style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>{item.effect}</span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
        <span style={{
          fontSize: 10, fontFamily: "monospace", letterSpacing: 1, padding: "2px 8px",
          borderRadius: 4, background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`,
          textTransform: "uppercase",
        }}>{item.type}</span>
        {!owned && (
          <button onClick={() => onBuy(item)} style={{
            background: "transparent", border: `1px solid #333`, color: "#888",
            borderRadius: 6, padding: "4px 12px", cursor: "pointer",
            fontFamily: "monospace", fontSize: 11,
          }}>+ collect</button>
        )}
      </div>
    </div>
  );
}

export default function ShopApp() {
  const [grapes, setGrapes] = useState(GRAPES);
  const [inventory, setInventory] = useState([]);
  const [tab, setTab] = useState("shop");
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("all");

  const buyItem = (item) => {
    const cost = 30;
    if (inventory.find(i => i.id === item.id)) {
      setToast({ msg: `Already own ${item.name}`, type: "warn" });
      return;
    }
    if (grapes < cost) {
      setToast({ msg: "Not enough 🍇 grapes", type: "err" });
      return;
    }
    setGrapes(g => g - cost);
    setInventory(inv => [...inv, item]);
    setToast({ msg: `Acquired: ${item.name}`, type: "ok" });
  };

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2200);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const types = ["all", ...Array.from(new Set(ITEMS.map(i => i.type)))];
  const filtered = filter === "all" ? ITEMS : ITEMS.filter(i => i.type === filter);

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", color: "#e0e0e0", fontFamily: "system-ui, sans-serif", padding: "24px 20px" }}>
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 999,
          background: toast.type === "ok" ? "#1a2e1a" : toast.type === "warn" ? "#2e2a1a" : "#2e1a1a",
          border: `1px solid ${toast.type === "ok" ? "#2d6a2d" : toast.type === "warn" ? "#6a5a2d" : "#6a2d2d"}`,
          color: toast.type === "ok" ? "#6db36d" : toast.type === "warn" ? "#c4a84f" : "#c46d6d",
          borderRadius: 8, padding: "10px 16px", fontFamily: "monospace", fontSize: 12,
          animation: "fadeIn 0.2s ease",
        }}>{toast.msg}</div>
      )}

      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h1 style={{ margin: 0, fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: 2 }}>
              ⬡ DEV 3
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#555", fontStyle: "italic" }}>
              Items, Shop & Assets
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontFamily: "monospace", fontWeight: 700, color: "#c084fc" }}>🍇 {grapes}</div>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "monospace", letterSpacing: 1 }}>GRAPES</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid #222", paddingBottom: 0 }}>
          {["shop", "catalog", "inventory"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: "none", border: "none", borderBottom: tab === t ? "2px solid #8b5cf6" : "2px solid transparent",
              color: tab === t ? "#c4b5fd" : "#555", cursor: "pointer",
              fontFamily: "monospace", fontSize: 13, padding: "8px 16px", letterSpacing: 1,
              textTransform: "uppercase", transition: "color 0.15s",
            }}>{t} {t === "inventory" ? `(${inventory.length})` : ""}</button>
          ))}
        </div>

        {/* SHOP TAB */}
        {tab === "shop" && (
          <div>
            <SlotMachine items={ITEMS} onBuy={buyItem} />
            <div style={{ marginTop: 28, padding: "16px 20px", background: "#111", borderRadius: 12, border: "1px solid #1e1e1e" }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: "#444", letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>Shop System</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {["Shop state: inventory, stock, prices", "Purchase logic: deduct grapes, add item", "Slot machine: spin to browse/buy", "Restock logic between rounds"].map(f => (
                  <div key={f} style={{ fontSize: 12, color: "#666", display: "flex", gap: 6 }}>
                    <span style={{ color: "#333" }}>›</span> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATALOG TAB */}
        {tab === "catalog" && (
          <div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              {types.map(t => {
                const tc = TYPE_COLORS[t];
                return (
                  <button key={t} onClick={() => setFilter(t)} style={{
                    background: filter === t ? (tc ? tc.bg : "#1e1e1e") : "transparent",
                    border: `1px solid ${filter === t ? (tc ? tc.border : "#555") : "#2a2a2a"}`,
                    color: filter === t ? (tc ? tc.text : "#ccc") : "#555",
                    borderRadius: 6, padding: "4px 12px", cursor: "pointer",
                    fontFamily: "monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: 1,
                  }}>{t}</button>
                );
              })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {filtered.map(item => (
                <ItemCard key={item.id} item={item} owned={!!inventory.find(i => i.id === item.id)} onBuy={buyItem} />
              ))}
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {tab === "inventory" && (
          <div>
            {inventory.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px 0", color: "#444", fontFamily: "monospace", fontSize: 13 }}>
                No items yet — spin the shop to acquire
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
                {inventory.map(item => (
                  <ItemCard key={item.id} item={item} owned={true} onBuy={() => {}} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Asset Registry */}
        <div style={{ marginTop: 36, padding: "16px 20px", background: "#0f0f0f", borderRadius: 12, border: "1px solid #1a1a1a" }}>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: "#444", letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>Asset Registry</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {["Symbol definitions (name, weight, payout value, ASCII art)", "Item definitions (all above)", "Upgrade definitions", "Payout table", "Config file (all tunable numbers in one place)"].map(a => (
              <div key={a} style={{ fontSize: 12, color: "#555", display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2a2a2a", display: "inline-block", flexShrink: 0 }} />
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
