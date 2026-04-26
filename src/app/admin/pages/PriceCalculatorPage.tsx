import { useState } from "react";
import { AdminModal } from "../components/AdminModal";
import { ConfirmDialog } from "../components/ConfirmDialog";

type PriceCalc = { id: number; country: string; port: string; delivery: string; insurance: string; preExport: string };

const COUNTRIES = ["Please choose your country", "Australia", "Bangladesh", "Ghana", "Kenya", "Myanmar", "New Zealand", "Nigeria", "Pakistan", "Sri Lanka", "Tanzania", "Uganda", "United Kingdom", "Zambia", "Zimbabwe"];

const MOCK: PriceCalc[] = [
  { id: 1, country: "Australia", port: "Melbourne", delivery: "850", insurance: "120", preExport: "75" },
  { id: 2, country: "Kenya", port: "Mombasa", delivery: "680", insurance: "95", preExport: "60" },
  { id: 3, country: "New Zealand", port: "Auckland", delivery: "920", insurance: "130", preExport: "80" },
  { id: 4, country: "Nigeria", port: "Lagos", delivery: "740", insurance: "110", preExport: "70" },
  { id: 5, country: "United Kingdom", port: "Southampton", delivery: "1050", insurance: "150", preExport: "90" },
];

const EMPTY: Omit<PriceCalc, "id"> = { country: COUNTRIES[1], port: "", delivery: "", insurance: "", preExport: "" };
const inp: React.CSSProperties = { width: "100%", border: "1px solid #d1d5db", borderRadius: 3, padding: "6px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 };
const thS: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", background: "#f9fafb", whiteSpace: "nowrap" };

export function PriceCalculatorPage() {
  const [items, setItems] = useState<PriceCalc[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (p: PriceCalc) => { setForm({ country: p.country, port: p.port, delivery: p.delivery, insurance: p.insurance, preExport: p.preExport }); setEditId(p.id); setShowModal(true); };

  const handleSubmit = () => {
    if (editId) setItems((prev) => prev.map((p) => (p.id === editId ? { ...p, ...form } : p)));
    else setItems((prev) => [...prev, { id: Date.now(), ...form }]);
    setShowModal(false);
  };

  const handleDelete = () => { setItems((prev) => prev.filter((p) => p.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: 0 }}>Car Price Calculator</h1>
        <button onClick={openAdd} style={{ padding: "7px 16px", fontSize: 13, fontWeight: 600, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Add New</button>
      </div>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              {["S/N", "Country", "Port", "Delivery Charge ($)", "Marine Insurance ($)", "Pre Export Inspection ($)", "Action"].map((h) => <th key={h} style={thS}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.map((p, i) => (
              <tr key={p.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#1f2937" }}>{p.country}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{p.port}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>${p.delivery}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>${p.insurance}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>${p.preExport}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => openEdit(p)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => setDeleteId(p.id)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#c0392b", color: "#fff", cursor: "pointer" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Price Calculator" : "Add Price Calculator"} onClose={() => setShowModal(false)} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={lbl}>Country</label>
              <select style={inp} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
                {COUNTRIES.filter((c) => c !== "Please choose your country").map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Destination Port</label>
              <input style={inp} value={form.port} onChange={(e) => setForm({ ...form, port: e.target.value })} placeholder="Destination port" />
            </div>
            <div>
              <label style={lbl}>Delivery Charge ($)</label>
              <input style={inp} type="number" value={form.delivery} onChange={(e) => setForm({ ...form, delivery: e.target.value })} placeholder="Delivery Charge" />
            </div>
            <div>
              <label style={lbl}>Marine Insurance ($)</label>
              <input style={inp} type="number" value={form.insurance} onChange={(e) => setForm({ ...form, insurance: e.target.value })} placeholder="Marine insurance" />
            </div>
            <div>
              <label style={lbl}>Pre Export Inspection ($)</label>
              <input style={inp} type="number" value={form.preExport} onChange={(e) => setForm({ ...form, preExport: e.target.value })} placeholder="Pre export inspection" />
            </div>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
