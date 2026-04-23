import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar, Gauge, Fuel, Cog, Navigation, Users, Palette, Shield,
  FileCheck, Package, CheckCircle2, ArrowLeft, Heart, Share2,
  Phone, Mail, ChevronLeft, ChevronRight, Star, Sparkles,
  MessageSquare, Search, MapPin, Ship, Clock, Award, TrendingDown,
  ZoomIn, Expand, Info, ArrowRight, DoorOpen
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "inspection" | "description">("description");
  const [lightbox, setLightbox] = useState(false);

  const car = {
    id,
    name: "2001 Suzuki Wagon R",
    sku: "CAR-12345",
    price: "$1,220",
    priceOriginalJPY: "¥170,000",
    usdRate: "150.04 JPY",
    priceBreakdown: {
      price: "$1,133",
      inlandTransport: "$87",
    },
    year: 2001,
    make: "Suzuki",
    model: "Wagon R",
    rating: 4.2,
    reviews: 18,
    stock: 1,
    images: [
      "https://images.unsplash.com/photo-1715351600154-5ac1729494d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1679213035580-a5d3d84eaea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1693448658669-45ba31317995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1628846231746-b4ed87a0abef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1766524791677-6c6c495e0218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1659721604753-87d4850a6ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    specs: {
      mileage: "85,420 km",
      engine: "660cc",
      fuel: "Petrol",
      transmission: "AT",
      drive: "2WD",
      seats: "4",
      color: "Silver",
      doors: "5",
    },
    features: [
      "Air Conditioning", "Power Steering", "Power Windows", "Central Locking",
      "CD Player", "ABS", "Airbags", "Alloy Wheels", "Keyless Entry", "Traction Control",
    ],
    description:
      "This 2001 Suzuki Wagon R is a clean, well-maintained kei-class hatchback ideal for city driving and fuel efficiency. Sourced directly from a verified Japanese auction with complete service history. Excellent fuel economy, spacious interior for its class, and automatic transmission make it a perfect choice for daily commuting or a reliable second vehicle.",
    condition: "Good",
    auctionGrade: "4.0",
    location: "Tokyo, Japan",
    auctionDate: "March 2024",
    auctionHouse: "USS Tokyo",
    shipping: {
      estDays: "4–6 weeks",
      methods: ["RoRo", "Container"],
    },
  };

  const relatedCars = [
    { id: 2, name: "Honda N-Box", price: "$8,900", year: 2018, km: "62,000 km", image: "https://images.unsplash.com/photo-1659721609727-b65e34a4c07b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 3, name: "Daihatsu Move", price: "$7,800", year: 2016, km: "78,500 km", image: "https://images.unsplash.com/photo-1685881624233-180b4ebcdc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 4, name: "Suzuki Alto", price: "$6,500", year: 2019, km: "44,200 km", image: "https://images.unsplash.com/photo-1713682917086-f5e57dbabe5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
  ];

  const specItems = [
    { icon: Calendar, label: "Year", value: String(car.year) },
    { icon: Gauge, label: "Mileage", value: car.specs.mileage },
    { icon: Cog, label: "Engine", value: car.specs.engine },
    { icon: Fuel, label: "Fuel Type", value: car.specs.fuel },
    { icon: Package, label: "Transmission", value: car.specs.transmission },
    { icon: Navigation, label: "Drive Type", value: car.specs.drive },
    { icon: Users, label: "Seats", value: car.specs.seats },
    { icon: Palette, label: "Color", value: car.specs.color },
    { icon: DoorOpen, label: "Doors", value: car.specs.doors },
  ];

  const quickSpecs = [
    { icon: Calendar, label: car.year },
    { icon: Gauge, label: car.specs.mileage },
    { icon: Fuel, label: car.specs.fuel },
    { icon: Cog, label: car.specs.transmission },
    { icon: Navigation, label: car.specs.drive },
  ];

  const TABS = [
    { key: "description" as const, label: "Overview" },
    { key: "specs" as const, label: "Specifications" },
    { key: "features" as const, label: "Features" },
    { key: "inspection" as const, label: "Inspection" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══ HERO HEADER ═══ */}
      <section className="relative bg-[#00275c] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 85% 0%, rgba(5,137,217,0.28) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 0% 100%, rgba(0,56,130,0.5) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-12">
          {/* Breadcrumb + Back */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/inventory" className="hover:text-white transition-colors">Inventory</Link>
              <ChevronRight size={12} />
              <span className="text-white/80 truncate max-w-[180px] sm:max-w-none">{car.name}</span>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-all"
            >
              <ArrowLeft size={13} /> Back
            </button>
          </div>

          {/* Title + actions */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 bg-[#0589d9]/15 border border-[#0589d9]/30 rounded-full px-3 py-1 mb-3">
                <Sparkles size={11} className="text-[#0589d9]" />
                <span className="text-[#0589d9] text-[10px] tracking-[0.2em] uppercase" style={{ fontWeight: 700 }}>
                  Auction Verified · In Stock
                </span>
              </div>
              <h1 className="text-white font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                {car.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-sm text-white/65">
                <span className="flex items-center gap-1.5">
                  <span className="text-white/40">SKU:</span>
                  <span className="text-white" style={{ fontWeight: 600 }}>{car.sku}</span>
                </span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-[#0589d9]" />
                  {car.location}
                </span>
                <span className="text-white/20">·</span>
                <span className="flex items-center gap-1">
                  {[1, 2, 3, 4].map(s => <Star key={s} size={12} className="text-yellow-400 fill-yellow-400" />)}
                  <Star size={12} className="text-white/20 fill-white/20" />
                  <span className="ml-1.5 text-white/80 text-xs">{car.rating} · {car.reviews} reviews</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm ${
                  wishlisted
                    ? "border-red-400/60 bg-red-500/15 text-red-300"
                    : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/30"
                }`}
                style={{ fontWeight: 600 }}
              >
                <Heart size={15} className={wishlisted ? "fill-red-400 text-red-400" : ""} />
                <span className="hidden sm:inline">{wishlisted ? "Saved" : "Save"}</span>
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/30 transition-all text-sm" style={{ fontWeight: 600 }}>
                <Share2 size={15} />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Quick spec chips */}
          <div className="flex flex-wrap gap-2 mt-5">
            {quickSpecs.map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Icon size={12} className="text-[#0589d9]" />
                <span className="text-white/85 text-xs" style={{ fontWeight: 600 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAIN ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-10 -mt-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ── LEFT ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5"
            >
              <div className="relative mb-3 overflow-hidden rounded-xl bg-gray-100 group">
                <ImageWithFallback
                  src={car.images[selectedImage]}
                  alt={car.name}
                  className="w-full h-[300px] md:h-[440px] object-cover"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="bg-[#00275c] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ fontWeight: 700 }}>
                    <Award size={11} className="text-[#0589d9]" />
                    Grade {car.auctionGrade}
                  </div>
                  <div className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ fontWeight: 700 }}>
                    <CheckCircle2 size={11} />
                    Verified
                  </div>
                </div>
                {/* Zoom */}
                <button
                  onClick={() => setLightbox(true)}
                  className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white rounded-lg shadow-sm flex items-center justify-center transition-all"
                  aria-label="Zoom image"
                >
                  <Expand size={15} className="text-gray-700" />
                </button>
                {/* Nav arrows */}
                <button
                  onClick={() => setSelectedImage((prev) => (prev - 1 + car.images.length) % car.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} className="text-gray-700" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev + 1) % car.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next"
                >
                  <ChevronRight size={18} className="text-gray-700" />
                </button>
                {/* Counter */}
                <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                  <ZoomIn size={11} />
                  {selectedImage + 1} / {car.images.length}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-[#0589d9] shadow-md ring-2 ring-[#0589d9]/20"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <ImageWithFallback src={img} alt="" className="w-full h-14 md:h-16 object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tabs card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Tab strip */}
              <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex-1 sm:flex-none px-5 md:px-7 py-4 text-sm transition-all whitespace-nowrap ${
                      activeTab === tab.key ? "text-[#00275c]" : "text-gray-500 hover:text-gray-800"
                    }`}
                    style={{ fontWeight: activeTab === tab.key ? 800 : 600 }}
                  >
                    {tab.label}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="tabIndicator"
                        className="absolute left-4 right-4 bottom-0 h-0.5 bg-gradient-to-r from-[#00275c] to-[#0589d9] rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-6 md:p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "description" && (
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-gray-900 font-display mb-2" style={{ fontWeight: 800, fontSize: "1.05rem" }}>About This Vehicle</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{car.description}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {[
                            { icon: Shield, title: "Auction Verified", desc: "Inspected by certified Japanese auction house" },
                            { icon: FileCheck, title: "Full Report", desc: "Exterior, interior & mechanical assessment" },
                            { icon: Ship, title: "Worldwide Shipping", desc: `${car.shipping.estDays} to 60+ countries` },
                          ].map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="border border-gray-100 rounded-xl p-4 hover:border-[#0589d9]/40 hover:bg-[#0589d9]/5 transition-all">
                              <div className="w-9 h-9 bg-[#0589d9]/10 rounded-lg flex items-center justify-center mb-2.5">
                                <Icon size={16} className="text-[#0589d9]" />
                              </div>
                              <p className="text-[#00275c] text-sm" style={{ fontWeight: 700 }}>{title}</p>
                              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "specs" && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {specItems.map(({ icon: Icon, label, value }, idx) => (
                          <div key={label} className="bg-[#f3f6fb] rounded-2xl p-4">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                                idx === 0
                                  ? "bg-gradient-to-br from-[#0589d9] to-[#06adf5] shadow-sm shadow-[#0589d9]/30"
                                  : "bg-[#e0edf8]"
                              }`}
                            >
                              <Icon size={16} className={idx === 0 ? "text-white" : "text-[#0589d9]"} />
                            </div>
                            <p className="text-gray-400 text-xs mb-0.5" style={{ fontWeight: 500 }}>{label}</p>
                            <p className="text-[#00275c] text-sm" style={{ fontWeight: 800 }}>{value}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "features" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-gray-900 font-display" style={{ fontWeight: 800, fontSize: "1rem" }}>Included Features</h3>
                          <span className="text-xs text-[#0589d9]" style={{ fontWeight: 700 }}>{car.features.length} features</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {car.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-2.5 bg-[#effaf3] rounded-xl px-4 py-3">
                              <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" strokeWidth={2} />
                              <span className="text-gray-800 text-sm" style={{ fontWeight: 500 }}>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "inspection" && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 text-center">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10" />
                            <div className="relative">
                              <p className="text-green-700 text-[10px] uppercase tracking-widest mb-2" style={{ fontWeight: 700 }}>Auction Grade</p>
                              <p className="text-green-600 font-display" style={{ fontSize: "2.4rem", fontWeight: 800, lineHeight: 1 }}>{car.auctionGrade}</p>
                              <p className="text-green-700/70 text-xs mt-1">out of 5.0</p>
                            </div>
                          </div>
                          <div className="bg-[#0589d9]/5 border border-[#0589d9]/25 rounded-xl p-5 text-center">
                            <p className="text-[#0589d9] text-[10px] uppercase tracking-widest mb-2" style={{ fontWeight: 700 }}>Condition</p>
                            <p className="text-[#00275c] font-display" style={{ fontSize: "1.5rem", fontWeight: 800 }}>{car.condition}</p>
                            <p className="text-gray-500 text-xs mt-1">Assessed at auction</p>
                          </div>
                          <div className="bg-[#00275c]/5 border border-[#00275c]/15 rounded-xl p-5 text-center">
                            <p className="text-[#00275c] text-[10px] uppercase tracking-widest mb-2" style={{ fontWeight: 700 }}>Auction House</p>
                            <p className="text-[#00275c] font-display" style={{ fontSize: "1.1rem", fontWeight: 800 }}>{car.auctionHouse}</p>
                            <p className="text-gray-500 text-xs mt-1">{car.auctionDate}</p>
                          </div>
                        </div>
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileCheck size={18} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-amber-900 text-sm" style={{ fontWeight: 700 }}>Full Inspection Report Available</p>
                            <p className="text-amber-800/80 text-xs mt-1 leading-relaxed">
                              Thoroughly inspected at a Japanese auto auction. Report covers exterior, interior, mechanical components, and accident history.
                            </p>
                            <button className="mt-2 inline-flex items-center gap-1 text-xs text-amber-900 hover:underline" style={{ fontWeight: 700 }}>
                              Request full report <ArrowRight size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Gradient header */}
                <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #00275c 0%, #0589d9 100%)" }}>
                  <div
                    className="absolute inset-0 opacity-[0.1]"
                    style={{
                      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="relative px-5 py-3.5 flex items-center justify-between">
                    <h3 className="text-white flex items-center gap-2" style={{ fontWeight: 800, fontSize: "0.95rem" }}>
                      <TrendingDown size={15} className="text-white/70" />
                      Pricing Information
                    </h3>
                    <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wider" style={{ fontWeight: 700 }}>FOB</span>
                  </div>
                </div>

                {/* Price */}
                <div className="px-5 py-5 text-center border-b border-gray-100">
                  <p className="text-[#00275c] font-display" style={{ fontSize: "2.6rem", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>{car.price}</p>
                  <p className="text-gray-400 text-xs mt-2 uppercase tracking-widest" style={{ fontWeight: 600 }}>FOB Price</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <span className="text-gray-500 text-xs">Original: <span className="text-gray-700" style={{ fontWeight: 600 }}>{car.priceOriginalJPY}</span></span>
                  </div>
                  <div className="inline-block bg-[#0589d9]/10 text-[#0589d9] text-[10px] px-2.5 py-1 rounded-full mt-2" style={{ fontWeight: 700 }}>
                    USD Rate: {car.usdRate}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="px-5 py-4 space-y-2 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 text-xs">Vehicle Price</span>
                    <span className="text-[#00275c]" style={{ fontWeight: 700 }}>{car.priceBreakdown.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 text-xs">Inland Transport</span>
                    <span className="text-[#00275c]" style={{ fontWeight: 700 }}>{car.priceBreakdown.inlandTransport}</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-dashed border-gray-200 flex justify-between items-center text-sm">
                    <span className="text-gray-700 text-xs" style={{ fontWeight: 700 }}>Total FOB</span>
                    <span className="text-[#0589d9]" style={{ fontWeight: 800 }}>{car.price}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-4 py-4 space-y-2.5">
                  <Link to="/contact" className="block">
                    <button
                      className="group w-full text-white py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-[0_10px_30px_rgba(5,137,217,0.35)]"
                      style={{
                        fontWeight: 800, fontSize: "0.9rem",
                        background: "linear-gradient(135deg, #00275c 0%, #0589d9 100%)",
                      }}
                    >
                      <MessageSquare size={15} />
                      Send Inquiry
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </Link>
                  <Link to="/order-custom" className="block">
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-[#0589d9] bg-white hover:bg-[#0589d9]/5 text-[#00275c] py-3 rounded-xl text-sm transition-all" style={{ fontWeight: 700 }}>
                      <Search size={14} className="text-[#0589d9]" />
                      Order Similar Custom Car
                    </button>
                  </Link>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a href="tel:+81312345678">
                      <button className="w-full flex items-center justify-center gap-1.5 border border-gray-200 hover:border-[#0589d9] hover:text-[#0589d9] text-gray-600 py-2.5 rounded-xl text-xs transition-all" style={{ fontWeight: 600 }}>
                        <Phone size={13} />
                        Call
                      </button>
                    </a>
                    <a href="mailto:info@dolphinjapan.com">
                      <button className="w-full flex items-center justify-center gap-1.5 border border-gray-200 hover:border-[#0589d9] hover:text-[#0589d9] text-gray-600 py-2.5 rounded-xl text-xs transition-all" style={{ fontWeight: 600 }}>
                        <Mail size={13} />
                        Email
                      </button>
                    </a>
                  </div>
                </div>

                {/* Secure note */}
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex items-center gap-2">
                  <Shield size={13} className="text-green-600 flex-shrink-0" />
                  <p className="text-[11px] text-gray-500 leading-tight">
                    <span className="text-gray-700" style={{ fontWeight: 700 }}>Secure transaction.</span> No payment taken on this page.
                  </p>
                </div>
              </motion.div>

              {/* Shipping card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-[#0589d9]/10 rounded-lg flex items-center justify-center">
                    <Ship size={16} className="text-[#0589d9]" />
                  </div>
                  <div>
                    <h3 className="text-[#00275c] font-display" style={{ fontWeight: 800, fontSize: "0.95rem" }}>Shipping Details</h3>
                    <p className="text-gray-500 text-[11px]">Worldwide delivery</p>
                  </div>
                </div>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs flex items-center gap-1.5"><Clock size={12} /> Est. Delivery</span>
                    <span className="text-[#00275c]" style={{ fontWeight: 700 }}>{car.shipping.estDays}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs flex items-center gap-1.5"><Ship size={12} /> Methods</span>
                    <span className="text-[#00275c] text-xs" style={{ fontWeight: 700 }}>{car.shipping.methods.join(" · ")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs flex items-center gap-1.5"><MapPin size={12} /> From</span>
                    <span className="text-[#00275c] text-xs" style={{ fontWeight: 700 }}>{car.location}</span>
                  </div>
                </div>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#0589d9] hover:text-[#00275c] transition-colors" style={{ fontWeight: 700 }}>
                  Get shipping quote to your port
                  <ArrowRight size={12} />
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
              >
                <h3 className="text-[#00275c] font-display mb-4" style={{ fontWeight: 800, fontSize: "0.95rem" }}>Why Buy From Us</h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, label: "Verified Seller", desc: "Licensed Japanese exporter" },
                    { icon: FileCheck, label: "Inspection Report", desc: "Full auction report included" },
                    { icon: Award, label: "15+ Years", desc: "Trusted by 30,000+ buyers" },
                    { icon: Package, label: "Worldwide Shipping", desc: "RoRo & container options" },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#0589d9]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-[#0589d9]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[#00275c] text-sm truncate" style={{ fontWeight: 700 }}>{label}</p>
                        <p className="text-gray-500 text-xs truncate">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Custom order CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative bg-[#001a3e] rounded-2xl p-5 text-white overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(5,137,217,0.35) 0%, transparent 60%)" }}
                />
                <div className="relative">
                  <div className="inline-flex items-center gap-1.5 bg-[#0589d9]/20 border border-[#0589d9]/30 rounded-full px-2.5 py-0.5 mb-2">
                    <Sparkles size={10} className="text-[#0589d9]" />
                    <span className="text-[#0589d9] text-[9px] tracking-[0.2em] uppercase" style={{ fontWeight: 700 }}>Custom Order</span>
                  </div>
                  <p className="font-display mb-1" style={{ fontWeight: 800, fontSize: "1rem" }}>Not quite right?</p>
                  <p className="text-white/65 text-xs mb-3 leading-relaxed">
                    Let us find the exact vehicle you're looking for from Japan's top auctions.
                  </p>
                  <Link to="/order-custom" className="block">
                    <button className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#00275c] hover:bg-[#0589d9] hover:text-white py-2.5 rounded-xl text-sm transition-all" style={{ fontWeight: 800 }}>
                      Place Custom Order
                      <ArrowRight size={13} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>

        {/* ═══ SIMILAR VEHICLES ═══ */}
        <div className="mt-14 md:mt-20">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-[#0589d9]/10 border border-[#0589d9]/20 rounded-full px-2.5 py-0.5 mb-2">
                <span className="text-[#0589d9] text-[10px] tracking-[0.2em] uppercase" style={{ fontWeight: 700 }}>You May Also Like</span>
              </div>
              <h2 className="text-[#00275c] font-display" style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Similar Vehicles
              </h2>
            </div>
            <Link to="/inventory" className="text-[#0589d9] text-sm flex items-center gap-1 hover:gap-2 transition-all group" style={{ fontWeight: 700 }}>
              View All
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedCars.map((rc, i) => (
              <motion.div
                key={rc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#0589d9]/30 transition-all group overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={rc.image}
                    alt={rc.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#00275c] text-white text-xs px-2.5 py-1 rounded-lg shadow-sm" style={{ fontWeight: 700 }}>
                    {rc.year}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#00275c] text-xs px-2.5 py-1 rounded-lg flex items-center gap-1" style={{ fontWeight: 700 }}>
                    <Gauge size={11} />
                    {rc.km}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-[#00275c] mb-1" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{rc.name}</h3>
                  <p className="text-[#0589d9] font-display mb-4" style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.02em" }}>{rc.price}</p>
                  <div className="flex gap-2">
                    <Link to={`/car/${rc.id}`} className="flex-1">
                      <button className="w-full bg-[#00275c] hover:bg-[#0589d9] text-white py-2.5 rounded-xl text-xs transition-all shadow-sm" style={{ fontWeight: 700 }}>
                        View Details
                      </button>
                    </Link>
                    <Link to="/contact">
                      <button className="px-3 py-2.5 border border-gray-200 rounded-xl text-xs text-gray-600 hover:border-[#0589d9] hover:text-[#0589d9] transition-all" style={{ fontWeight: 600 }}>
                        Inquire
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
              aria-label="Close"
            >
              ✕
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImage((p) => (p - 1 + car.images.length) % car.images.length); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImage((p) => (p + 1) % car.images.length); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all"
            >
              <ChevronRight size={22} />
            </button>
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={car.images[selectedImage]}
              alt={car.name}
              className="max-w-full max-h-[88vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full">
              {selectedImage + 1} / {car.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
