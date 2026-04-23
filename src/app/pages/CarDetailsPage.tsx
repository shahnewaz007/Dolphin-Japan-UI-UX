import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Calendar, Gauge, Fuel, Cog, Navigation, Users, Palette, Shield,
  FileCheck, Package, CheckCircle2, ArrowLeft, Heart, Share2,
  Phone, Mail, ChevronLeft, ChevronRight, ChevronDown, Star,
  MessageSquare, Search, MapPin
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "inspection">("specs");

  const car = {
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
    condition: "Good",
    auctionGrade: "4.0",
    location: "Tokyo, Japan",
    auctionDate: "March 2024",
    auctionHouse: "USS Tokyo",
  };

  const relatedCars = [
    { id: 2, name: "Honda N-Box", price: "$8,900", year: 2018, image: "https://images.unsplash.com/photo-1659721609727-b65e34a4c07b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 3, name: "Daihatsu Move", price: "$7,800", year: 2016, image: "https://images.unsplash.com/photo-1685881624233-180b4ebcdc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
    { id: 4, name: "Suzuki Alto", price: "$6,500", year: 2019, image: "https://images.unsplash.com/photo-1713682917086-f5e57dbabe5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080" },
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
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-400 hover:text-[#0589d9] transition-colors">Home</Link>
            <ChevronRight size={14} className="text-gray-300" />
            <Link to="/inventory" className="text-gray-400 hover:text-[#0589d9] transition-colors">Inventory</Link>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-gray-700" style={{ fontWeight: 500 }}>{car.name}</span>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-sm text-[#0589d9] hover:gap-2 transition-all"
          >
            <ArrowLeft size={15} /> Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── LEFT / MAIN ─── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-gray-900 mb-1" style={{ fontSize: "1.6rem", fontWeight: 800 }}>{car.name}</h1>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>SKU: <span className="text-gray-600" style={{ fontWeight: 500 }}>{car.sku}</span></span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {car.location}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      {[1,2,3,4].map(s => <Star key={s} size={12} className="text-yellow-400 fill-yellow-400" />)}
                      <Star size={12} className="text-gray-200 fill-gray-200" />
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className={`p-2.5 rounded-xl border transition-all ${wishlisted ? "border-red-300 bg-red-50 text-red-500" : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"}`}
                  >
                    <Heart size={18} className={wishlisted ? "fill-red-500" : ""} />
                  </button>
                  <button className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:border-[#0589d9] hover:text-[#0589d9] transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-100">
                <ImageWithFallback
                  src={car.images[selectedImage]}
                  alt={car.name}
                  className="w-full h-[380px] object-cover"
                />
                {/* Nav arrows */}
                <button
                  onClick={() => setSelectedImage((prev) => (prev - 1 + car.images.length) % car.images.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all"
                >
                  <ChevronLeft size={18} className="text-gray-700" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev + 1) % car.images.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all"
                >
                  <ChevronRight size={18} className="text-gray-700" />
                </button>
                {/* Counter */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                  {selectedImage + 1} / {car.images.length}
                </div>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
                      selectedImage === idx
                        ? "border-[#0589d9] opacity-100 shadow-md"
                        : "border-transparent opacity-70"
                    }`}
                  >
                    <ImageWithFallback src={img} alt="" className="w-full h-14 object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Tabs: Specs / Features / Inspection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Tab buttons */}
              <div className="flex border-b border-gray-100">
                {(["specs", "features", "inspection"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 text-sm transition-all capitalize ${
                      activeTab === tab
                        ? "border-b-2 border-[#0589d9] text-[#0589d9]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    style={{ fontWeight: activeTab === tab ? 700 : 500 }}
                  >
                    {tab === "specs" ? "Specifications" : tab === "features" ? "Features & Equipment" : "Inspection Report"}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === "specs" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {specItems.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="bg-gray-50 rounded-xl p-4 hover:bg-[#0589d9]/5 transition-colors group">
                        <div className="w-9 h-9 bg-[#0589d9]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#0589d9] transition-colors">
                          <Icon size={17} className="text-[#0589d9] group-hover:text-white transition-colors" />
                        </div>
                        <p className="text-gray-400 text-xs mb-0.5">{label}</p>
                        <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {car.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2.5 bg-green-50 rounded-xl px-3 py-2.5">
                        <CheckCircle2 size={15} className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "inspection" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Auction Grade", value: car.auctionGrade, sub: "out of 5.0", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
                        { label: "Condition", value: car.condition, sub: "Assessed at auction", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
                        { label: "Auction House", value: car.auctionHouse, sub: car.auctionDate, color: "text-[#00275c]", bg: "bg-blue-50", border: "border-blue-200" },
                      ].map(({ label, value, sub, color, bg, border }) => (
                        <div key={label} className={`${bg} ${border} border rounded-xl p-4 text-center`}>
                          <p className="text-gray-500 text-xs mb-2">{label}</p>
                          <p className={`${color} text-2xl`} style={{ fontWeight: 800 }}>{value}</p>
                          <p className="text-gray-400 text-xs mt-1">{sub}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <FileCheck size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-amber-800 text-sm" style={{ fontWeight: 600 }}>Full Inspection Report Available</p>
                        <p className="text-amber-700 text-xs mt-1 leading-relaxed">
                          This vehicle has been thoroughly inspected at a Japanese auto auction. The report covers exterior, interior, mechanical components, and accident history.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* ─── RIGHT SIDEBAR ─── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Pricing Information Card — matches screenshot exactly */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-[#0589d9] px-5 py-3.5">
                  <h3 className="text-white" style={{ fontWeight: 700, fontSize: "1rem" }}>Pricing Information</h3>
                </div>

                {/* Price */}
                <div className="px-5 py-5 text-center border-b border-gray-100">
                  <p className="text-[#0589d9]" style={{ fontSize: "2.2rem", fontWeight: 800 }}>{car.price}</p>
                  <p className="text-gray-400 text-sm mt-0.5">FOB Price</p>
                  <p className="text-gray-500 text-sm mt-2">Original: {car.priceOriginalJPY}</p>
                  <div className="inline-block bg-[#0589d9]/15 text-[#0589d9] text-xs px-3 py-1 rounded-full mt-2" style={{ fontWeight: 600 }}>
                    USD Rate: {car.usdRate}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="px-5 py-4 space-y-2.5 border-b border-gray-100">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="text-gray-800" style={{ fontWeight: 600 }}>{car.priceBreakdown.price}</span>
                  </div>
                  <div className="w-full h-px bg-gray-100" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Inland Transport:</span>
                    <span className="text-gray-800" style={{ fontWeight: 600 }}>{car.priceBreakdown.inlandTransport}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-4 py-4 space-y-3">
                  {/* Send Inquiry — Blue — goes to Contact */}
                  <Link to="/contact" className="block">
                    <button className="w-full bg-[#0589d9] hover:bg-[#0472b8] text-white py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg flex flex-col items-center gap-0.5">
                      <div className="flex items-center gap-2">
                        <MessageSquare size={17} />
                        <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Send Inquiry</span>
                      </div>
                      <span className="text-white/75 text-xs">Quick Inquiry</span>
                    </button>
                  </Link>

                  {/* Order Custom Car — Green — goes to Order Custom */}
                  <Link to="/order-custom" className="block">
                    <button className="w-full bg-[#2a9d5c] hover:bg-[#228b50] text-white py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg flex flex-col items-center gap-0.5">
                      <div className="flex items-center gap-2">
                        <Search size={17} />
                        <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Order Custom Car</span>
                      </div>
                      <span className="text-white/75 text-xs">Find Car Not in Stock</span>
                    </button>
                  </Link>

                  {/* Call Now + Email Us — Outline */}
                  <div className="grid grid-cols-2 gap-2">
                    <a href="tel:+81312345678" className="block">
                      <button className="w-full flex items-center justify-center gap-1.5 border border-gray-200 hover:border-[#0589d9] hover:text-[#0589d9] text-gray-600 py-2.5 rounded-xl text-sm transition-all">
                        <Phone size={14} />
                        <span style={{ fontWeight: 500 }}>Call Now</span>
                      </button>
                    </a>
                    <a href="mailto:info@dolphinjapan.com" className="block">
                      <button className="w-full flex items-center justify-center gap-1.5 border border-gray-200 hover:border-[#0589d9] hover:text-[#0589d9] text-gray-600 py-2.5 rounded-xl text-sm transition-all">
                        <Mail size={14} />
                        <span style={{ fontWeight: 500 }}>Email Us</span>
                      </button>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
              >
                <h3 className="text-gray-800 mb-4 text-sm" style={{ fontWeight: 700 }}>Why Buy From Us</h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, label: "Verified Seller", desc: "Licensed Japanese exporter" },
                    { icon: FileCheck, label: "Inspection Report", desc: "Full auction report included" },
                    { icon: Package, label: "Worldwide Shipping", desc: "RoRo & container options" },
                  ].map(({ icon: Icon, label, desc }) => (
                    <div key={label} className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#0589d9]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-[#0589d9]" />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>{label}</p>
                        <p className="text-gray-400 text-xs">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Need Help */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-[#00275c] to-[#0589d9] rounded-2xl p-5 text-white"
              >
                <h3 className="mb-2 text-sm" style={{ fontWeight: 700 }}>Need Shipping Quote?</h3>
                <p className="text-white/70 text-xs mb-4 leading-relaxed">
                  Get an instant shipping estimate to your port. We ship to 60+ countries worldwide.
                </p>
                <Link to="/contact" className="block">
                  <button className="w-full bg-white hover:bg-gray-50 text-[#00275c] py-2.5 rounded-xl text-sm transition-all" style={{ fontWeight: 700 }}>
                    Get Shipping Quote
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ─── SIMILAR CARS ─── */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900" style={{ fontSize: "1.4rem", fontWeight: 800 }}>Similar Vehicles</h2>
            <Link to="/inventory" className="text-[#0589d9] text-sm flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedCars.map((rc, i) => (
              <motion.div
                key={rc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={rc.image}
                    alt={rc.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#00275c] text-white text-xs px-2 py-1 rounded-lg" style={{ fontWeight: 600 }}>
                    {rc.year}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-gray-800 mb-1" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{rc.name}</h3>
                  <p className="text-[#0589d9] mb-4" style={{ fontSize: "1.2rem", fontWeight: 800 }}>{rc.price}</p>
                  <div className="flex gap-2">
                    <Link to={`/car/${rc.id}`} className="flex-1 block">
                      <button className="w-full bg-[#00275c] hover:bg-[#0589d9] text-white py-2 rounded-xl text-xs transition-all" style={{ fontWeight: 600 }}>
                        View Details
                      </button>
                    </Link>
                    <Link to="/contact" className="block">
                      <button className="px-3 py-2 border border-gray-200 rounded-xl text-xs text-gray-500 hover:border-[#0589d9] hover:text-[#0589d9] transition-all">
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
    </div>
  );
}