import { useState } from "react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  countryName: string;
  countryCode: string;
  address: string;
  gender: string;
  isActive: boolean;
};

const MOCK: User[] = [
  { id: 1, name: "Rafiqul Islam", email: "mdrafiq10015@gmail.com", phone: "", countryName: "", countryCode: "", address: "", gender: "Male", isActive: true },
  { id: 2, name: "Admin User 2", email: "admin2@dolphinjapan.com", phone: "+81312345678", countryName: "Japan", countryCode: "+81", address: "Tokyo, Japan", gender: "Male", isActive: true },
];

const EMPTY: Omit<User, "id"> & { password: string } = {
  name: "", email: "", phone: "", countryName: "", countryCode: "",
  address: "", gender: "Male", isActive: true, password: "",
};

const PERMISSIONS = [
  "Dashboard", "User Management", "Car Management", "Brand/Model/Color",
  "FAQ", "Price Calculator", "Gallery", "Contact List", "Inquiry List", "Order List", "Payment List",
];

const inp: React.CSSProperties = {
  width: "100%", border: "1px solid #d1d5db", borderRadius: 3,
  padding: "6px 10px", fontSize: 13, outline: "none", boxSizing: "border-box",
};
const lbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 };
const thS: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", background: "#f9fafb", whiteSpace: "nowrap" };

export function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [selectedPerms, setSelectedPerms] = useState<string[]>([]);

  const openAdd = () => {
    setForm(EMPTY);
    setSelectedPerms([]);
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (u: User) => {
    setForm({ ...u, password: "" });
    setSelectedPerms(["Dashboard", "User Management", "Car Management"]);
    setEditId(u.id);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (editId) {
      setUsers((prev) => prev.map((u) => (u.id === editId ? { ...u, ...form } : u)));
    } else {
      setUsers((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deleteId));
    setDeleteId(null);
  };

  const togglePerm = (p: string) =>
    setSelectedPerms((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const COLS = ["S/N", "Name", "Email", "Phone", "Country Name", "Country Code", "Address", "Gender", "Is Active?", "Action"];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: 0 }}>Admin User</h1>
        <button onClick={openAdd} style={{ padding: "7px 16px", fontSize: 13, fontWeight: 600, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>
          Add New
        </button>
      </div>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              {COLS.map((c) => <th key={c} style={thS}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{i + 1}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#1f2937" }}>{u.name}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{u.email}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{u.phone}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{u.countryName}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{u.countryCode}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{u.address}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{u.gender}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: u.isActive ? "#16a34a" : "#dc2626" }}>{u.isActive ? "Yes" : "No"}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => openEdit(u)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => setDeleteId(u.id)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#c0392b", color: "#fff", cursor: "pointer" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Admin User" : "Add Admin User"} onClose={() => setShowModal(false)} onSubmit={handleSubmit} size="lg">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div><label style={lbl}>Name</label><input style={inp} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" /></div>
            <div><label style={lbl}>Email</label><input style={inp} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" /></div>
            <div><label style={lbl}>Phone</label><input style={inp} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" /></div>
            <div><label style={lbl}>Phone Country Code</label><input style={inp} value={form.countryCode} onChange={(e) => setForm({ ...form, countryCode: e.target.value })} placeholder="+81" /></div>
            <div><label style={lbl}>Phone Country Name</label><input style={inp} value={form.countryName} onChange={(e) => setForm({ ...form, countryName: e.target.value })} placeholder="Japan" /></div>
            <div><label style={lbl}>Address</label><input style={inp} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" /></div>
            <div>
              <label style={lbl}>Gender</label>
              <select style={inp} value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            {!editId && (
              <div><label style={lbl}>Password</label><input style={inp} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" /></div>
            )}
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={{ ...lbl, display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} style={{ width: 14, height: 14, accentColor: "#2a7fa6" }} />
              Is Active
            </label>
          </div>
          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 8 }}>Module Permissions</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
              {PERMISSIONS.map((p) => (
                <label key={p} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#374151", cursor: "pointer" }}>
                  <input type="checkbox" checked={selectedPerms.includes(p)} onChange={() => togglePerm(p)} style={{ accentColor: "#2a7fa6" }} />
                  {p}
                </label>
              ))}
            </div>
          </div>
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
