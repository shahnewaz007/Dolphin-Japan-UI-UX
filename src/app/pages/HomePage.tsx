import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  Search, Ship, CreditCard, FileText, ThumbsUp, Star,
  ArrowRight, ChevronRight, Shield, Award, Globe, Headphones,
  CheckCircle2, Heart, Eye
} from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Cinematic hero car — dark, moody, luxury feel
const HERO_BG =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1920";

const SHIPPING_BG =
  "https://images.unsplash.com/photo-1598586707899-d0868f266e74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzaGlwcGluZyUyMGNhcmdvJTIwc2hpcCUyMGxvYWRpbmclMjB2ZWhpY2xlc3xlbnwxfHx8fDE3NzY3OTY3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080";

const featuredCars = [
  {
    id: 1,
    name: "Toyota Hiace Van",
    year: 2015,
    price: "$18,500",
    image: "https://images.unsplash.com/photo-1715351600154-5ac1729494d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    specs: ["AT", "2700cc", "Diesel", "4WD"],
    sold: false,
    badge: "Popular",
  },
  {
    id: 2,
    name: "Nissan Caravan",
    year: 2018,
    price: "$22,800",
    image: "https://images.unsplash.com/photo-1679213035580-a5d3d84eaea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    specs: ["AT", "2000cc", "Petrol", "2WD"],
    sold: false,
    badge: "New Arrival",
  },
  {
    id: 3,
    name: "Daihatsu Hijet Dump",
    year: 2012,
    price: "$12,500",
    image: "https://images.unsplash.com/photo-1693448658669-45ba31317995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    specs: ["MT", "660cc", "Petrol", "4WD"],
    sold: true,
    badge: null,
  },
  {
    id: 4,
    name: "Honda Fit Hybrid",
    year: 2020,
    price: "$16,900",
    image: "https://images.unsplash.com/photo-1628846231746-b4ed87a0abef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxqYXBhbmVzZSUyMHVzZWQlMjBjYXJzfGVufDF8fHx8MTc3Njc5NTQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    specs: ["AT", "1500cc", "Hybrid", "2WD"],
    sold: false,
    badge: "Eco",
  },
];

const steps = [
  { icon: Search, num: "01", title: "Search & Select", desc: "Browse 150,000+ vehicles or submit custom requirements from Japan's top auctions" },
  { icon: FileText, num: "02", title: "Get a Quote", desc: "Receive detailed FOB pricing with full cost breakdown within 24 hours" },
  { icon: CreditCard, num: "03", title: "Secure Payment", desc: "Multiple payment options including T/T bank transfer and PayPal" },
  { icon: Ship, num: "04", title: "We Ship", desc: "RoRo or container shipping to your nearest port worldwide" },
  { icon: ThumbsUp, num: "05", title: "You Receive", desc: "Get your vehicle with full documentation and inspection report" },
];

const whyUs = [
  { icon: Shield, title: "Verified Vehicles", desc: "Every car comes with detailed Japanese auction inspection reports" },
  { icon: Globe, title: "Global Shipping", desc: "We ship to 60+ countries with reliable RoRo and container options" },
  { icon: Award, title: "20+ Years Experience", desc: "Trusted by thousands of customers across the globe" },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated support team to guide you through every step" },
];

const testimonials = [
  {
    name: "James K.",
    country: "Australia",
    flag: "🇦🇺",
    rating: 5,
    text: "Excellent service from start to finish. The Toyota Land Cruiser I ordered arrived in perfect condition and all documentation was handled professionally.",
  },
  {
    name: "Ahmed Al-Rashid",
    country: "UAE",
    flag: "🇦🇪",
    rating: 5,
    text: "My 3rd purchase from Dolphin Japan. Consistently reliable, transparent pricing, and the shipping was faster than expected!",
  },
  {
    name: "Ivan Petrov",
    country: "Russia",
    flag: "🇷🇺",
    rating: 5,
    text: "Great selection of commercial vehicles. The Hiace van was exactly as described in the auction report. Will definitely order again.",
  },
];

function AnimatedCounter({ value, suffix, prefix = "" }: { value: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let start = 0;
          const duration = 1800;
          const steps = 60;
          const increment = value / steps;
          const interval = duration / steps;
          const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, interval);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, started]);

  return (
    <div ref={ref} className="font-display" style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "#00275c", letterSpacing: "-0.03em" }}>
      {prefix}{count >= 1000 ? count.toLocaleString() : count}{suffix}
    </div>
  );
}

