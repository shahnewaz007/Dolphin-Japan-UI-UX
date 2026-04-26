import { useState } from "react";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { AdminModal } from "../components/AdminModal";

type CustomOrderInquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  make: string;
  model: string;
  yearFrom: string;
  yearTo: string;
  budgetMin: string;
  budgetMax: string;
  bodyType: string;
  transmission: string;
  fuelType: string;
  driveType: string;
  mileageMax: string;
  color: string;
  features: string[];
  additionalRequirements: string;
  date: string;
  status: string;
};

const MOCK: CustomOrderInquiry[] = [
  {
    id: 1, name: "John Doe", email: "john@example.com", phone: "+12025551234", country: "USA",
    make: "Toyota", model: "Land Cruiser", yearFrom: "2020", yearTo: "2023",
    budgetMin: "40000", budgetMax: "55000", bodyType: "SUV", transmission: "Automatic",
    fuelType: "Petrol", driveType: "4WD", mileageMax: "50000", color: "White",
    features: ["Leather Seats", "Navigation", "Backup Camera", "Sunroof"],
    additionalRequirements: "Prefer GX grade or higher. Must have full-time 4WD.",
    date: "2026-04-24", status: "New",
  },
  {
    id: 2, name: "Sarah Kim", email: "sarah@example.com", phone: "+82101234567", country: "South Korea",
    make: "Honda", model: "N-Box Custom", yearFrom: "2021", yearTo: "2024",
    budgetMin: "8000", budgetMax: "12000", bodyType: "Kei", transmission: "Automatic",
    fuelType: "Petrol", driveType: "2WD", mileageMax: "30000", color: "",
    features: ["Air Conditioning", "Power Windows", "Keyless Entry"],
    additionalRequirements: "Prefer turbo variant. Right-hand drive mandatory.",
    date: "2026-04-23", status: "In Progress",
  },
  {
    id: 3, name: "Ahmed Ali", email: "ahmed@example.com", phone: "+254712345678", country: "Kenya",
    make: "Suzuki", model: "Alto", yearFrom: "2019", yearTo: "2022",
    budgetMin: "3500", budgetMax: "5500", bodyType: "Hatchback", transmission: "Automatic",
    fuelType: "Petrol", driveType: "2WD", mileageMax: "40000", color: "Silver",
    features: ["Air Conditioning", "Power Steering"],
    additionalRequirements: "Needs to be CIF Mombasa. Any color except black.",
    date: "2026-04-22", status: "Replied",
  },
  {
    id: 4, name: "Maria Garcia", email: "maria@example.com", phone: "+639123456789", country: "Philippines",
    make: "Nissan", model: "X-Trail", yearFrom: "2018", yearTo: "2021",
    budgetMin: "12000", budgetMax: "18000", bodyType: "SUV", transmission: "Automatic",
    fuelType: "Diesel", driveType: "4WD", mileageMax: "60000", color: "Black",
    features: ["Navigation", "Backup Camera", "ABS", "Alloy Wheels"],
    additionalRequirements: "Must come with third-row seating option.",
    date: "2026-04-21", status: "Closed",
  },
  {
    id: 5, name: "Omar Al Rashid", email: "omar@example.com", phone: "+971501234567", country: "UAE",
    make: "Lexus", model: "LX 570", yearFrom: "2019", yearTo: "2023",
    budgetMin: "60000", budgetMax: "90000", bodyType: "SUV", transmission: "Automatic",
    fuelType: "Petrol", driveType: "4WD", mileageMax: "45000", color: "Pearl White",
    features: ["Leather Seats", "Navigation", "Sunroof", "Cruise Control", "Keyless Entry"],
    additionalRequirements: "Prefer Arabic version if available. Delivery to Dubai port.",
    date: "2026-04-20", status: "In Progress",
  },
];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  New: { bg: "#f0fdf4", color: "#15803d" },
  "In Progress": { bg: "#e8f0fe", color: "#1a56db" },
  Replied: { bg: "#e8f4f9", color: "#1a7fa6" },
  Closed: { bg: "#f3f4f6", color: "#6b7280" },
};

const thS: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", background: "#f9fafb", whiteSpace: "nowrap" };
const inp: React.CSSProperties = { width: "100%", border: "1px solid #d1d5db", borderRadius: 3, padding: "6px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" };

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>{label}</p>
      <p style={{ margin: 0, color: "#1f2937", fontWeight: 600, fontSize: 13 }}>{value || "—"}</p>
    </div>
  );
}

