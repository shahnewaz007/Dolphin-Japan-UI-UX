import { useState } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { AdminModal } from "../components/AdminModal";

type Inquiry = {
  id: number;
  name: string;
  carName: string;
  stockId: string;
  country: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: string;
};

const MOCK: Inquiry[] = [
  { id: 1, name: "John Doe", carName: "2021 Toyota Land Cruiser GX", stockId: "DJ-20241", country: "USA", email: "john@example.com", phone: "+12025551234", message: "I am interested in this vehicle. Can you provide shipping cost details to New York and the full auction inspection report?", date: "2026-04-24", status: "Pending" },
  { id: 2, name: "Sarah Kim", carName: "2019 Honda N-Box Custom", stockId: "DJ-20235", country: "South Korea", email: "sarah@example.com", phone: "+82101234567", message: "Please send the auction grade sheet and confirm if this vehicle is right-hand drive.", date: "2026-04-23", status: "Replied" },
  { id: 3, name: "Ahmed Ali", carName: "2020 Suzuki Alto 660cc", stockId: "DJ-20228", country: "Kenya", email: "ahmed@example.com", phone: "+254712345678", message: "Is there a discount available if I purchase 2 units? Also, what is the CIF cost to Mombasa port?", date: "2026-04-22", status: "Pending" },
  { id: 4, name: "Maria Garcia", carName: "2018 Nissan Note e-Power", stockId: "DJ-20219", country: "Philippines", email: "maria@example.com", phone: "+639123456789", message: "What import documents will I receive? Do you handle customs clearance support for Manila?", date: "2026-04-21", status: "Closed" },
  { id: 5, name: "Yuki Tanaka", carName: "2022 Honda Fit e:HEV", stockId: "DJ-20263", country: "Australia", email: "yuki@example.com", phone: "+61412345678", message: "Could you send a video walkaround? Also interested in shipping timeline to Brisbane.", date: "2026-04-20", status: "Replied" },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Pending: { bg: "#fef9e7", color: "#b7770d" },
  Replied: { bg: "#e8f4f9", color: "#1a7fa6" },
  Closed: { bg: "#eafaf1", color: "#1e8449" },
};

const thS: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", background: "#f9fafb", whiteSpace: "nowrap" };
const inp: React.CSSProperties = { width: "100%", border: "1px solid #d1d5db", borderRadius: 3, padding: "6px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" };

export function InquiryListPage() {
  const [items, setItems] = useState<Inquiry[]>(MOCK);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<Inquiry | null>(null);

  const handleDelete = () => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); };

  const updateStatus = (id: number, status: string) => {
    setItems((p) => p.map((i) => (i.id === id ? { ...i, status } : i)));
    setViewItem((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: "0 0 4px" }}>Inventory Inquiries</h1>
        <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Inquiries submitted by customers for specific cars in the inventory.</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              {["S/N", "Customer", "Car Name", "Stock ID", "Country", "Email", "Phone", "Message", "Date", "Status", "Action"].map((h) => <th key={h} style={thS}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#1f2937", whiteSpace: "nowrap" }}>{item.name}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#1f2937", fontWeight: 600, maxWidth: 180 }}>
                  <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.carName}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#2a7fa6", fontFamily: "monospace", fontWeight: 600, whiteSpace: "nowrap" }}>{item.stockId}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{item.country}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#4b5563" }}>{item.email}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#4b5563", whiteSpace: "nowrap" }}>{item.phone}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#4b5563", maxWidth: 200 }}>
                  <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.message}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{item.date}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, borderRadius: 99, padding: "2px 8px", background: STATUS_COLORS[item.status]?.bg, color: STATUS_COLORS[item.status]?.color, whiteSpace: "nowrap" }}>{item.status}</span>
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => setViewItem(item)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer", whiteSpace: "nowrap" }}>View</button>
                    <button onClick={() => setDeleteId(item.id)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#c0392b", color: "#fff", cursor: "pointer", whiteSpace: "nowrap" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewItem && (
        <AdminModal title="Inquiry Details" onClose={() => setViewItem(null)} showFooter={false} size="lg">
          {/* Car reference highlight */}
          <div style={{ background: "#e8f4f9", border: "1px solid #b3d8ec", borderRadius: 6, padding: "12px 16px", marginBottom: 16 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#1a7fa6", letterSpacing: "0.12em", margin: "0 0 6px", textTransform: "uppercase" }}>Car Being Inquired</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1f2937" }}>{viewItem.carName}</p>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#2a7fa6", fontFamily: "monospace", background: "#fff", border: "1px solid #b3d8ec", borderRadius: 4, padding: "1px 8px" }}>{viewItem.stockId || "—"}</span>
            </div>
          </div>

          {/* Customer info */}
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>Customer Info</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16, fontSize: 13 }}>
            {[["Name", viewItem.name], ["Country", viewItem.country], ["Email", viewItem.email], ["Phone", viewItem.phone], ["Date", viewItem.date]].map(([k, v]) => (
              <div key={k}><p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>{k}</p><p style={{ margin: 0, color: "#1f2937", fontWeight: 600 }}>{v}</p></div>
            ))}
          </div>

          {/* Message */}
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 4px" }}>Message</p>
            <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.6, background: "#f9fafb", padding: 12, borderRadius: 4 }}>{viewItem.message}</p>
          </div>

          {/* Status update */}
          <div>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 6px" }}>Update Status</p>
            <select style={inp} value={viewItem.status} onChange={(e) => updateStatus(viewItem.id, e.target.value)}>
              <option>Pending</option><option>Replied</option><option>Closed</option>
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button onClick={() => setViewItem(null)} style={{ padding: "6px 16px", fontSize: 13, borderRadius: 3, border: "1px solid #d1d5db", background: "#fff", color: "#4b5563", cursor: "pointer" }}>Close</button>
          </div>
        </AdminModal>
      )}

      {deleteId !== null && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
