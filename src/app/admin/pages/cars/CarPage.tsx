import { useState } from "react";
import { AdminModal } from "../../components/AdminModal";
import { ConfirmDialog } from "../../components/ConfirmDialog";

const BRANDS = ["BMW", "Toyota", "Honda", "Suzuki", "Nissan", "Mazda", "Daihatsu", "Mitsubishi"];
const MODELS: Record<string, string[]> = {
  BMW: ["3 Series", "5 Series", "X3", "X5"], Toyota: ["Corolla", "Land Cruiser", "Aqua", "Vitz"],
  Honda: ["N-Box", "Fit", "Civic", "Freed"], Suzuki: ["Wagon R", "Alto", "Swift", "Hustler"],
  Nissan: ["Note", "March", "Serena", "X-Trail"], Mazda: ["Demio", "CX-5", "Axela"],
  Daihatsu: ["Move", "Tanto", "Mira"], Mitsubishi: ["eK Wagon", "Outlander", "Delica"],
};
const BODY_STYLES = ["Mini Vehicles", "Hatchs", "Van & MiniVans", "Wagons", "Coupes", "Trucks", "Sedans"];
const COLORS = ["Silver", "White", "Black", "Blue", "Red", "Gray", "Brown", "Green", "gradient-yellow"];

const CAR_CONDITION = ["Maintenance Record Available", "One Owner", "Non-smoking Car"];
const STANDARD_FEATURES = ["Welfare Vehicles", "Cold Weather Specification Car", "Supercharger", "Seating Capacity 2"];
const EQUIPMENT = [
  "Electric Retractable Mirror", "Center Differential Lock", "Clean Diesel", "100V Power Supply",
  "Bluetooth Connection", "USB Input Terminal", "Drive Recorder", "Idling Stop", "Anti-theft Device",
  "Power Window", "Power Steering", "Downhill Assist Control", "Lift Up", "Double Air-conditioner",
  "Air Conditioner", "ABC", "Sun / Moon Roof", "Manual Sliding Door on Both Sides",
  "Driver Seat Airbag / Passenger Seat Airbag",
];
const INTERIOR_EXTERIOR = [
  "Headlight Washer", "Air Suspension", "Roof Rail", "Side Camera", "All-around Camera",
  "Seat Air Conditioner", "Front Camera", "Electric Rear Gate", "Walk Through", "Seat Heater",
  "Electric Retractable Third Seat", "Ottoman", "Tip Up Seat", "Full Flat Sheet", "Bench Seat",
  "3-row Seat", "Power Seats", "Run Flat Tire", "Lowdown", "Smart Key", "Aero", "ETC",
  "Back Camera", "HID (xenon light)", "LED Headlamp", "Keyless", "Half Leather Seat", "Leather Seat",
  "Alloy Wheel", "DVD Playback", "Music Player Connectable / CD or CD Changer / Music Server",
  "TV (full segment)", "TV & Navigation / Memory Navi etc.",
];
const SELF_DRIVING = ["Park Assist", "Automatic Parking System", "Lane Keep Assist", "Auto Cruise Control"];
const SAFETY_EQUIPMENT = [
  "Active Headrest", "Auto Light", "Automatic High Beam", "Clearance Sonar",
  "Collision Damage Reduction System", "Collision Safety Body", "ESC (Electronic Stability Control)",
];

type Car = {
  id: number; brand: string; model: string; bodyStyle: string; color: string;
  title: string; price: string; modelYear: string; stockNo: string; updateDate: string;
  location: string; mileage: string; mileageUnit: string; repaired: string;
  steering: string; transmission: string; fuel: string; driveSystem: string; doors: string;
  displacement: string; chassisNo: string; modelCode: string; description: string;
  seatingCapacity: string; isFeatured: boolean; cubicMeter: string;
  carCondition: string[]; standardFeatures: string[]; equipment: string[];
  interiorExterior: string[]; selfDriving: string[]; safetyEquipment: string[];
  images: string[]; videoUrl: string;
  auctionGrade: string; condition: string; auctionHouse: string; auctionDate: string;
  priceJPY: string; usdRate: string; inlandTransport: string;
  shippingDays: string; shippingMethods: string[];
};

