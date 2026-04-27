import { useState } from "react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";

type Model = { id: number; name: string; brand: string };

const BRANDS = ["BMW", "Toyota", "Honda", "Suzuki", "Nissan", "Mazda", "Daihatsu", "Mitsubishi"];

const MOCK: Model[] = [
  { id: 1, name: "First", brand: "BMW" },
  { id: 2, name: "3 Series", brand: "BMW" },
  { id: 3, name: "5 Series", brand: "BMW" },
  { id: 4, name: "Corolla", brand: "Toyota" },
  { id: 5, name: "Land Cruiser", brand: "Toyota" },
  { id: 6, name: "N-Box", brand: "Honda" },
  { id: 7, name: "Wagon R", brand: "Suzuki" },
  { id: 8, name: "Alto", brand: "Suzuki" },
];

const EMPTY = { name: "", brand: "BMW" };
const inp: React.CSSProperties = { width: "100%", border: "1px solid #d1d5db", borderRadius: 3, padding: "6px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 };
const thS: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", background: "#f9fafb" };

export function ModelPage() {
  const [items, setItems] = useState<Model[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (m: Model) => { setForm({ name: m.name, brand: m.brand }); setEditId(m.id); setShowModal(true); };

  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((m) => (m.id === editId ? { ...m, ...form } : m)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };

  const handleDelete = () => { setItems((p) => p.filter((m) => m.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 10 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: 0 }}>Car Model</h1>
        <button onClick={openAdd} style={{ padding: "7px 16px", fontSize: 13, fontWeight: 600, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Add New</button>
      </div>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ ...thS, width: 80 }}>S/N</th>
              <th style={thS}>Name</th>
              <th style={thS}>Brand</th>
              <th style={{ ...thS, width: 140 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m, i) => (
              <tr key={m.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#1f2937" }}>{m.name}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{m.brand}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => openEdit(m)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => setDeleteId(m.id)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#c0392b", color: "#fff", cursor: "pointer" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Model" : "Add Model"} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div><label style={lbl}>Name</label><input style={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Model Name" /></div>
            <div>
              <label style={lbl}>Select a Brand</label>
              <select style={inp} value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}>
                {BRANDS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
