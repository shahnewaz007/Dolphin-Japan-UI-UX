import { useState } from "react";
import { AdminModal } from "../components/AdminModal";
import { ConfirmDialog } from "../components/ConfirmDialog";

type Faq = { id: number; question: string; answer: string; position: number };

const MOCK: Faq[] = [
  { id: 1, question: "How do I purchase a car from Dolphin Japan?", answer: "You can browse our inventory and send an inquiry. Our team will guide you through the purchase process and shipping arrangements.", position: 1 },
  { id: 2, question: "What is FOB price?", answer: "FOB (Free On Board) price is the cost of the car at the Japanese port, before shipping. It does not include international shipping, insurance, or import taxes.", position: 2 },
  { id: 3, question: "How long does shipping take?", answer: "Shipping typically takes 3–6 weeks depending on your destination port. We will provide an estimated arrival date after booking.", position: 3 },
  { id: 4, question: "Do you provide auction inspection reports?", answer: "Yes, all cars sourced from Japanese auctions come with a certified auction inspection report rating the exterior, interior, and mechanical condition.", position: 4 },
];

const EMPTY = { question: "", answer: "", position: MOCK.length + 1 };
const inp: React.CSSProperties = { width: "100%", border: "1px solid #d1d5db", borderRadius: 3, padding: "6px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 };
const thS: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", background: "#f9fafb" };

export function FaqPage() {
  const [items, setItems] = useState<Faq[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm({ ...EMPTY, position: items.length + 1 }); setEditId(null); setShowModal(true); };
  const openEdit = (f: Faq) => { setForm({ question: f.question, answer: f.answer, position: f.position }); setEditId(f.id); setShowModal(true); };

  const handleSubmit = () => {
    if (editId) setItems((p) => p.map((f) => (f.id === editId ? { ...f, ...form } : f)));
    else setItems((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };

  const handleDelete = () => { setItems((p) => p.filter((f) => f.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: 0 }}>FAQ</h1>
        <button onClick={openAdd} style={{ padding: "7px 16px", fontSize: 13, fontWeight: 600, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Add New</button>
      </div>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ ...thS, width: 60 }}>S/N</th>
              <th style={thS}>Question</th>
              <th style={thS}>Answer</th>
              <th style={{ ...thS, width: 70 }}>Pos.</th>
              <th style={{ ...thS, width: 140 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.sort((a, b) => a.position - b.position).map((f, i) => (
              <tr key={f.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#1f2937", maxWidth: 280 }}>
                  <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{f.question}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563", maxWidth: 360 }}>
                  <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{f.answer}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151", textAlign: "center" }}>{f.position}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => openEdit(f)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => setDeleteId(f.id)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#c0392b", color: "#fff", cursor: "pointer" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit FAQ" : "Add FAQ"} onClose={() => setShowModal(false)} onSubmit={handleSubmit} size="lg">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={lbl}>Question</label>
              <textarea style={{ ...inp, height: 80, resize: "vertical" }} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} placeholder="Enter question..." />
            </div>
            <div>
              <label style={lbl}>Answer</label>
              <textarea style={{ ...inp, height: 80, resize: "vertical" }} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} placeholder="Enter answer..." />
            </div>
            <div>
              <label style={lbl}>Position</label>
              <input style={inp} type="number" value={form.position} onChange={(e) => setForm({ ...form, position: Number(e.target.value) })} placeholder="Position" />
            </div>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
