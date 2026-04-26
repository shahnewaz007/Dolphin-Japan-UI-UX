import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Car, Users, MessageSquare, ClipboardList,
  TrendingUp, ArrowUpRight, ArrowDownRight,
  Plus, Image as ImageIcon, Tag,
} from "lucide-react";
import {
  colors, radius, shadow, card,
  pageTitle, pageSubtitle, sectionTitle, sectionLabel,
  table, th, td, badge, badgeDotColor, statusTone,
} from "../components/theme";

type Trend = "up" | "down";
type Stat = {
  label: string;
  value: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  trend: Trend;
  trendValue: string;
  trendLabel: string;
};

const STATS: Stat[] = [
  { label: "Total Cars", value: "124", icon: Car, iconColor: "#0589d9", iconBg: "#e0f2fe", trend: "up", trendValue: "+8.2%", trendLabel: "vs last month" },
  { label: "Total Users", value: "48", icon: Users, iconColor: "#16a34a", iconBg: "#dcfce7", trend: "up", trendValue: "+3", trendLabel: "new this week" },
  { label: "Inventory Inquiries", value: "32", icon: MessageSquare, iconColor: "#f59e0b", iconBg: "#fef3c7", trend: "up", trendValue: "+12", trendLabel: "this week" },
  { label: "Custom Orders", value: "18", icon: ClipboardList, iconColor: "#8b5cf6", iconBg: "#ede9fe", trend: "down", trendValue: "-2", trendLabel: "vs last week" },
];

const BRANDS = [
  { name: "Toyota", count: 32, pct: 85 },
  { name: "Honda", count: 28, pct: 74 },
  { name: "Suzuki", count: 21, pct: 55 },
  { name: "Nissan", count: 18, pct: 47 },
  { name: "Mazda", count: 14, pct: 37 },
  { name: "BMW", count: 11, pct: 29 },
];

const RECENT_INQUIRIES = [
  { id: 1, user: "John Doe", car: "2021 Toyota Corolla", stockId: "DJ-20231", date: "2026-04-24", status: "Pending", type: "Inventory" },
  { id: 2, user: "Sarah Kim", car: "2019 Honda N-Box", stockId: "DJ-20245", date: "2026-04-23", status: "Replied", type: "Inventory" },
  { id: 3, user: "Ahmed Ali", car: "2020 Suzuki Alto", stockId: "DJ-20218", date: "2026-04-22", status: "Closed", type: "Inventory" },
  { id: 4, user: "Maria Garcia", car: "Custom: Nissan Note 2018", stockId: "—", date: "2026-04-21", status: "New", type: "Custom" },
  { id: 5, user: "Yuki Tanaka", car: "2022 Honda Fit", stockId: "DJ-20266", date: "2026-04-20", status: "In Progress", type: "Inventory" },
];

const SALES_DATA = {
  week: [
    { label: "Mon", val: 4 }, { label: "Tue", val: 7 }, { label: "Wed", val: 3 },
    { label: "Thu", val: 9 }, { label: "Fri", val: 6 }, { label: "Sat", val: 2 }, { label: "Sun", val: 1 },
  ],
  month: [
    { label: "W1", val: 18 }, { label: "W2", val: 24 }, { label: "W3", val: 21 }, { label: "W4", val: 31 },
  ],
  year: [
    { label: "Jan", val: 45 }, { label: "Feb", val: 38 }, { label: "Mar", val: 52 },
    { label: "Apr", val: 61 }, { label: "May", val: 49 }, { label: "Jun", val: 58 },
    { label: "Jul", val: 72 }, { label: "Aug", val: 65 }, { label: "Sep", val: 43 },
    { label: "Oct", val: 55 }, { label: "Nov", val: 48 }, { label: "Dec", val: 39 },
  ],
};

const QUICK_ACTIONS = [
  { label: "Add Car", icon: Plus, to: "/admin/cars/list", bg: "#e0f2fe", color: "#0589d9" },
  { label: "Add Brand", icon: Tag, to: "/admin/cars/brand", bg: "#dcfce7", color: "#16a34a" },
  { label: "Gallery", icon: ImageIcon, to: "/admin/gallery", bg: "#fef3c7", color: "#f59e0b" },
  { label: "Inquiries", icon: MessageSquare, to: "/admin/inquiry", bg: "#ede9fe", color: "#8b5cf6" },
];