const MOCK: Car[] = [
  { id: 1, brand: "Suzuki", model: "Wagon R", bodyStyle: "Mini Vehicles", color: "Silver", title: "2001 Suzuki Wagon R", price: "1220", modelYear: "2001", stockNo: "CAR-12345", updateDate: "2024-03-01", location: "Tokyo, Japan", mileage: "85420", mileageUnit: "KM", repaired: "NONE", steering: "RIGHT", transmission: "AT", fuel: "GASOLINE", driveSystem: "2WD", doors: "5D", displacement: "660", chassisNo: "", modelCode: "", description: "Clean kei car from Japan auction", seatingCapacity: "4", isFeatured: false, cubicMeter: "", carCondition: ["One Owner"], standardFeatures: [], equipment: ["Power Window", "Power Steering", "Air Conditioner"], interiorExterior: ["Back Camera", "Smart Key"], selfDriving: [], safetyEquipment: ["ESC (Electronic Stability Control)"], images: ["https://images.unsplash.com/photo-1715351600154-5ac1729494d7?w=400&q=70", "https://images.unsplash.com/photo-1679213035580-a5d3d84eaea0?w=400&q=70"], videoUrl: "", auctionGrade: "4.0", condition: "Good", auctionHouse: "USS Tokyo", auctionDate: "March 2024", priceJPY: "¥170,000", usdRate: "150.04 JPY", inlandTransport: "87", shippingDays: "4–6 weeks", shippingMethods: ["RoRo", "Container"] },
  { id: 2, brand: "Honda", model: "N-Box", bodyStyle: "Mini Vehicles", color: "White", title: "2018 Honda N-Box", price: "8900", modelYear: "2018", stockNo: "CAR-22345", updateDate: "2024-02-10", location: "Osaka, Japan", mileage: "62000", mileageUnit: "KM", repaired: "MINOR", steering: "RIGHT", transmission: "CVT", fuel: "GASOLINE", driveSystem: "2WD", doors: "5D", displacement: "660", chassisNo: "", modelCode: "", description: "Popular kei wagon in great condition", seatingCapacity: "4", isFeatured: true, cubicMeter: "", carCondition: ["Maintenance Record Available", "One Owner"], standardFeatures: [], equipment: ["Power Window", "Power Steering", "Air Conditioner", "Bluetooth Connection"], interiorExterior: ["Back Camera", "Smart Key", "LED Headlamp"], selfDriving: [], safetyEquipment: ["ESC (Electronic Stability Control)", "Auto Light"], images: ["https://images.unsplash.com/photo-1659721609727-b65e34a4c07b?w=400&q=70"], videoUrl: "", auctionGrade: "4.5", condition: "Excellent", auctionHouse: "JAA Osaka", auctionDate: "February 2024", priceJPY: "¥1,250,000", usdRate: "150.04 JPY", inlandTransport: "95", shippingDays: "4–6 weeks", shippingMethods: ["Container"] },
];

const EMPTY_CAR: Omit<Car, "id"> = {
  brand: "BMW", model: "", bodyStyle: "Mini Vehicles", color: "Silver",
  title: "", price: "", modelYear: "", stockNo: "", updateDate: "", location: "",
  mileage: "", mileageUnit: "KM", repaired: "NONE", steering: "LEFT",
  transmission: "AT", fuel: "GASOLINE", driveSystem: "2WD", doors: "5D",
  displacement: "", chassisNo: "", modelCode: "", description: "",
  seatingCapacity: "1", isFeatured: false, cubicMeter: "",
  carCondition: [], standardFeatures: [], equipment: [],
  interiorExterior: [], selfDriving: [], safetyEquipment: [],
  images: [], videoUrl: "",
  auctionGrade: "4.0", condition: "Good", auctionHouse: "", auctionDate: "",
  priceJPY: "", usdRate: "", inlandTransport: "",
  shippingDays: "", shippingMethods: [],
};

