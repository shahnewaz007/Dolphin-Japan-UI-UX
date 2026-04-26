import { useState } from "react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";

type Brand = { id: number; name: string };

const MOCK: Brand[] = [
  { id: 1, name: "BMW" }, { id: 2, name: "MCC SMART" }, { id: 3, name: "EUNOS" },
  { id: 4, name: "MAZDA" }, { id: 5, name: "TOYOTA" }, { id: 6, name: "HONDA" },
  { id: 7, name: "SUZUKI" }, { id: 8, name: "NISSAN" },
];

const EMPTY = { name: "" };
const inp: React.CSSProperties = { width: "100%", border: "1px solid #d1d5db", borderRadius: 3, padding: "6px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 };
const thS: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", background: "#f9fafb" };

export function BrandPage() {
  const [items, setItems] = useState<Brand[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (b: Brand) => { setForm({ name: b.name }); setEditId(b.id); setShowModal(true); };

  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((b) => (b.id === editId ? { ...b, ...form } : b)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };

  const handleDelete = () => { setItems((p) => p.filter((b) => b.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: 0 }}>Car Brand</h1>
        <button onClick={openAdd} style={{ padding: "7px 16px", fontSize: 13, fontWeight: 600, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Add New</button>
      </div>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ ...thS, width: 80 }}>S/N</th>
              <th style={thS}>Name</th>
              <th style={{ ...thS, width: 140 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((b, i) => (
              <tr key={b.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#1f2937" }}>{b.name}</td>
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
        <AdminModal title={editId ? "Edit Brand" : "Add Brand"} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div><label style={lbl}>Name</label><input style={inp} value={form.name} onChange={(e) => setForm({ name: e.target.value })} placeholder="Brand Name" /></div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
