import { useState } from "react";

const MODULES = [
  "Dashboard",
  "User Management",
  "Car Management",
  "Brand / Model / Body Style / Color",
  "FAQ",
  "Price Calculator",
  "Gallery",
  "Contact Us List",
  "Inquiry List",
  "Order List",
  "Payment List",
];

const ROLES = ["Super Admin", "Admin", "Editor"];

type Perms = Record<string, Record<string, boolean>>;

const INIT: Perms = Object.fromEntries(
  MODULES.map((m) => [
    m,
    {
      "Super Admin": true,
      Admin: true,
      Editor: !["User Management", "Price Calculator", "Order List", "Payment List"].includes(m),
    },
  ])
);

const th: React.CSSProperties = {
  padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 700,
  color: "#374151", background: "#f9fafb", whiteSpace: "nowrap",
};

export function PermissionsPage() {
  const [perms, setPerms] = useState<Perms>(INIT);
  const [saved, setSaved] = useState(false);

  const toggle = (module: string, role: string) => {
    if (role === "Super Admin") return;
    setSaved(false);
    setPerms((prev) => ({
      ...prev,
      [module]: { ...prev[module], [role]: !prev[module][role] },
    }));
  };

  const save = () => setSaved(true);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: 0 }}>Role Permissions</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {saved && <span style={{ fontSize: 12, color: "#16a34a" }}>✓ Changes saved</span>}
          <button
            onClick={save}
            style={{
              padding: "7px 18px", fontSize: 13, fontWeight: 600, borderRadius: 3,
              border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              <th style={{ ...th, width: 220, textAlign: "left" }}>Module</th>
              {ROLES.map((r) => (
                <th key={r} style={{ ...th, textAlign: "center" }}>
                  {r}
                  {r === "Super Admin" && (
                    <div style={{ fontSize: 9, color: "#9ca3af", fontWeight: 400 }}>all permissions</div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODULES.map((m, i) => (
              <tr key={m} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 16px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{m}</td>
                {ROLES.map((r) => (
                  <td key={r} style={{ padding: "10px 16px", textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={perms[m][r]}
                      onChange={() => toggle(m, r)}
                      disabled={r === "Super Admin"}
                      style={{ width: 15, height: 15, cursor: r === "Super Admin" ? "default" : "pointer", accentColor: "#2a7fa6" }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 12, fontSize: 11, color: "#9ca3af" }}>
        * Super Admin always has full access to all modules and cannot be modified.
      </p>
    </div>
  );
}