const inp: React.CSSProperties = { width: "100%", border: "1px solid #d1d5db", borderRadius: 3, padding: "6px 10px", fontSize: 13, outline: "none", boxSizing: "border-box" };
const lbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 };
const thS: React.CSSProperties = { padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#6b7280", background: "#f9fafb", whiteSpace: "nowrap" };
const sectionTitle: React.CSSProperties = { fontSize: 14, fontWeight: 700, color: "#1f2937", margin: "20px 0 10px", paddingBottom: 6, borderBottom: "1px solid #e5e7eb" };
const subTitle: React.CSSProperties = { fontSize: 12, fontWeight: 700, color: "#374151", margin: "12px 0 8px" };

function CheckGroup({ items, selected, onChange }: { items: string[]; selected: string[]; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {items.map((item) => (
        <label key={item} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#374151", cursor: "pointer" }}>
          <input type="checkbox" checked={selected.includes(item)} onChange={() => onChange(item)} style={{ accentColor: "#2a7fa6" }} />
          {item}
        </label>
      ))}
    </div>
  );
}

export function CarPage() {
  const [cars, setCars] = useState<Car[]>(MOCK);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Car, "id">>(EMPTY_CAR);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openAdd = () => { setForm(EMPTY_CAR); setEditId(null); setShowModal(true); };
  const openEdit = (c: Car) => { const { id, ...rest } = c; void id; setForm(rest); setEditId(c.id); setShowModal(true); };

  const handleSubmit = () => {
    if (editId) setCars((p) => p.map((c) => (c.id === editId ? { ...c, ...form } : c)));
    else setCars((p) => [...p, { id: Date.now(), ...form }]);
    setShowModal(false);
  };

  const handleDelete = () => { setCars((p) => p.filter((c) => c.id !== deleteId)); setDeleteId(null); };

  const toggleCheck = (field: "carCondition" | "standardFeatures" | "equipment" | "interiorExterior" | "selfDriving" | "safetyEquipment" | "shippingMethods", value: string) => {
    setForm((prev) => {
      const arr = prev[field] as string[];
      return { ...prev, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
    });
  };

  const currentModels = MODELS[form.brand] ?? [];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#1f2937", margin: 0 }}>Car</h1>
        <button onClick={openAdd} style={{ padding: "7px 16px", fontSize: 13, fontWeight: 600, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Add New</button>
      </div>

      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
              {["S/N", "Image", "Title", "Brand", "Model", "Year", "Price", "Mileage", "Action"].map((h) => <th key={h} style={thS}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {cars.map((c, i) => (
              <tr key={c.id} style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb", borderBottom: "1px solid #f3f4f6" }}>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#374151" }}>{i + 1}</td>
                <td style={{ padding: "6px 14px" }}>
                  {c.images[0]
                    ? <img src={c.images[0]} alt={c.title} style={{ width: 48, height: 36, objectFit: "cover", borderRadius: 3, display: "block" }} />
                    : <div style={{ width: 48, height: 36, background: "#f3f4f6", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#9ca3af" }}>No img</div>}
                </td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#1f2937" }}>{c.title}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{c.brand}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{c.model}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{c.modelYear}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>${c.price}</td>
                <td style={{ padding: "10px 14px", fontSize: 13, color: "#4b5563" }}>{c.mileage} {c.mileageUnit}</td>
                <td style={{ padding: "10px 14px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => openEdit(c)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#2a7fa6", color: "#fff", cursor: "pointer" }}>Edit</button>
                    <button onClick={() => setDeleteId(c.id)} style={{ padding: "4px 12px", fontSize: 12, borderRadius: 3, border: "none", background: "#c0392b", color: "#fff", cursor: "pointer" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AdminModal title={editId ? "Edit Car" : "Add Car"} onClose={() => setShowModal(false)} onSubmit={handleSubmit} size="xl">
          {/* Basic Info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <div>
              <label style={lbl}>Brand</label>
              <select style={inp} value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value, model: "" })}>
                {BRANDS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Model</label>
              <select style={inp} value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })}>
                <option value="">Select model</option>
                {currentModels.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Body Style</label>
              <select style={inp} value={form.bodyStyle} onChange={(e) => setForm({ ...form, bodyStyle: e.target.value })}>
                {BODY_STYLES.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Color</label>
              <select style={inp} value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}>
                {COLORS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Title</label>
              <input style={inp} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Car title" />
            </div>
            <div>
              <label style={lbl}>Price</label>
              <input style={inp} type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Car Price" />
            </div>
            <div>
              <label style={lbl}>Model Year</label>
              <input style={inp} type="number" value={form.modelYear} onChange={(e) => setForm({ ...form, modelYear: e.target.value })} placeholder="e.g. 2021" />
            </div>
            <div>
              <label style={lbl}>Stock Number</label>
              <input style={inp} value={form.stockNo} onChange={(e) => setForm({ ...form, stockNo: e.target.value })} placeholder="Stock no" />
            </div>
            <div>
              <label style={lbl}>Update Date</label>
              <input style={inp} type="date" value={form.updateDate} onChange={(e) => setForm({ ...form, updateDate: e.target.value })} />
            </div>
            <div>
              <label style={lbl}>Location</label>
              <input style={inp} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" />
            </div>
            <div>
              <label style={lbl}>Mileage</label>
              <input style={inp} type="number" value={form.mileage} onChange={(e) => setForm({ ...form, mileage: e.target.value })} placeholder="Mileage" />
            </div>
            <div>
              <label style={lbl}>Mileage Unit</label>
              <select style={inp} value={form.mileageUnit} onChange={(e) => setForm({ ...form, mileageUnit: e.target.value })}>
                <option>KM</option><option>MI</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Repaired</label>
              <select style={inp} value={form.repaired} onChange={(e) => setForm({ ...form, repaired: e.target.value })}>
                <option>NONE</option><option>MINOR</option><option>MAJOR</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Steering</label>
              <select style={inp} value={form.steering} onChange={(e) => setForm({ ...form, steering: e.target.value })}>
                <option>LEFT</option><option>RIGHT</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Transmission</label>
              <select style={inp} value={form.transmission} onChange={(e) => setForm({ ...form, transmission: e.target.value })}>
                <option>AT</option><option>MT</option><option>CVT</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Fuel</label>
              <select style={inp} value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })}>
                <option>GASOLINE</option><option>DIESEL</option><option>HYBRID</option><option>ELECTRIC</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Select Drive System</label>
              <select style={inp} value={form.driveSystem} onChange={(e) => setForm({ ...form, driveSystem: e.target.value })}>
                <option>2WD</option><option>4WD</option><option>AWD</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Doors</label>
              <select style={inp} value={form.doors} onChange={(e) => setForm({ ...form, doors: e.target.value })}>
                <option>2D</option><option>3D</option><option>4D</option><option>5D</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Displacement</label>
              <input style={inp} value={form.displacement} onChange={(e) => setForm({ ...form, displacement: e.target.value })} placeholder="Displacement" />
            </div>
            <div>
              <label style={lbl}>Chassis No</label>
              <input style={inp} value={form.chassisNo} onChange={(e) => setForm({ ...form, chassisNo: e.target.value })} placeholder="Chassis No" />
            </div>
            <div>
              <label style={lbl}>Model Code</label>
              <input style={inp} value={form.modelCode} onChange={(e) => setForm({ ...form, modelCode: e.target.value })} placeholder="Model code" />
            </div>
            <div>
              <label style={lbl}>Seating Capacity</label>
              <select style={inp} value={form.seatingCapacity} onChange={(e) => setForm({ ...form, seatingCapacity: e.target.value })}>
                {["1","2","3","4","5","6","7","8","9"].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Cubic Meter</label>
              <input style={inp} value={form.cubicMeter} onChange={(e) => setForm({ ...form, cubicMeter: e.target.value })} placeholder="Cubic Meter" />
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 4 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151", cursor: "pointer" }}>
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} style={{ width: 14, height: 14, accentColor: "#2a7fa6" }} />
                Is Featured?
              </label>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginTop: 14 }}>
            <label style={lbl}>Description</label>
            <textarea style={{ ...inp, height: 80, resize: "vertical" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Enter ..." />
          </div>

          {/* Images & Video */}
          <p style={sectionTitle}>Images &amp; Video</p>
          <div>
            <label style={lbl}>Upload Images <span style={{ fontWeight: 400, color: "#9ca3af" }}>(up to 10)</span></label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                const urls = files.map((f) => URL.createObjectURL(f));
                setForm((prev) => ({ ...prev, images: [...prev.images, ...urls].slice(0, 10) }));
                e.target.value = "";
              }}
              style={{ fontSize: 13 }}
            />
            {form.images.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                {form.images.map((src, idx) => (
                  <div key={idx} style={{ position: "relative" }}>
                    <img src={src} alt="" style={{ width: 72, height: 56, objectFit: "cover", borderRadius: 4, border: "1px solid #e5e7eb", display: "block" }} />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
                      style={{ position: "absolute", top: -6, right: -6, width: 18, height: 18, borderRadius: "50%", background: "#c0392b", border: "none", color: "#fff", cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}
                    >✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={lbl}>Vehicle Video URL <span style={{ fontWeight: 400, color: "#9ca3af" }}>(optional – YouTube or direct link)</span></label>
            <input style={inp} value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://www.youtube.com/watch?v=..." />
          </div>

          {/* Auction Info */}
          <p style={sectionTitle}>Auction Info</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
            <div>
              <label style={lbl}>Auction Grade</label>
              <select style={inp} value={form.auctionGrade} onChange={(e) => setForm({ ...form, auctionGrade: e.target.value })}>
                {["—", "1.0", "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0"].map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Condition</label>
              <select style={inp} value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}>
                {["Excellent", "Good", "Fair", "Poor"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Auction House</label>
              <input style={inp} value={form.auctionHouse} onChange={(e) => setForm({ ...form, auctionHouse: e.target.value })} placeholder="e.g. USS Tokyo" />
            </div>
            <div>
              <label style={lbl}>Auction Date</label>
              <input style={inp} value={form.auctionDate} onChange={(e) => setForm({ ...form, auctionDate: e.target.value })} placeholder="e.g. March 2024" />
            </div>
          </div>

          {/* Price Details */}
          <p style={sectionTitle}>Price Details</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            <div>
              <label style={lbl}>Original JPY Price</label>
              <input style={inp} value={form.priceJPY} onChange={(e) => setForm({ ...form, priceJPY: e.target.value })} placeholder="e.g. ¥170,000" />
            </div>
            <div>
              <label style={lbl}>USD Rate</label>
              <input style={inp} value={form.usdRate} onChange={(e) => setForm({ ...form, usdRate: e.target.value })} placeholder="e.g. 150.04 JPY" />
            </div>
            <div>
              <label style={lbl}>Inland Transport (USD)</label>
              <input style={inp} type="number" value={form.inlandTransport} onChange={(e) => setForm({ ...form, inlandTransport: e.target.value })} placeholder="e.g. 87" />
            </div>
          </div>

          {/* Shipping Info */}
          <p style={sectionTitle}>Shipping Info</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={lbl}>Est. Delivery Days</label>
              <input style={inp} value={form.shippingDays} onChange={(e) => setForm({ ...form, shippingDays: e.target.value })} placeholder="e.g. 4–6 weeks" />
            </div>
            <div>
              <label style={lbl}>Shipping Methods</label>
              <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
                {["RoRo", "Container", "Air Freight"].map((method) => (
                  <label key={method} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#374151", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={form.shippingMethods.includes(method)}
                      onChange={() => toggleCheck("shippingMethods", method)}
                      style={{ accentColor: "#2a7fa6" }}
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Specific Info */}
          <p style={sectionTitle}>Specific Info</p>
          <p style={subTitle}>Car Condition</p>
          <CheckGroup items={CAR_CONDITION} selected={form.carCondition} onChange={(v) => toggleCheck("carCondition", v)} />

          <p style={subTitle}>Standard Features</p>
          <CheckGroup items={STANDARD_FEATURES} selected={form.standardFeatures} onChange={(v) => toggleCheck("standardFeatures", v)} />

          <p style={subTitle}>Equipment</p>
          <CheckGroup items={EQUIPMENT} selected={form.equipment} onChange={(v) => toggleCheck("equipment", v)} />

          <p style={subTitle}>Interior / Exterior</p>
          <CheckGroup items={INTERIOR_EXTERIOR} selected={form.interiorExterior} onChange={(v) => toggleCheck("interiorExterior", v)} />

          <p style={subTitle}>Self-driving</p>
          <CheckGroup items={SELF_DRIVING} selected={form.selfDriving} onChange={(v) => toggleCheck("selfDriving", v)} />

          <p style={subTitle}>Safety Equipment</p>
          <CheckGroup items={SAFETY_EQUIPMENT} selected={form.safetyEquipment} onChange={(v) => toggleCheck("safetyEquipment", v)} />
        </AdminModal>
      )}

      {deleteId && <ConfirmDialog onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
