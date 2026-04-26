import { useState } from "react";
import { AdminModal } from "../components/AdminModal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Trash2, Pencil, CheckCircle } from "lucide-react";

type GalleryImage = { id: number; title: string; category: string; src: string; isActive: boolean };

const CATEGORIES = ["Hero Background", "CTA Banner", "Other"];
const TABS = ["All", ...CATEGORIES];

const SLOT_DESC: Record<string, string> = {
  "Hero Background": "Full-screen background image for the homepage hero section.",
  "CTA Banner": 'Background for the "Ready to Import" call-to-action section at the bottom of the homepage.',
  "Other": "Reserved for future site sections.",
};

const MOCK: GalleryImage[] = [
  {
    id: 1,
    title: "Hero – Main Car Background",
    category: "Hero Background",
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    isActive: true,
  },
  {
    id: 2,
    title: "CTA – Shipping Port",
    category: "CTA Banner",
    src: "https://images.unsplash.com/photo-1598586707899-d0868f266e74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzaGlwcGluZyUyMGNhcmdvJTIwc2hpcCUyMGxvYWRpbmclMjB2ZWhpY2xlc3xlbnwxfHx8fDE3NzY3OTY3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    isActive: true,
  },
];

const EMPTY: Omit<GalleryImage, "id" | "isActive"> = { title: "", category: CATEGORIES[0], src: "" };
const inp: React.CSSProperties = { width: "100%", border: "1px solid #d1d5db", borderRadius: 3, padding: "6px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 };

export function GalleryPage() {
  const [items, setItems] = useState<GalleryImage[]>(MOCK);
  const [activeTab, setActiveTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [preview, setPreview] = useState("");

  const openAdd = () => { setEditItem(null); setForm(EMPTY); setPreview(""); setShowModal(true); };

  const openEdit = (img: GalleryImage) => {
    setEditItem(img);
    setForm({ title: img.title, category: img.category, src: img.src });
    setPreview(img.src);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (editItem) {
      setItems((prev) => prev.map((i) => (i.id === editItem.id ? { ...i, ...form } : i)));
    } else {
      setItems((prev) => [...prev, { id: Date.now(), ...form, isActive: false }]);
    }
    setShowModal(false);
  };

  const handleDelete = () => { setItems((prev) => prev.filter((i) => i.id !== deleteId)); setDeleteId(null); };

  const setActive = (id: number, category: string) => {
    setItems((prev) => prev.map((i) => i.category === category ? { ...i, isActive: i.id === id } : i));
  };

  const filtered = activeTab === "All" ? items : items.filter((i) => i.category === activeTab);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: "0 0 4px" }}>Gallery</h1>
          <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Manage homepage section images. One image per slot can be set as active.</p>
        </div>
        <button onClick={openAdd} style={{ padding: "7px 16px", fontSize: 13, fontWeight: 600, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>
          Add Image
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "1px solid #e5e7eb" }}>
        {TABS.map((tab) => {
          const count = tab === "All" ? items.length : items.filter((i) => i.category === tab).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "7px 16px",
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                border: "none",
                background: "none",
                cursor: "pointer",
                color: isActive ? "#2a7fa6" : "#6b7280",
                borderBottom: isActive ? "2px solid #2a7fa6" : "2px solid transparent",
                marginBottom: -1,
                borderRadius: 0,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {tab}
              <span style={{ fontSize: 11, background: isActive ? "#e0f0f8" : "#f3f4f6", color: isActive ? "#2a7fa6" : "#9ca3af", padding: "1px 7px", borderRadius: 99, fontWeight: 600 }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af", fontSize: 14 }}>No images in this category yet.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {filtered.map((img) => (
            <div
              key={img.id}
              style={{
                background: "#fff",
                borderRadius: 6,
                overflow: "hidden",
                boxShadow: img.isActive ? "0 0 0 2px #2a7fa6" : "0 1px 4px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              {/* Active badge */}
              {img.isActive && (
                <div style={{
                  position: "absolute", top: 8, left: 8, zIndex: 2,
                  background: "#2a7fa6", color: "#fff",
                  fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
                  display: "flex", alignItems: "center", gap: 3,
                }}>
                  <CheckCircle size={10} /> ACTIVE
                </div>
              )}

              <div style={{ position: "relative" }}>
                <img src={img.src} alt={img.title} style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", top: 6, right: 6, display: "flex", gap: 4 }}>
                  <button
                    onClick={() => openEdit(img)}
                    style={{ background: "rgba(42,127,166,0.9)", border: "none", borderRadius: 4, width: 28, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Pencil size={12} color="#fff" />
                  </button>
                  <button
                    onClick={() => setDeleteId(img.id)}
                    style={{ background: "rgba(192,57,43,0.9)", border: "none", borderRadius: 4, width: 28, height: 28, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Trash2 size={12} color="#fff" />
                  </button>
                </div>
              </div>

              <div style={{ padding: "10px 12px" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1f2937", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{img.title}</p>
                <p style={{ fontSize: 11, color: "#6b7280", margin: "0 0 8px" }}>{img.category}</p>
                {img.isActive ? (
                  <p style={{ fontSize: 11, color: "#2a7fa6", fontWeight: 600, textAlign: "center", margin: 0 }}>✓ Active for this slot</p>
                ) : (
                  <button
                    onClick={() => setActive(img.id, img.category)}
                    style={{ fontSize: 11, fontWeight: 600, color: "#2a7fa6", background: "#e0f0f8", border: "1px solid #b3d8ec", borderRadius: 3, padding: "3px 10px", cursor: "pointer", width: "100%" }}
                  >
                    Set as Active
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <AdminModal title={editItem ? "Edit Gallery Image" : "Add Gallery Image"} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={lbl}>Title</label>
              <input style={inp} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Hero – Winter Campaign" />
            </div>
            <div>
              <label style={lbl}>Site Section (Slot)</label>
              <select style={inp} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>{SLOT_DESC[form.category]}</p>
            </div>
            <div>
              <label style={lbl}>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setPreview(url);
                    setForm({ ...form, src: url });
                  }
                }}
                style={{ fontSize: 13 }}
              />
              {preview && <img src={preview} alt="preview" style={{ marginTop: 10, width: "100%", maxHeight: 160, objectFit: "cover", borderRadius: 4 }} />}
            </div>
          </div>
        </AdminModal>
      )}

      {deleteId !== null && <ConfirmDialog message="Delete this image from the gallery?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
