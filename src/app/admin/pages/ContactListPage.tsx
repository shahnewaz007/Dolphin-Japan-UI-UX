import { useState } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { AdminModal } from "../components/AdminModal";

type Contact = { id: number; userName: string; companyName: string; country: string; email: string; phone: string; comment: string; date: string };

const MOCK: Contact[] = [
  { id: 1, userName: "John Doe", companyName: "Global Traders Ltd", country: "Nigeria", email: "john@globaltraders.ng", phone: "+2348012345678", comment: "Looking for Toyota Land Cruisers in bulk. Please contact me.", date: "2026-04-22" },
  { id: 2, userName: "Sarah Kim", companyName: "", country: "South Korea", email: "sarah.k@email.com", phone: "+82101234567", comment: "Interested in hybrid vehicles under $10,000.", date: "2026-04-21" },
  { id: 3, userName: "Ahmed Hassan", companyName: "Hassan Auto", country: "Kenya", email: "ahmed@hassanauto.ke", phone: "+254712345678", comment: "Need 5 units of Suzuki Alto. Urgent.", date: "2026-04-20" },
  { id: 4, userName: "Maria Santos", companyName: "Santos Imports", country: "Philippines", email: "maria@santos.ph", phone: "+639123456789", comment: "General inquiry about shipping rates to Manila.", date: "2026-04-18" },
  { id: 5, userName: "Omar Al Rashid", companyName: "Al Rashid Auto", country: "UAE", email: "omar@alrashid.ae", phone: "+971501234567", comment: "Want a price list for Japanese mini vans.", date: "2026-04-15" },
];

const thS: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", background: "#f9fafb", whiteSpace: "nowrap" };

export function ContactListPage() {
  const [items, setItems] = useState<Contact[]>(MOCK);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<Contact | null>(null);

  const handleDelete = () => { setItems((p) => p.filter((c) => c.id !== deleteId)); setDeleteId(null); };

  return (
    <div>
      <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: "0 0 20px" }}>Contact Us List</h1>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              {["S/N", "User Name", "Company Name", "Country", "Email", "Phone", "Comment", "Date", "Action"].map((h) => <th key={h} style={thS}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.map((c, i) => (
              <tr key={c.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#1f2937" }}>{c.userName}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{c.companyName || "—"}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{c.country}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{c.email}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{c.phone}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563", maxWidth: 200 }}>
                  <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.comment}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#9ca3af" }}>{c.date}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => setViewItem(c)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>View</button>
                    <button onClick={() => setDeleteId(c.id)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#c0392b", color: "#fff", cursor: "pointer" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewItem && (
        <AdminModal title="Contact Details" onClose={() => setViewItem(null)} showFooter={false}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, fontSize: 13 }}>
            {[["User Name", viewItem.userName], ["Company", viewItem.companyName || "—"], ["Country", viewItem.country], ["Email", viewItem.email], ["Phone", viewItem.phone], ["Date", viewItem.date]].map(([k, v]) => (
              <div key={k}><p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>{k}</p><p style={{ margin: 0, color: "#1f2937", fontWeight: 600 }}>{v}</p></div>
            ))}
          </div>
          <div style={{ marginTop: 14 }}>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 4px" }}>Comment</p>
            <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.6, background: "#f9fafb", padding: 12, borderRadius: 4 }}>{viewItem.comment}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button onClick={() => setViewItem(null)} style={{ padding: "6px 16px", fontSize: 13, borderRadius: 3, border: "1px solid #d1d5db", background: "#fff", color: "#4b5563", cursor: "pointer" }}>Close</button>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