export function OrderListPage() {
  const [items, setItems] = useState<CustomOrderInquiry[]>(MOCK);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewItem, setViewItem] = useState<CustomOrderInquiry | null>(null);

  const handleDelete = () => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); };

  const updateStatus = (id: number, status: string) => {
    setItems((p) => p.map((i) => (i.id === id ? { ...i, status } : i)));
    setViewItem((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: "0 0 4px" }}>Custom Order Inquiries</h1>
        <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Requests submitted by customers who couldn't find their desired car in the inventory.</p>
      </div>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              {["S/N", "Customer", "Email", "Country", "Make", "Model", "Year Range", "Budget (USD)", "Date", "Status", "Action"].map((h) => <th key={h} style={thS}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#1f2937", whiteSpace: "nowrap" }}>{item.name}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#4b5563" }}>{item.email}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563", whiteSpace: "nowrap" }}>{item.country}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563", fontWeight: 600 }}>{item.make}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{item.model}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#4b5563", whiteSpace: "nowrap" }}>{item.yearFrom}–{item.yearTo}</td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#4b5563", whiteSpace: "nowrap" }}>
                  {item.budgetMin ? `$${Number(item.budgetMin).toLocaleString()}` : "—"} – ${Number(item.budgetMax).toLocaleString()}
                </td>
                <td style={{ padding: "10px 14px", fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>{item.date}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, borderRadius: 99, padding: "2px 8px", whiteSpace: "nowrap", background: STATUS_COLORS[item.status]?.bg, color: STATUS_COLORS[item.status]?.color }}>{item.status}</span>
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
        <AdminModal title={`Custom Order — ${viewItem.name}`} onClose={() => setViewItem(null)} showFooter={false} size="lg">
          {/* Customer Info */}
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>Customer Info</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <Field label="Name" value={viewItem.name} />
            <Field label="Country" value={viewItem.country} />
            <Field label="Email" value={viewItem.email} />
            <Field label="Phone" value={viewItem.phone} />
            <Field label="Date Submitted" value={viewItem.date} />
          </div>

          <div style={{ height: 1, background: "#e5e7eb", margin: "0 0 16px" }} />

          {/* Vehicle Request */}
          <p style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 10px" }}>Vehicle Request</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <Field label="Make" value={viewItem.make} />
            <Field label="Model" value={viewItem.model} />
            <Field label="Year Range" value={`${viewItem.yearFrom} – ${viewItem.yearTo}`} />
            <Field label="Budget (USD)" value={viewItem.budgetMin ? `$${Number(viewItem.budgetMin).toLocaleString()} – $${Number(viewItem.budgetMax).toLocaleString()}` : `Up to $${Number(viewItem.budgetMax).toLocaleString()}`} />
            <Field label="Body Type" value={viewItem.bodyType} />
            <Field label="Transmission" value={viewItem.transmission} />
            <Field label="Fuel Type" value={viewItem.fuelType} />
            <Field label="Drive Type" value={viewItem.driveType} />
            <Field label="Max Mileage (km)" value={viewItem.mileageMax ? `${Number(viewItem.mileageMax).toLocaleString()} km` : "—"} />
            <Field label="Preferred Color" value={viewItem.color} />
          </div>

          {/* Features */}
          {viewItem.features.length > 0 && (
            <div style={{ marginBottom: 14 }}>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 6px" }}>Required Features</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {viewItem.features.map((f) => (
                  <span key={f} style={{ fontSize: 11, fontWeight: 600, background: "#e8f4f9", color: "#1a7fa6", border: "1px solid #b3d8ec", borderRadius: 99, padding: "2px 10px" }}>{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* Additional requirements */}
          {viewItem.additionalRequirements && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 4px" }}>Additional Requirements</p>
              <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.6, background: "#f9fafb", padding: 12, borderRadius: 4 }}>{viewItem.additionalRequirements}</p>
            </div>
          )}

          <div style={{ height: 1, background: "#e5e7eb", margin: "0 0 16px" }} />

          {/* Status update */}
          <div>
            <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 6px" }}>Update Status</p>
            <select style={inp} value={viewItem.status} onChange={(e) => updateStatus(viewItem.id, e.target.value)}>
              {Object.keys(STATUS_COLORS).map((s) => <option key={s}>{s}</option>)}
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