export function HomePage() {
  const [searchData, setSearchData] = useState({
    make: "",
    bodyType: "",
    yearRange: "",
    priceRange: "",
  });
  const [wishlist, setWishlist] = useState<number[]>([]);

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section
        className="relative bg-[#00275c] overflow-hidden flex items-center"
        style={{ minHeight: "calc(100dvh - 97px)" }}
      >
        {/* Cinematic background image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          {/* Primary dark wash keeps text legible & matches brand */}
          <div className="absolute inset-0 bg-[#00275c]/88" />
          {/* Radial color glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 80% 25%, rgba(0,147,208,0.28) 0%, transparent 60%), radial-gradient(ellipse 55% 70% at 5% 95%, rgba(0,56,130,0.55) 0%, transparent 60%)",
            }}
          />
          {/* Subtle dot grid texture */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Bottom vignette for readability at edges */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#00275c] via-[#00275c]/60 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#00275c]/60 to-transparent" />
        </div>

        {/* Editorial corner marks */}
        <div className="absolute top-6 left-6 items-center gap-3 hidden md:flex z-10">
          <span className="h-px w-8 bg-[#0589d9]/60" />
          <span className="text-[10px] text-white/40 tracking-[0.4em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            Since 2004
          </span>
        </div>
        <div className="absolute top-6 right-6 text-[10px] text-white/40 tracking-[0.4em] uppercase hidden md:block z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
          Tokyo · Yokohama · Osaka
        </div>

        {/* Main content — centered, compact */}
        <div className="relative w-full z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center py-10 sm:py-12 lg:py-16">

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 bg-[#0589d9]/12 border border-[#0589d9]/35 rounded-full px-4 py-1.5 mb-5"
            >
              <span className="w-1.5 h-1.5 bg-[#0589d9] rounded-full animate-pulse" />
              <span className="text-[#0589d9] text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.25em] uppercase" style={{ fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
                Premium Japanese Auto Export
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white mb-3 md:mb-4 font-display"
              style={{
                fontSize: "clamp(1.85rem, 4.5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.035em",
              }}
            >
              Drive the Best of{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#0589d9]">Japan</span>
                <span className="absolute left-0 right-0 -bottom-0.5 h-1 bg-[#0589d9]/60 rounded-full z-0" />
              </span>
              <br />
              Delivered Worldwide
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-white/70 text-sm md:text-base leading-relaxed mb-5 md:mb-7 max-w-xl mx-auto"
            >
              Access 150,000+ verified vehicles from Japan's top auctions. Transparent FOB pricing, full inspection reports, reliable shipping to 60+ countries.
            </motion.p>

            {/* Integrated Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden max-w-4xl mx-auto"
              style={{ boxShadow: "0 30px 70px rgba(0,10,40,0.55), 0 0 0 1px rgba(255,255,255,0.08)" }}
            >
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                  {[
                    { label: "Make", key: "make", options: ["All Makes", "Toyota", "Honda", "Nissan", "Mazda", "Suzuki", "Mitsubishi", "Subaru"] },
                    { label: "Body Type", key: "bodyType", options: ["All Types", "Sedan", "SUV", "Van", "Truck", "Wagon", "Hatchback"] },
                    { label: "Year", key: "yearRange", options: ["Any Year", "2020-2024", "2015-2019", "2010-2014", "2005-2009"] },
                    { label: "Price (USD)", key: "priceRange", options: ["Any Price", "Under $5,000", "$5,000–$10,000", "$10,000–$20,000", "$20,000+"] },
                  ].map(({ label, key, options }) => (
                    <div key={key} className="text-left">
                      <label className="block text-[9px] text-gray-500 mb-1 ml-1 tracking-widest uppercase" style={{ fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>
                        {label}
                      </label>
                      <select
                        className="w-full border border-gray-200 rounded-lg px-2.5 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-[#0589d9] focus:ring-2 focus:ring-[#0589d9]/15 transition-all bg-white hover:border-gray-300"
                        value={(searchData as any)[key]}
                        onChange={(e) => setSearchData({ ...searchData, [key]: e.target.value })}
                      >
                        {options.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <Link to="/inventory" className="block col-span-1 sm:col-span-2 lg:col-span-1">
                    <label className="hidden lg:block text-[9px] text-transparent mb-1 tracking-widest uppercase select-none" style={{ fontWeight: 700 }}>
                      Search
                    </label>
                    <button className="w-full h-[42px] bg-[#00275c] hover:bg-[#0589d9] text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm" style={{ fontWeight: 700 }}>
                      <Search size={15} />
                      Search
                    </button>
                  </Link>
                </div>
              </div>
              {/* Quick filter row */}
              <div className="border-t border-gray-100 px-4 py-2 flex flex-wrap items-center gap-x-3 gap-y-1 justify-center bg-gray-50/60">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest" style={{ fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>Popular:</span>
                {["Toyota Hiace", "Nissan Caravan", "Honda Fit", "Mazda CX-5", "Subaru Forester"].map((tag) => (
                  <Link key={tag} to="/inventory" className="text-xs text-gray-600 hover:text-[#0589d9] transition-colors" style={{ fontWeight: 500 }}>
                    {tag}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap justify-center gap-3 mt-5 md:mt-6"
            >
              <Link to="/inventory">
                <button
                  className="group flex items-center gap-2 bg-[#0589d9] hover:bg-[#06adf5] text-white px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,147,208,0.5)]"
                  style={{ fontWeight: 700, fontSize: "0.875rem" }}
                >
                  Explore Full Inventory
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/order-custom">
                <button
                  className="flex items-center gap-2 text-white border border-white/25 hover:border-white/60 hover:bg-white/5 px-6 py-2.5 rounded-full transition-all duration-300"
                  style={{ fontWeight: 600, fontSize: "0.875rem" }}
                >
                  Custom Order
                </button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] text-white/40 tracking-[0.3em] uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>Scroll</span>
          <div className="w-px h-6 bg-gradient-to-b from-[#0589d9]/60 to-transparent" />
        </motion.div>
      </section>

      {/* ─── TRUST STRIP (below hero, appears on scroll) ─── */}
      <section className="bg-[#00275c] border-t border-white/8 relative z-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 items-center">
            {[
              { icon: Shield, title: "150K+ Vehicles", sub: "Auction Verified" },
              { icon: Globe, title: "60+ Countries", sub: "Worldwide Shipping" },
              { icon: Award, title: "20+ Years", sub: "Trusted Exporter" },
              { icon: Headphones, title: "24/7 Support", sub: "English · 日本語" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="w-10 h-10 rounded-xl bg-[#0589d9]/15 border border-[#0589d9]/25 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#0589d9]" />
                </div>
                <div>
                  <div className="text-white text-sm" style={{ fontWeight: 700 }}>{title}</div>
                  <div className="text-white/50 text-[11px]">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="relative bg-white py-14 border-b border-gray-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0589d9]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 150000, suffix: "+", label: "Vehicles Available" },
              { value: 60, suffix: "+", label: "Countries Served" },
              { value: 20, suffix: "+", label: "Years of Experience" },
              { value: 98, suffix: "%", label: "Customer Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-gray-500 text-sm mt-1 tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-12 md:py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <div className="inline-block bg-[#0589d9]/10 text-[#0589d9] text-xs px-3 py-1.5 rounded-full mb-3" style={{ fontWeight: 600 }}>
              SIMPLE PROCESS
            </div>
            <h2 className="text-gray-900 mb-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800 }}>
              5 Steps to Your Dream Car
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From search to delivery, our streamlined process makes importing your ideal Japanese vehicle simple and stress-free.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 relative">
            {/* Connector line (md and up) */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-[#0589d9]/20 via-[#0589d9] to-[#0589d9]/20 z-0" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="relative mb-5">
                  {/* Outer ring */}
                  <div className="w-20 h-20 rounded-full bg-white shadow-lg border-2 border-[#0589d9]/20 group-hover:border-[#0589d9] transition-all duration-300 flex items-center justify-center group-hover:shadow-[0_0_0_6px_rgba(0,147,208,0.1)]">
                    <step.icon size={28} className="text-[#0589d9]" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#00275c] text-white rounded-full flex items-center justify-center text-[10px]" style={{ fontWeight: 700 }}>
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-gray-800 mb-2" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[160px] sm:max-w-none">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED CARS ─── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8 md:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-orange-100 text-orange-600 text-xs px-3 py-1.5 rounded-full mb-2" style={{ fontWeight: 600 }}>
                FEATURED LISTINGS
              </div>
              <h2 className="text-gray-900" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800 }}>
                Popular Vehicles
              </h2>
            </motion.div>
            <Link to="/inventory" className="flex items-center gap-1 text-[#0589d9] hover:gap-2 transition-all text-sm" style={{ fontWeight: 500 }}>
              View All Inventory <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car, i) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={car.image}
                    alt={car.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Year badge */}
                  <div className="absolute top-3 left-3 bg-[#00275c] text-white text-xs px-2.5 py-1 rounded-lg" style={{ fontWeight: 600 }}>
                    {car.year}
                  </div>

                  {/* Type badge */}
                  {car.badge && !car.sold && (
                    <div className={`absolute top-3 right-3 text-white text-xs px-2.5 py-1 rounded-lg ${
                      car.badge === "Popular" ? "bg-orange-500" :
                      car.badge === "New Arrival" ? "bg-green-500" :
                      car.badge === "Eco" ? "bg-emerald-500" : "bg-[#0589d9]"
                    }`} style={{ fontWeight: 600 }}>
                      {car.badge}
                    </div>
                  )}

                  {/* Sold overlay */}
                  {car.sold && (
                    <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 flex items-center justify-center">
                      <div
                        className="bg-red-600 text-white px-10 py-2.5 shadow-xl"
                        style={{ transform: "rotate(-15deg)", fontWeight: 800, fontSize: "1.3rem", letterSpacing: "0.1em" }}
                      >
                        SOLD
                      </div>
                    </div>
                  )}

                  {/* Wishlist */}
                  <button
                    onClick={() => setWishlist(w => w.includes(car.id) ? w.filter(id => id !== car.id) : [...w, car.id])}
                    className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <Heart
                      size={15}
                      className={wishlist.includes(car.id) ? "text-red-500 fill-red-500" : "text-gray-400"}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="text-gray-800 mb-2.5 truncate" style={{ fontWeight: 600, fontSize: "0.95rem" }}>{car.name}</h3>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {car.specs.map((spec) => (
                      <span key={spec} className="bg-orange-50 text-orange-600 border border-orange-100 text-xs px-2 py-0.5 rounded-md" style={{ fontWeight: 500 }}>
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[#0589d9]" style={{ fontSize: "1.35rem", fontWeight: 800 }}>{car.price}</p>
                      <p className="text-gray-400 text-xs">FOB Japan</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/car/${car.id}`} className="flex-1">
                      <button className="w-full flex items-center justify-center gap-1.5 bg-[#00275c] hover:bg-[#0589d9] text-white py-2.5 rounded-xl text-sm transition-all duration-200" style={{ fontWeight: 500 }}>
                        <Eye size={15} />
                        View Details
                      </button>
                    </Link>
                    <Link to="/contact">
                      <button className="px-3 py-2.5 border border-gray-200 rounded-xl text-xs text-gray-600 hover:border-[#0589d9] hover:text-[#0589d9] transition-colors">
                        Inquire
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-[#00275c]/8 text-[#00275c] text-xs px-3 py-1.5 rounded-full mb-3" style={{ fontWeight: 600, letterSpacing: "0.15em" }}>
              WHY DOLPHIN JAPAN
            </div>
            <h2 className="text-gray-900" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800 }}>
              Your Trusted Export Partner
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#0589d9]/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#0589d9]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0589d9] transition-colors duration-300">
                  <item.icon size={22} className="text-[#0589d9] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-gray-800 mb-2" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-block bg-yellow-50 text-yellow-600 text-xs px-3 py-1.5 rounded-full mb-3" style={{ fontWeight: 600 }}>
              TESTIMONIALS
            </div>
            <h2 className="text-gray-900" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800 }}>
              What Our Customers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={15} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00275c] flex items-center justify-center text-white" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.flag} {t.country}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          backgroundImage: `url('${SHIPPING_BG}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#00275c]/98 via-[#00275c]/90 to-[#0589d9]/60" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0589d9]/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <CheckCircle2 size={14} className="text-[#0589d9]" />
              <span className="text-white/80 text-sm">No Hidden Fees · Transparent Pricing</span>
            </div>

            <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 800 }}>
              Ready to Import Your Dream Car?
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto">
              Browse our inventory of 150,000+ Japanese used vehicles or let us find the perfect car for you.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link to="/inventory" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-[#00275c] hover:bg-[#0589d9] hover:text-white px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,147,208,0.4)] hover:-translate-y-0.5" style={{ fontWeight: 700 }}>
                  Browse Inventory <ArrowRight size={18} />
                </button>
              </Link>
              <Link to="/order-custom" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border-2 border-white/40 hover:border-white text-white px-8 py-3.5 rounded-xl transition-all duration-300 hover:bg-white/10" style={{ fontWeight: 600 }}>
                  Order Custom Car <ChevronRight size={18} />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}