export function DashboardPage() {
  const [salesTab, setSalesTab] = useState<"week" | "month" | "year">("week");
  const [hoverBar, setHoverBar] = useState<number | null>(null);
  const navigate = useNavigate();
  const salesData = SALES_DATA[salesTab];
  const maxVal = Math.max(...salesData.map((d) => d.val));
  const totalSales = salesData.reduce((sum, d) => sum + d.val, 0);

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={pageTitle}>Welcome back, Rafiqul 👋</h1>
          <p style={pageSubtitle}>Here's what's happening across your inventory today.</p>
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "8px 14px",
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          fontSize: 12,
          color: colors.textMuted,
          boxShadow: shadow.sm,
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: colors.success }} />
          All systems operational
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 20 }}>
        {STATS.map((s) => {
          const Icon = s.icon;
          const TrendIcon = s.trend === "up" ? ArrowUpRight : ArrowDownRight;
          const trendColor = s.trend === "up" ? colors.success : colors.danger;
          return (
            <div key={s.label} style={{ ...card, padding: 18, transition: "box-shadow 0.18s ease, transform 0.18s ease", cursor: "default" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = shadow.md; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = shadow.sm; }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: radius.md,
                  background: s.iconBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={20} color={s.iconColor} />
                </div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 3,
                  padding: "3px 8px", borderRadius: radius.pill,
                  background: s.trend === "up" ? colors.successBg : colors.dangerBg,
                  color: trendColor,
                  fontSize: 11, fontWeight: 700,
                }}>
                  <TrendIcon size={11} />
                  {s.trendValue}
                </div>
              </div>
              <p style={{ fontSize: 12, color: colors.textMuted, margin: 0, fontWeight: 500 }}>{s.label}</p>
              <p style={{ fontSize: 26, fontWeight: 700, color: colors.text, margin: "4px 0 4px", letterSpacing: "-0.02em" }}>{s.value}</p>
              <p style={{ fontSize: 11, color: colors.textSubtle, margin: 0 }}>{s.trendLabel}</p>
            </div>
          );
        })}
      </div>

      {/* Two-col: Brands + Sales chart */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)", gap: 16, marginBottom: 20 }}>
        {/* Popular Brands */}
        <div style={{ ...card, padding: 20, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 6 }}>
            <div>
              <h2 style={sectionTitle}>Popular Brands</h2>
              <p style={{ fontSize: 12, color: colors.textMuted, margin: "3px 0 0" }}>
                <span style={{ fontWeight: 700, color: colors.text, fontSize: 16 }}>
                  {BRANDS.reduce((s, b) => s + b.count, 0)}
                </span>
                <span style={{ marginLeft: 6 }}>total cars in stock</span>
              </p>
            </div>
            <span style={sectionLabel}>This month</span>
          </div>

          {/* Top 3 podium strip */}
          <div style={{
            display: "flex", gap: 6, marginTop: 16, marginBottom: 18,
            padding: "10px 12px",
            background: `linear-gradient(135deg, ${colors.primaryLight} 0%, #f0f9ff 100%)`,
            borderRadius: radius.md,
            border: `1px solid rgba(5,137,217,0.1)`,
          }}>
            {BRANDS.slice(0, 3).map((b, i) => {
              const medals = ["🥇", "🥈", "🥉"];
              return (
                <div key={b.name} style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                }}>
                  <span style={{ fontSize: 16 }}>{medals[i]}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: colors.text }}>{b.name}</span>
                  <span style={{ fontSize: 10, color: colors.textMuted }}>{b.count} cars</span>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {BRANDS.map((b, i) => (
              <div key={b.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: colors.text, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      width: 20, height: 20, borderRadius: 5,
                      background: i === 0 ? "#fef3c7" : i === 1 ? "#f1f5f9" : i === 2 ? "#fce8d6" : colors.surfaceMuted,
                      color: i === 0 ? "#92400e" : i === 1 ? "#475569" : i === 2 ? "#9a3412" : colors.textMuted,
                      fontSize: 10, fontWeight: 800,
                    }}>{i + 1}</span>
                    {b.name}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: colors.text }}>{b.pct}%</span>
                    <span style={{ fontSize: 10, color: colors.textMuted }}>{b.count} cars</span>
                  </div>
                </div>
                <div style={{ position: "relative", height: 8, background: colors.surfaceMuted, borderRadius: radius.pill, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${b.pct}%`,
                    background: i === 0
                      ? `linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)`
                      : i === 1
                      ? `linear-gradient(90deg, #64748b 0%, #94a3b8 100%)`
                      : i === 2
                      ? `linear-gradient(90deg, #ea580c 0%, #fb923c 100%)`
                      : `linear-gradient(90deg, ${colors.primary} 0%, #5cb8ff 100%)`,
                    borderRadius: radius.pill,
                    transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
                    boxShadow: i === 0 ? "0 0 6px rgba(245,158,11,0.4)" : i < 3 ? "none" : "0 0 6px rgba(5,137,217,0.25)",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Chart — flex column so chart fills card height */}
        <div style={{ ...card, padding: 20, display: "flex", flexDirection: "column" }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8, flexShrink: 0 }}>
            <div>
              <h2 style={sectionTitle}>Sales Overview</h2>
              <p style={{ fontSize: 12, color: colors.textMuted, margin: "3px 0 0" }}>
                <span style={{ fontWeight: 700, color: colors.text, fontSize: 18 }}>{totalSales}</span>
                <span style={{ marginLeft: 8 }}>total units · {salesTab}</span>
              </p>
            </div>
            <div style={{
              display: "inline-flex",
              padding: 3,
              background: colors.surfaceMuted,
              borderRadius: radius.md,
              gap: 2,
              border: `1px solid ${colors.border}`,
            }}>
              {(["week", "month", "year"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSalesTab(t)}
                  style={{
                    padding: "5px 14px", fontSize: 11, fontWeight: 600,
                    borderRadius: radius.sm, border: "none", cursor: "pointer",
                    background: salesTab === t ? colors.surface : "transparent",
                    color: salesTab === t ? colors.text : colors.textMuted,
                    boxShadow: salesTab === t ? shadow.sm : "none",
                    transition: "all 0.15s ease",
                    textTransform: "capitalize",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Chart body — grows to fill remaining card height */}
          <div style={{ display: "flex", gap: 10, flex: 1, minHeight: 180 }}>
            {/* Y-axis labels: no fixed height, distributes to match chart */}
            <div style={{
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              paddingBottom: 24, flexShrink: 0, width: 24,
            }}>
              {[maxVal, Math.round(maxVal * 0.75), Math.round(maxVal * 0.5), Math.round(maxVal * 0.25), 0].map((v) => (
                <span key={v} style={{ fontSize: 10, color: colors.textSubtle, fontWeight: 500, lineHeight: 1, textAlign: "right" }}>{v}</span>
              ))}
            </div>

            {/* Plot + X-axis */}
            <div style={{ flex: 1, position: "relative" }}>
              {/* Plot area (sits above the 24px x-axis strip) */}
              <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 24 }}>
                {/* Horizontal grid lines — relative to plot area, no math hack needed */}
                {[0, 25, 50, 75, 100].map((pct) => (
                  <div key={pct} style={{
                    position: "absolute", left: 0, right: 0,
                    bottom: `${pct}%`, height: 1,
                    borderTop: pct === 0 ? `1.5px solid ${colors.border}` : "1px dashed rgba(203,213,225,0.65)",
                    zIndex: 1,
                  }} />
                ))}

                {/* Bars */}
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "flex-end",
                  gap: salesData.length > 8 ? 3 : 6,
                  zIndex: 2,
                }}>
                  {salesData.map((d, i) => {
                    const isHover = hoverBar === i;
                    const heightPct = maxVal > 0 ? (d.val / maxVal) * 100 : 0;
                    return (
                      <div
                        key={d.label}
                        onMouseEnter={() => setHoverBar(i)}
                        onMouseLeave={() => setHoverBar(null)}
                        style={{
                          flex: 1, height: "100%",
                          display: "flex", alignItems: "flex-end",
                          position: "relative", cursor: "pointer",
                        }}
                      >
                        {/* Tooltip */}
                        {isHover && (
                          <div style={{
                            position: "absolute",
                            bottom: `calc(${heightPct}% + 8px)`,
                            left: "50%", transform: "translateX(-50%)",
                            background: colors.sidebar,
                            color: "#fff",
                            fontSize: 11, fontWeight: 700,
                            padding: "5px 10px",
                            borderRadius: radius.md,
                            whiteSpace: "nowrap",
                            boxShadow: shadow.lg,
                            zIndex: 20,
                            letterSpacing: "-0.01em",
                            pointerEvents: "none",
                          }}>
                            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 10 }}>{d.label} · </span>
                            {d.val} units
                            <div style={{
                              position: "absolute", bottom: -4, left: "50%",
                              transform: "translateX(-50%)",
                              width: 8, height: 8,
                              background: colors.sidebar,
                              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                            }} />
                          </div>
                        )}
                        {/* Bar */}
                        <div style={{
                          width: "100%",
                          height: `${heightPct}%`,
                          minHeight: 4,
                          background: isHover
                            ? `linear-gradient(180deg, #38bdf8 0%, #0284c7 55%, #01579b 100%)`
                            : `linear-gradient(180deg, #7dd3f5 0%, #0ea5e9 55%, #0369a1 100%)`,
                          borderRadius: "6px 6px 0 0",
                          transition: "background 0.2s ease",
                        }} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-axis labels */}
              <div style={{
                position: "absolute", left: 0, right: 0, bottom: 0, height: 24,
                display: "flex", alignItems: "center",
                gap: salesData.length > 8 ? 3 : 6,
              }}>
                {salesData.map((d, j) => (
                  <div key={d.label} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{
                      fontSize: 10, fontWeight: 500,
                      color: hoverBar === j ? colors.primary : colors.textMuted,
                      transition: "color 0.15s ease",
                    }}>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-col: Recent Inquiries + Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)", gap: 16 }}>
        {/* Recent Inquiries */}
        <div style={{ ...card, overflow: "hidden" }}>
          <div style={{
            padding: "16px 20px",
            borderBottom: `1px solid ${colors.border}`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <h2 style={sectionTitle}>Recent Inquiries</h2>
              <p style={{ fontSize: 12, color: colors.textMuted, margin: "2px 0 0" }}>Latest customer interactions</p>
            </div>
            <button
              onClick={() => navigate("/admin/inquiry")}
              style={{
                fontSize: 12, fontWeight: 600,
                color: colors.primary,
                background: "transparent", border: "none",
                cursor: "pointer", padding: "6px 10px",
                borderRadius: radius.md,
                display: "inline-flex", alignItems: "center", gap: 4,
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = colors.primaryLight; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              View all <ArrowUpRight size={13} />
            </button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={table}>
              <thead>
                <tr style={{ background: colors.surfaceMuted }}>
                  <th style={{ ...th, width: 40, textAlign: "center" }}>#</th>
                  <th style={th}>Customer</th>
                  <th style={th}>Car / Stock ID</th>
                  <th style={th}>Type</th>
                  <th style={th}>Date</th>
                  <th style={th}>Status</th>
                  <th style={{ ...th, textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_INQUIRIES.map((r, idx) => {
                  const tone = statusTone(r.status);
                  const isInv = r.type === "Inventory";
                  return (
                    <tr key={r.id}
                      style={{ borderLeft: `3px solid ${isInv ? colors.primary : "#8b5cf6"}`, transition: "background 0.15s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = colors.surfaceMuted; (e.currentTarget.querySelector(".row-action") as HTMLElement | null)?.style.setProperty("opacity", "1"); }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; (e.currentTarget.querySelector(".row-action") as HTMLElement | null)?.style.setProperty("opacity", "0"); }}
                    >
                      {/* Row number */}
                      <td style={{ ...td, textAlign: "center", color: colors.textSubtle, fontSize: 12, fontWeight: 600, paddingLeft: 8, paddingRight: 8 }}>
                        {String(idx + 1).padStart(2, "0")}
                      </td>
                      {/* Customer */}
                      <td style={{ ...td, whiteSpace: "nowrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: "50%",
                            background: isInv
                              ? `linear-gradient(135deg, ${colors.primary}, #00275c)`
                              : `linear-gradient(135deg, #8b5cf6, #4c1d95)`,
                            color: "#fff",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, fontWeight: 700,
                            flexShrink: 0,
                            boxShadow: "0 2px 4px rgba(0,0,0,0.12)",
                          }}>
                            {r.user.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                          <div>
                            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: colors.text }}>{r.user}</p>
                          </div>
                        </div>
                      </td>
                      {/* Car */}
                      <td style={{ ...td }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: colors.text }}>{r.car}</p>
                        <p style={{
                          margin: "2px 0 0", fontSize: 11, color: colors.textSubtle,
                          fontFamily: "ui-monospace, monospace",
                          background: r.stockId !== "—" ? colors.surfaceMuted : "transparent",
                          display: "inline-block", padding: r.stockId !== "—" ? "1px 5px" : 0,
                          borderRadius: 4,
                        }}>{r.stockId}</p>
                      </td>
                      {/* Type */}
                      <td style={{ ...td, whiteSpace: "nowrap" }}>
                        <span style={{
                          fontSize: 11, fontWeight: 600,
                          padding: "3px 8px", borderRadius: radius.pill,
                          background: isInv ? colors.primaryLight : "#ede9fe",
                          color: isInv ? colors.primaryDark : "#6d28d9",
                        }}>
                          {r.type}
                        </span>
                      </td>
                      {/* Date */}
                      <td style={{ ...td, color: colors.textMuted, fontSize: 12, whiteSpace: "nowrap" }}>{r.date}</td>
                      {/* Status */}
                      <td style={{ ...td, whiteSpace: "nowrap" }}>
                        <span style={badge(tone)}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: badgeDotColor(tone), flexShrink: 0 }} />
                          {r.status}
                        </span>
                      </td>
                      {/* Action */}
                      <td style={{ ...td, textAlign: "center", whiteSpace: "nowrap" }}>
                        <button
                          className="row-action"
                          onClick={() => navigate(isInv ? "/admin/inquiry" : "/admin/orders")}
                          style={{
                            opacity: 0,
                            fontSize: 11, fontWeight: 600,
                            padding: "5px 12px",
                            borderRadius: radius.md,
                            border: `1px solid ${colors.border}`,
                            background: colors.surface,
                            color: colors.text,
                            cursor: "pointer",
                            transition: "opacity 0.15s ease, border 0.15s ease",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.color = colors.primary; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.color = colors.text; }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ ...card, padding: 20 }}>
            <h2 style={{ ...sectionTitle, marginBottom: 14 }}>Quick Actions</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {QUICK_ACTIONS.map((a) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.label}
                    onClick={() => navigate(a.to)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8,
                      padding: 14,
                      background: colors.surface,
                      border: `1px solid ${colors.border}`,
                      borderRadius: radius.md,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "border 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.primary;
                      e.currentTarget.style.boxShadow = shadow.md;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = colors.border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: radius.md,
                      background: a.bg, color: a.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon size={16} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: colors.text }}>{a.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Highlight card */}
          <div style={{
            ...card,
            padding: 20,
            background: `linear-gradient(135deg, ${colors.primary} 0%, #00275c 100%)`,
            border: "none",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: -30, right: -30,
              width: 140, height: 140, borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
            }} />
            <div style={{ position: "relative" }}>
              <div style={{
                width: 36, height: 36, borderRadius: radius.md,
                background: "rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 14,
              }}>
                <TrendingUp size={18} color="#fff" />
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>Performance up 12%</h3>
              <p style={{ fontSize: 12, margin: "6px 0 14px", color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
                Inquiry conversion is trending higher this week compared to last.
              </p>
              <button
                onClick={() => navigate("/admin/inquiry")}
                style={{
                  fontSize: 12, fontWeight: 600,
                  padding: "7px 14px",
                  borderRadius: radius.md,
                  background: "#fff",
                  color: colors.primaryDark,
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 5,
                }}
              >
                View report <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
