import { useState } from "react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";

type BodyStyle = { id: number; name: string; image: string };

const MOCK: BodyStyle[] = [
  { id: 1, name: "Mini Vehicles", image: "" },
  { id: 2, name: "Hatchs", image: "" },
  { id: 3, name: "Van & MiniVans", image: "" },
  { id: 4, name: "Wagons", image: "" },
  { id: 5, name: "Coupes", image: "" },
  { id: 6, name: "Trucks", image: "" },
  { id: 7, name: "Buses", image: "" },
  { id: 8, name: "Sedans", image: "" },
];

const EMPTY = { name: "", image: "" };
const inp: React.CSSProperties = { width: "100%", border: "1px solid #d1d5db", borderRadius: 3, padding: "6px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 };
const thS: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", background: "#f9fafb" };

export function BodyStylePage() {
  const [items, setItems] = useState<BodyStyle[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [fileLabel, setFileLabel] = useState("No file chosen");

  const openAdd = () => { setForm(EMPTY); setFileLabel("No file chosen"); setEditId(null); setShowModal(true); };
  const openEdit = (b: BodyStyle) => { setForm({ name: b.name, image: b.image }); setFileLabel(b.image || "No file chosen"); setEditId(b.id); setShowModal(true); };

  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((b) => (b.id === editId ? { ...b, ...form } : b)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };

  const handleDelete = () => { setItems((p) => p.filter((b) => b.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: 0 }}>Car Body Style</h1>
        <button onClick={openAdd} style={{ padding: "7px 16px", fontSize: 13, fontWeight: 600, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Add New</button>
      </div>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ ...thS, width: 80 }}>S/N</th>
              <th style={thS}>Name</th>
              <th style={thS}>Image</th>
              <th style={{ ...thS, width: 140 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b, i) => (
              <tr key={b.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#1f2937" }}>{b.name}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#9ca3af" }}>{b.image ? "✓ Uploaded" : "—"}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => openEdit(b)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => setDeleteId(b.id)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#c0392b", color: "#fff", cursor: "pointer" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Body Style" : "Add Body Style"} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={lbl}>Name</label><input style={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Body style name" /></div>
            <div>
              <label style={lbl}>Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFileLabel(file ? file.name : "No file chosen");
                  setForm({ ...form, image: file ? file.name : "" });
                }}
                style={{ fontSize: 13, color: "#374151" }}
              />
            </div>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
