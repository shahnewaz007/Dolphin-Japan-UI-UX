import { useState, useMemo } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, SlidersHorizontal, Heart, Eye, ChevronDown,
  ChevronLeft, ChevronRight, Grid3X3, List, X, Filter,
  Fuel, Gauge, Settings2, Car, CheckCircle2, SearchX, ArrowRight
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Defined at module level to prevent remount on parent re-render
function FilterGroup({ title, children, defaultOpen = true }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-[13px] text-gray-800 mb-3 tracking-wide uppercase"
        style={{ fontWeight: 700, letterSpacing: "0.06em" }}
      >
        {title}
        <ChevronDown size={15} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

const cars = [
  { id: 1, name: "Daihatsu Hijet Dump Truck", year: 2009, price: "$8,500", image: "https://images.unsplash.com/photo-1715351600154-5ac1729494d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080", specs: ["AT", "660cc", "Petrol", "2WD"], sold: false, make: "Daihatsu", mileage: "72,000 km" },
  { id: 2, name: "Toyota Hiace Van", year: 2015, price: "$18,500", image: "https://images.unsplash.com/photo-1679213035580-a5d3d84eaea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080", specs: ["AT", "2700cc", "Diesel", "4WD"], sold: true, make: "Toyota", mileage: "95,000 km" },
  { id: 3, name: "Nissan Caravan", year: 2018, price: "$22,800", image: "https://images.unsplash.com/photo-1693448658669-45ba31317995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080", specs: ["AT", "2000cc", "Petrol", "2WD"], sold: false, make: "Nissan", mileage: "48,200 km" },
  { id: 4, name: "Honda Fit Hybrid", year: 2020, price: "$16,900", image: "https://images.unsplash.com/photo-1628846231746-b4ed87a0abef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080", specs: ["AT", "1500cc", "Hybrid", "2WD"], sold: false, make: "Honda", mileage: "32,000 km" },
  { id: 5, name: "Mazda CX-5", year: 2019, price: "$24,500", image: "https://images.unsplash.com/photo-1766524791677-6c6c495e0218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080", specs: ["AT", "2500cc", "Petrol", "4WD"], sold: false, make: "Mazda", mileage: "55,600 km" },
  { id: 6, name: "Suzuki Wagon R", year: 2017, price: "$9,800", image: "https://images.unsplash.com/photo-1659721604753-87d4850a6ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080", specs: ["AT", "660cc", "Petrol", "2WD"], sold: true, make: "Suzuki", mileage: "68,900 km" },
  { id: 7, name: "Toyota Crown", year: 2016, price: "$19,500", image: "https://images.unsplash.com/photo-1659721609727-b65e34a4c07b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080", specs: ["AT", "2500cc", "Hybrid", "2WD"], sold: false, make: "Toyota", mileage: "81,000 km" },
  { id: 8, name: "Nissan Note", year: 2021, price: "$14,800", image: "https://images.unsplash.com/photo-1685881624233-180b4ebcdc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080", specs: ["AT", "1200cc", "Petrol", "2WD"], sold: false, make: "Nissan", mileage: "21,000 km" },
];

const POPULAR_MAKES = ["Toyota", "Honda", "Nissan", "Mazda", "Suzuki", "Mitsubishi", "Subaru", "Daihatsu"];

type Filters = {
  keyword: string;
  make: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  driveType: string;
  transmission: string;
};

const emptyFilters: Filters = {
  keyword: "", make: "", model: "", yearMin: "", yearMax: "",
  priceMin: "", priceMax: "", driveType: "", transmission: ""
};

const FILTER_LABELS: Record<keyof Filters, string> = {
  keyword: "Keyword", make: "Make", model: "Model",
  yearMin: "Year from", yearMax: "Year to",
  priceMin: "Min $", priceMax: "Max $",
  driveType: "Drive", transmission: "Trans.",
};

export function InventoryPage() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const activeFilterEntries = (Object.keys(filters) as (keyof Filters)[]).filter((k) => filters[k]);
  const activeFilterCount = activeFilterEntries.length;

  // Filter + sort
  const filteredCars = useMemo(() => {
    let list = cars.filter((c) => {
      if (filters.make && c.make !== filters.make) return false;
      if (filters.keyword && !c.name.toLowerCase().includes(filters.keyword.toLowerCase()) && !c.make.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
      if (filters.model && !c.name.toLowerCase().includes(filters.model.toLowerCase())) return false;
      if (filters.yearMin && c.year < Number(filters.yearMin)) return false;
      if (filters.yearMax && c.year > Number(filters.yearMax)) return false;
      const priceNum = Number(c.price.replace(/[^0-9]/g, ""));
      if (filters.priceMin && priceNum < Number(filters.priceMin)) return false;
      if (filters.priceMax && priceNum > Number(filters.priceMax)) return false;
      if (filters.driveType && !c.specs.includes(filters.driveType)) return false;
      if (filters.transmission && !c.specs.includes(filters.transmission)) return false;
      return true;
    });

    const priceOf = (c: typeof cars[number]) => Number(c.price.replace(/[^0-9]/g, ""));
    if (sortBy === "price-asc") list = [...list].sort((a, b) => priceOf(a) - priceOf(b));
    if (sortBy === "price-desc") list = [...list].sort((a, b) => priceOf(b) - priceOf(a));
    if (sortBy === "year-desc") list = [...list].sort((a, b) => b.year - a.year);
    if (sortBy === "year-asc") list = [...list].sort((a, b) => a.year - b.year);
    return list;
  }, [filters, sortBy]);

  const makeCounts = useMemo(() => {
    const m: Record<string, number> = {};
    cars.forEach((c) => { m[c.make] = (m[c.make] || 0) + 1; });
    return m;
  }, []);

  const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0589d9] focus:ring-2 focus:ring-[#0589d9]/10 bg-white transition-all";
  const selectCls = inputCls + " cursor-pointer";

  const SidebarContent = () => (
    <div className="space-y-0">
      <FilterGroup title="Search Keywords">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Toyota, Sedan, Hiace..."
            className={`${inputCls} pl-8`}
            value={filters.keyword}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Make">
        <select className={selectCls} value={filters.make} onChange={(e) => setFilters({ ...filters, make: e.target.value })}>
          <option value="">All Makes</option>
          {POPULAR_MAKES.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup title="Model">
        <input
          type="text"
          placeholder="Enter model name"
          className={inputCls}
          value={filters.model}
          onChange={(e) => setFilters({ ...filters, model: e.target.value })}
        />
      </FilterGroup>

      <FilterGroup title="Year Range">
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="From" className={inputCls} value={filters.yearMin} onChange={(e) => setFilters({ ...filters, yearMin: e.target.value })} />
          <input type="number" placeholder="To" className={inputCls} value={filters.yearMax} onChange={(e) => setFilters({ ...filters, yearMax: e.target.value })} />
        </div>
      </FilterGroup>

      <FilterGroup title="Price Range (USD)">
        <div className="grid grid-cols-2 gap-2">
          <input type="number" placeholder="Min" className={inputCls} value={filters.priceMin} onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })} />
          <input type="number" placeholder="Max" className={inputCls} value={filters.priceMax} onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })} />
        </div>
      </FilterGroup>

      <FilterGroup title="Drive Type">
        <div className="flex flex-wrap gap-2">
          {["All", "2WD", "4WD", "AWD"].map((type) => {
            const selected = (type === "All" && !filters.driveType) || filters.driveType === type;
            return (
              <button
                key={type}
                onClick={() => setFilters({ ...filters, driveType: type === "All" ? "" : type })}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                  selected
                    ? "bg-[#00275c] text-white border-[#00275c]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#0589d9] hover:text-[#0589d9]"
                }`}
                style={{ fontWeight: 600 }}
              >
                {type}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Transmission">
        <div className="flex gap-2">
          {["All", "AT", "MT"].map((t) => {
            const selected = (t === "All" && !filters.transmission) || filters.transmission === t;
            return (
              <button
                key={t}
                onClick={() => setFilters({ ...filters, transmission: t === "All" ? "" : t })}
                className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${
                  selected
                    ? "bg-[#00275c] text-white border-[#00275c]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#0589d9] hover:text-[#0589d9]"
                }`}
                style={{ fontWeight: 600 }}
              >
                {t}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <div className="flex gap-2 pt-2">
        <button
          className="flex-1 bg-[#00275c] hover:bg-[#0589d9] text-white py-2.5 rounded-lg text-sm transition-all shadow-sm hover:shadow-md"
          style={{ fontWeight: 700 }}
        >
          Apply Filters
        </button>
        {activeFilterCount > 0 && (
          <button
            onClick={() => setFilters(emptyFilters)}
            className="px-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-sm transition-colors"
            aria-label="Reset filters"
          >
            <X size={15} />
          </button>
        )}
      </div>
    </div>
  );

  // Icon helper for spec pills
  const specIcon = (spec: string) => {
    if (spec === "AT" || spec === "MT") return <Settings2 size={11} />;
    if (spec.includes("cc")) return <Gauge size={11} />;
    if (["Petrol", "Diesel", "Hybrid"].includes(spec)) return <Fuel size={11} />;
    if (["2WD", "4WD", "AWD"].includes(spec)) return <Car size={11} />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── HERO HEADER ─── */}
      <section className="relative bg-[#00275c] overflow-hidden">
        {/* subtle ambient glows + dot grid, same language as homepage hero */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 85% 0%, rgba(0,147,208,0.22) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 0% 100%, rgba(0,56,130,0.55) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10 md:pt-8 md:pb-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/50 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">Inventory</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#0589d9]/15 border border-[#0589d9]/30 rounded-full px-3 py-1 mb-3">
                <span className="w-1.5 h-1.5 bg-[#0589d9] rounded-full animate-pulse" />
                <span className="text-[#0589d9] text-[10px] tracking-[0.2em] uppercase" style={{ fontWeight: 700 }}>
                  Live Inventory
                </span>
              </div>
              <h1 className="text-white font-display" style={{ fontSize: "clamp(1.65rem, 3.4vw, 2.5rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                Japanese Used Cars For Sale
              </h1>
              <p className="text-white/65 text-sm mt-2 max-w-xl">
                Browse auction-verified vehicles from Japan's top dealers. Transparent FOB pricing, full inspection reports included.
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-5 text-white">
              <div>
                <div className="font-display" style={{ fontSize: "1.65rem", fontWeight: 800, color: "#fff" }}>{filteredCars.length}</div>
                <div className="text-[11px] text-white/50 uppercase tracking-widest" style={{ fontWeight: 600 }}>Results</div>
              </div>
              <div className="w-px h-10 bg-white/15" />
              <div>
                <div className="font-display" style={{ fontSize: "1.65rem", fontWeight: 800, color: "#fff" }}>150K+</div>
                <div className="text-[11px] text-white/50 uppercase tracking-widest" style={{ fontWeight: 600 }}>Total stock</div>
              </div>
            </div>
          </div>

          {/* Inline search + quick make chips */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-[0_20px_50px_rgba(0,10,40,0.4)]">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by make, model, or keyword…"
                  className="w-full pl-10 pr-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 border border-transparent focus:border-[#0589d9] focus:outline-none focus:ring-2 focus:ring-[#0589d9]/15 rounded-lg bg-gray-50 transition-all"
                  value={filters.keyword}
                  onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                />
              </div>
              <select
                className="py-2.5 px-3 text-sm text-gray-700 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0589d9] bg-white cursor-pointer md:w-44"
                value={filters.make}
                onChange={(e) => setFilters({ ...filters, make: e.target.value })}
              >
                <option value="">All Makes</option>
                {POPULAR_MAKES.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <button className="bg-[#00275c] hover:bg-[#0589d9] text-white px-6 py-2.5 rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-sm" style={{ fontWeight: 700 }}>
                <Search size={15} />
                Search
              </button>
            </div>

            {/* Quick make chips */}
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest mr-1" style={{ fontWeight: 700 }}>Popular:</span>
              <button
                onClick={() => setFilters({ ...filters, make: "" })}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  !filters.make
                    ? "bg-[#00275c] text-white border-[#00275c]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#0589d9] hover:text-[#0589d9]"
                }`}
                style={{ fontWeight: 600 }}
              >
                All <span className="opacity-60">({cars.length})</span>
              </button>
              {POPULAR_MAKES.filter((m) => makeCounts[m]).map((m) => (
                <button
                  key={m}
                  onClick={() => setFilters({ ...filters, make: m })}
                  className={`px-3 py-1 text-xs rounded-full border transition-all ${
                    filters.make === m
                      ? "bg-[#00275c] text-white border-[#00275c]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#0589d9] hover:text-[#0589d9]"
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {m} <span className="opacity-60">({makeCounts[m]})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TOOLBAR: sort, view, mobile filter ─── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <p className="text-sm text-gray-600">
              <span className="text-[#00275c]" style={{ fontWeight: 800 }}>{filteredCars.length}</span>
              <span className="text-gray-400"> of {cars.length} vehicles</span>
            </p>
            {activeFilterCount > 0 && (
              <button
                onClick={() => setFilters(emptyFilters)}
                className="hidden sm:inline-flex items-center gap-1 text-xs text-[#0589d9] hover:underline"
                style={{ fontWeight: 600 }}
              >
                Clear all ({activeFilterCount})
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-700 hover:border-[#0589d9] hover:text-[#0589d9] transition-colors relative"
            >
              <Filter size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 min-w-[18px] h-[18px] bg-[#0589d9] text-white rounded-full text-[10px] flex items-center justify-center" style={{ fontWeight: 700 }}>
                  {activeFilterCount}
                </span>
              )}
            </button>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0589d9] bg-white cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="year-asc">Year: Oldest First</option>
            </select>
            <div className="hidden sm:flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
                className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-[#00275c] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-[#00275c] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="border-t border-gray-100 bg-gray-50/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest" style={{ fontWeight: 700 }}>Active:</span>
              {activeFilterEntries.map((k) => (
                <button
                  key={k}
                  onClick={() => setFilters({ ...filters, [k]: "" })}
                  className="inline-flex items-center gap-1.5 bg-white border border-gray-200 hover:border-[#0589d9] hover:text-[#0589d9] text-gray-700 text-xs px-2.5 py-1 rounded-full transition-all group"
                  style={{ fontWeight: 600 }}
                >
                  <span className="text-gray-400 group-hover:text-[#0589d9]">{FILTER_LABELS[k]}:</span>
                  {filters[k]}
                  <X size={12} className="text-gray-400 group-hover:text-[#0589d9]" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/55 z-50 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          >
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="absolute top-0 left-0 w-80 max-w-[88vw] h-full bg-white shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
                <h3 className="flex items-center gap-2 text-gray-800" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  <SlidersHorizontal size={15} className="text-[#0589d9]" />
                  Search Filters
                </h3>
                <button onClick={() => setMobileSidebarOpen(false)} aria-label="Close filters">
                  <X size={20} className="text-gray-400 hover:text-gray-700" />
                </button>
              </div>
              <div className="p-5">
                <SidebarContent />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="flex items-center gap-2 text-gray-800" style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                  <SlidersHorizontal size={15} className="text-[#0589d9]" />
                  Search Filters
                </h2>
                {activeFilterCount > 0 && (
                  <span className="text-[10px] bg-[#0589d9] text-white px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ fontWeight: 700 }}>
                    {activeFilterCount} Active
                  </span>
                )}
              </div>
              <SidebarContent />
            </div>
          </aside>

          {/* Results */}
          <div className="col-span-1 lg:col-span-3">
            {filteredCars.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center">
                <div className="w-16 h-16 rounded-full bg-[#0589d9]/10 flex items-center justify-center mx-auto mb-5">
                  <SearchX size={28} className="text-[#0589d9]" />
                </div>
                <h3 className="text-gray-800 mb-2" style={{ fontWeight: 700, fontSize: "1.1rem" }}>No vehicles match your filters</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                  Try adjusting your filters or browse all vehicles. We can also source a custom vehicle for you.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setFilters(emptyFilters)}
                    className="bg-[#00275c] hover:bg-[#0589d9] text-white px-5 py-2.5 rounded-lg text-sm transition-all"
                    style={{ fontWeight: 700 }}
                  >
                    Clear Filters
                  </button>
                  <Link to="/order-custom">
                    <button className="border border-gray-200 text-gray-700 hover:border-[#0589d9] hover:text-[#0589d9] px-5 py-2.5 rounded-lg text-sm transition-all" style={{ fontWeight: 600 }}>
                      Request Custom Order
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <motion.div
                layout
                className={`grid gap-5 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {filteredCars.map((car, i) => (
                  <motion.div
                    key={car.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                    className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#0589d9]/30 transition-all duration-300 group overflow-hidden ${
                      viewMode === "list" ? "flex flex-col sm:flex-row sm:h-56" : ""
                    }`}
                  >
                    <div className={`relative overflow-hidden flex-shrink-0 bg-gray-100 ${viewMode === "list" ? "sm:w-60" : ""}`}>
                      <ImageWithFallback
                        src={car.image}
                        alt={car.name}
                        className={`object-cover group-hover:scale-105 transition-transform duration-500 ${
                          viewMode === "list" ? "w-full h-56 sm:h-full" : "w-full h-52"
                        }`}
                      />
                      {/* Year badge */}
                      <div className="absolute top-3 left-3 bg-[#00275c] text-white text-xs px-2.5 py-1 rounded-lg shadow-sm" style={{ fontWeight: 700 }}>
                        {car.year}
                      </div>
                      {/* Make badge */}
                      <div className="absolute top-3 right-12 bg-white/90 backdrop-blur text-gray-700 text-[10px] uppercase tracking-wider px-2 py-1 rounded-lg shadow-sm" style={{ fontWeight: 700 }}>
                        {car.make}
                      </div>
                      {/* Wishlist */}
                      <button
                        onClick={() => setWishlist(w => w.includes(car.id) ? w.filter(id => id !== car.id) : [...w, car.id])}
                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-all"
                        aria-label="Toggle wishlist"
                      >
                        <Heart size={14} className={wishlist.includes(car.id) ? "text-red-500 fill-red-500" : "text-gray-400"} />
                      </button>
                      {/* Sold overlay */}
                      {car.sold && (
                        <div className="absolute inset-0 bg-gradient-to-br from-black/75 to-black/55 flex items-center justify-center">
                          <div className="bg-red-600 text-white px-8 py-2 shadow-xl" style={{ transform: "rotate(-15deg)", fontWeight: 800, fontSize: "1.15rem", letterSpacing: "0.12em" }}>
                            SOLD
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-gray-900 mb-1 truncate font-display" style={{ fontWeight: 700, fontSize: "1rem" }}>{car.name}</h3>
                        <p className="text-gray-500 text-xs mb-3 flex items-center gap-1.5">
                          <Gauge size={12} className="text-gray-400" />
                          {car.mileage}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {car.specs.map((spec) => (
                            <span key={spec} className="inline-flex items-center gap-1 bg-[#00275c]/6 text-[#00275c] border border-[#00275c]/10 text-[11px] px-2 py-0.5 rounded-md" style={{ fontWeight: 600 }}>
                              {specIcon(spec)}
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-end justify-between gap-3 pt-2 border-t border-gray-100">
                        <div>
                          <p className="text-[#00275c] font-display" style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.02em" }}>{car.price}</p>
                          <p className="text-gray-400 text-[10px] uppercase tracking-widest" style={{ fontWeight: 600 }}>FOB Japan</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Link to={`/car/${car.id}`}>
                            <button className="flex items-center gap-1.5 bg-[#00275c] hover:bg-[#0589d9] text-white px-4 py-2 rounded-lg text-xs transition-all duration-200 whitespace-nowrap shadow-sm" style={{ fontWeight: 700 }}>
                              <Eye size={13} /> Details
                            </button>
                          </Link>
                          <Link to="/contact">
                            <button className="px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-[#0589d9] hover:text-[#0589d9] transition-all whitespace-nowrap" style={{ fontWeight: 600 }}>
                              Inquire
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Pagination */}
            {filteredCars.length > 0 && (
              <div className="mt-10 flex justify-center items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg bg-white hover:border-[#0589d9] hover:text-[#0589d9] transition-all text-gray-500" aria-label="Previous">
                  <ChevronLeft size={16} />
                </button>
                {[1, 2, 3, "...", 8].map((p, i) => (
                  <button
                    key={i}
                    className={`min-w-[40px] h-10 px-3 flex items-center justify-center rounded-lg text-sm transition-all ${
                      p === 1
                        ? "bg-[#00275c] text-white shadow-md"
                        : p === "..."
                        ? "text-gray-400 cursor-default"
                        : "bg-white border border-gray-200 text-gray-700 hover:border-[#0589d9] hover:text-[#0589d9]"
                    }`}
                    style={{ fontWeight: p === 1 ? 800 : 600 }}
                  >
                    {p}
                  </button>
                ))}
                <button className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg bg-white hover:border-[#0589d9] hover:text-[#0589d9] transition-all text-gray-500" aria-label="Next">
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Can't find CTA */}
            <div className="mt-10 relative bg-[#00275c] rounded-2xl p-6 md:p-8 overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(0,147,208,0.3) 0%, transparent 60%)",
                }}
              />
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div className="text-white">
                  <div className="inline-flex items-center gap-1.5 text-[10px] text-[#0589d9] uppercase tracking-[0.2em] mb-2" style={{ fontWeight: 700 }}>
                    <CheckCircle2 size={12} />
                    Custom Sourcing Available
                  </div>
                  <p className="font-display" style={{ fontWeight: 800, fontSize: "1.15rem" }}>Can't find the car you're looking for?</p>
                  <p className="text-white/65 text-sm mt-1 max-w-md">Submit a custom order and our experts will search Japan's auctions for you — within 24 hours.</p>
                </div>
                <Link to="/order-custom" className="flex-shrink-0 block">
                  <button className="inline-flex items-center gap-2 bg-white text-[#00275c] hover:bg-[#0589d9] hover:text-white px-6 py-3 rounded-lg text-sm transition-all whitespace-nowrap shadow-lg" style={{ fontWeight: 800 }}>
                    Order Custom Car
                    <ArrowRight size={15} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
