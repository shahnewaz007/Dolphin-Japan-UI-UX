import { useState } from "react";
import { AdminModal } from "../components/AdminModal";

type Payment = { id: number; user: string; orderId: string; amount: string; status: string; date: string; method: string };

const MOCK: Payment[] = [
  { id: 1, user: "John Doe", orderId: "ORD-0011", amount: "$8,500", status: "Completed", date: "2026-04-22", method: "Bank Transfer" },
  { id: 2, user: "Sarah Kim", orderId: "ORD-0012", amount: "$5,200", status: "Completed", date: "2026-04-20", method: "PayPal" },
  { id: 3, user: "Ahmed Ali", orderId: "ORD-0013", amount: "$3,800", status: "Pending", date: "2026-04-19", method: "Bank Transfer" },
  { id: 4, user: "Maria Garcia", orderId: "ORD-0014", amount: "$6,100", status: "Completed", date: "2026-04-10", method: "Credit Card" },
  { id: 5, user: "Omar Al Rashid", orderId: "ORD-0015", amount: "$7,400", status: "Refunded", date: "2026-04-08", method: "Bank Transfer" },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Pending: { bg: "#fef9e7", color: "#b7770d" },
  Completed: { bg: "#eafaf1", color: "#1e8449" },
  Refunded: { bg: "#fef2f2", color: "#b91c1c" },
  Failed: { bg: "#f3f4f6", color: "#6b7280" },
};

const thS: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", background: "#f9fafb", whiteSpace: "nowrap" };

export function PaymentListPage() {
  const [payments] = useState<Payment[]>(MOCK);
  const [viewItem, setViewItem] = useState<Payment | null>(null);

  return (
    <div>
      <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: "0 0 20px" }}>Payment List</h1>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 750 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              {["S/N", "User", "Order ID", "Amount", "Status", "Date", "Payment Method", "Action"].map((h) => <th key={h} style={thS}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={p.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#1f2937" }}>{p.user}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563", fontFamily: "monospace" }}>{p.orderId}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, fontWeight: 700, color: "#1f2937" }}>{p.amount}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, borderRadius: 99, padding: "2px 8px", background: STATUS_COLORS[p.status]?.bg, color: STATUS_COLORS[p.status]?.color }}>{p.status}</span>
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#9ca3af" }}>{p.date}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{p.method}</td>
                <td style={{ padding: "10px 14px" }}>
                  <button onClick={() => setViewItem(p)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewItem && (
        <AdminModal title="Payment Details" onClose={() => setViewItem(null)} showFooter={false}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, fontSize: 13 }}>
            {[["User", viewItem.user], ["Order ID", viewItem.orderId], ["Amount", viewItem.amount], ["Payment Method", viewItem.method], ["Date", viewItem.date], ["Status", viewItem.status]].map(([k, v]) => (
              <div key={k}>
                <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 3px" }}>{k}</p>
                {k === "Status" ? (
                  <span style={{ fontSize: 12, fontWeight: 700, borderRadius: 99, padding: "3px 10px", background: STATUS_COLORS[v]?.bg, color: STATUS_COLORS[v]?.color }}>{v}</span>
                ) : (
                  <p style={{ margin: 0, color: "#1f2937", fontWeight: 600 }}>{v}</p>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
            <button onClick={() => setViewItem(null)} style={{ padding: "6px 16px", fontSize: 13, borderRadius: 3, border: "1px solid #d1d5db", background: "#fff", color: "#4b5563", cursor: "pointer" }}>Close</button>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
