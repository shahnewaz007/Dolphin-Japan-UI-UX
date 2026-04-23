import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Car, Search, CheckCircle2, DollarSign, Ship, ChevronRight,
  ArrowRight, ArrowLeft, Phone, MessageSquare, Info, User,
  Settings2, Sparkles, Shield, Clock, Globe
} from "lucide-react";
import { Link } from "react-router";

type FormData = {
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
};

const STEP_META = [
  { num: 1, title: "Contact Info", subtitle: "Who we'll contact", icon: User },
  { num: 2, title: "Vehicle", subtitle: "What you're looking for", icon: Car },
  { num: 3, title: "Specs & Features", subtitle: "Fine-tune your request", icon: Settings2 },
] as const;

const PROCESS_STEPS = [
  { icon: Search, title: "We Search", desc: "Japan's top auto auctions" },
  { icon: Car, title: "Send Options", desc: "Photos & detailed specs" },
  { icon: DollarSign, title: "Transparent Quote", desc: "Full cost breakdown" },
  { icon: Ship, title: "We Ship", desc: "Worldwide to your port" },
];

const TRUST_BADGES = [
  { icon: Shield, label: "Auction Verified" },
  { icon: Clock, label: "24–48h Response" },
  { icon: Globe, label: "60+ Countries" },
];

const featureOptions = [
  "Air Conditioning", "Power Steering", "Power Windows", "Sunroof",
  "Leather Seats", "Navigation", "Backup Camera", "ABS",
  "Airbags", "Alloy Wheels", "Cruise Control", "Keyless Entry",
];

const COUNTRIES = ["Australia", "United Kingdom", "United States", "New Zealand", "Canada", "Russia", "UAE", "Kenya", "South Africa", "Tanzania", "Other"];
const MAKES = ["Toyota", "Honda", "Nissan", "Mazda", "Suzuki", "Mitsubishi", "Subaru", "Daihatsu", "Lexus", "Other"];

export function OrderCustomPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", country: "",
    make: "", model: "", yearFrom: "", yearTo: "",
    budgetMin: "", budgetMax: "", bodyType: "", transmission: "",
    fuelType: "", driveType: "", mileageMax: "", color: "",
    features: [], additionalRequirements: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = STEP_META.length;
  const progressPct = (currentStep / totalSteps) * 100;

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const isStepValid = () => {
    if (currentStep === 1) return formData.name && formData.email && formData.phone && formData.country;
    if (currentStep === 2) return formData.make && formData.budgetMax;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0589d9] focus:ring-2 focus:ring-[#0589d9]/15 bg-white transition-all";
  const selectCls = inputCls + " cursor-pointer";
  const labelCls = "block text-xs text-gray-700 mb-1.5 tracking-wide";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── HERO HEADER ─── */}
      <section className="relative bg-[#00275c] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 85% 0%, rgba(0,147,208,0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 0% 100%, rgba(0,56,130,0.55) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-12 md:pt-8 md:pb-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/50 mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">Order Custom Car</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#0589d9]/15 border border-[#0589d9]/30 rounded-full px-3 py-1 mb-4">
              <Sparkles size={11} className="text-[#0589d9]" />
              <span className="text-[#0589d9] text-[10px] tracking-[0.2em] uppercase" style={{ fontWeight: 700 }}>
                Custom Sourcing Service
              </span>
            </div>

            <h1 className="text-white font-display mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Order Your Custom Car
              <span className="block text-[#0589d9]">Direct from Japan</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
              Tell us exactly what you want. Our team will bid on Japan's auctions, send curated options, and ship worldwide — transparent pricing, zero hidden fees.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mt-6">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <Icon size={12} className="text-[#0589d9]" />
                  <span className="text-white/80 text-xs" style={{ fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 -mt-6 relative z-10">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 size={42} className="text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h2 className="text-gray-900 mb-3 font-display" style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
              Request Submitted!
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-[#00275c]" style={{ fontWeight: 700 }}>{formData.name || "there"}</span>! Our team is already searching Japan's auctions for vehicles matching your requirements. You'll hear from us within <span style={{ fontWeight: 700 }}>24–48 hours</span>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-8">
              {PROCESS_STEPS.slice(0, 3).map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                  <div className="w-10 h-10 bg-[#0589d9]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon size={18} className="text-[#0589d9]" />
                  </div>
                  <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{title}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    name: "", email: "", phone: "", country: "",
                    make: "", model: "", yearFrom: "", yearTo: "",
                    budgetMin: "", budgetMax: "", bodyType: "", transmission: "",
                    fuelType: "", driveType: "", mileageMax: "", color: "",
                    features: [], additionalRequirements: "",
                  });
                }}
                className="bg-[#00275c] hover:bg-[#0589d9] text-white px-7 py-3 rounded-xl text-sm transition-all shadow-sm"
                style={{ fontWeight: 700 }}
              >
                Submit Another Request
              </button>
              <Link to="/inventory">
                <button className="w-full sm:w-auto border border-gray-200 text-gray-700 hover:border-[#0589d9] hover:text-[#0589d9] px-7 py-3 rounded-xl text-sm transition-all" style={{ fontWeight: 600 }}>
                  Browse Inventory
                </button>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* ═══ FORM COLUMN ═══ */}
            <div className="lg:col-span-2">
              {/* Stepper */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6 mb-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest" style={{ fontWeight: 700 }}>Step</span>
                    <span className="font-display text-[#00275c]" style={{ fontWeight: 800, fontSize: "1rem" }}>
                      {currentStep} <span className="text-gray-300">/ {totalSteps}</span>
                    </span>
                  </div>
                  <span className="text-[#0589d9] text-sm" style={{ fontWeight: 700 }}>
                    {STEP_META[currentStep - 1].title}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#00275c] to-[#0589d9] rounded-full"
                    initial={false}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                {/* Step chips */}
                <div className="grid grid-cols-3 gap-2">
                  {STEP_META.map((step) => {
                    const isActive = step.num === currentStep;
                    const isDone = step.num < currentStep;
                    return (
                      <button
                        key={step.num}
                        type="button"
                        onClick={() => step.num < currentStep && setCurrentStep(step.num)}
                        disabled={step.num > currentStep}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all text-left ${
                          isActive
                            ? "bg-[#00275c] border-[#00275c] text-white shadow-sm"
                            : isDone
                            ? "bg-[#0589d9]/8 border-[#0589d9]/30 text-[#00275c] hover:bg-[#0589d9]/12 cursor-pointer"
                            : "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isActive ? "bg-white/15" : isDone ? "bg-[#0589d9] text-white" : "bg-white border border-gray-200"
                        }`}>
                          {isDone ? <CheckCircle2 size={14} /> : <step.icon size={13} />}
                        </div>
                        <div className="min-w-0 hidden sm:block">
                          <div className="text-xs" style={{ fontWeight: 700 }}>{step.title}</div>
                          <div className="text-[10px] opacity-70 truncate">{step.subtitle}</div>
                        </div>
                        <div className="sm:hidden text-xs" style={{ fontWeight: 700 }}>{step.title}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form card */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-5"
                  >
                    {/* Section header */}
                    <div className="flex items-start gap-4 mb-6 pb-5 border-b border-gray-100">
                      <div className="w-11 h-11 bg-gradient-to-br from-[#00275c] to-[#0589d9] rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        {(() => {
                          const Icon = STEP_META[currentStep - 1].icon;
                          return <Icon size={20} className="text-white" />;
                        })()}
                      </div>
                      <div>
                        <h2 className="text-gray-900 font-display" style={{ fontWeight: 800, fontSize: "1.15rem" }}>
                          {STEP_META[currentStep - 1].title}
                        </h2>
                        <p className="text-gray-500 text-sm mt-0.5">{STEP_META[currentStep - 1].subtitle}</p>
                      </div>
                    </div>

                    {/* Step 1: Contact Info */}
                    {currentStep === 1 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className={labelCls} style={{ fontWeight: 600 }}>Full Name <span className="text-red-500">*</span></label>
                          <input type="text" required className={inputCls} placeholder="John Doe"
                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div>
                          <label className={labelCls} style={{ fontWeight: 600 }}>Email Address <span className="text-red-500">*</span></label>
                          <input type="email" required className={inputCls} placeholder="john@example.com"
                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div>
                          <label className={labelCls} style={{ fontWeight: 600 }}>Phone Number <span className="text-red-500">*</span></label>
                          <input type="tel" required className={inputCls} placeholder="+1 234 567 8900"
                            value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                        <div>
                          <label className={labelCls} style={{ fontWeight: 600 }}>Country <span className="text-red-500">*</span></label>
                          <select required className={selectCls} value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
                            <option value="">Select your country</option>
                            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Vehicle Preferences */}
                    {currentStep === 2 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className={labelCls} style={{ fontWeight: 600 }}>Make <span className="text-red-500">*</span></label>
                            <select required className={selectCls} value={formData.make}
                              onChange={(e) => setFormData({ ...formData, make: e.target.value })}>
                              <option value="">Select Make</option>
                              {MAKES.map((m) => <option key={m}>{m}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className={labelCls} style={{ fontWeight: 600 }}>Model</label>
                            <input type="text" className={inputCls} placeholder="e.g. Land Cruiser, Civic"
                              value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} />
                          </div>
                        </div>

                        {/* Year range */}
                        <div>
                          <label className={labelCls} style={{ fontWeight: 600 }}>Year Range</label>
                          <div className="grid grid-cols-2 gap-3">
                            <input type="number" className={inputCls} placeholder="From (e.g. 2015)"
                              value={formData.yearFrom} onChange={(e) => setFormData({ ...formData, yearFrom: e.target.value })} />
                            <input type="number" className={inputCls} placeholder="To (e.g. 2024)"
                              value={formData.yearTo} onChange={(e) => setFormData({ ...formData, yearTo: e.target.value })} />
                          </div>
                        </div>

                        {/* Budget */}
                        <div>
                          <label className={labelCls} style={{ fontWeight: 600 }}>Budget (USD) <span className="text-red-500">*</span></label>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                              <input type="number" className={inputCls + " pl-7"} placeholder="Min (e.g. 10,000)"
                                value={formData.budgetMin} onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })} />
                            </div>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                              <input type="number" required className={inputCls + " pl-7"} placeholder="Max (e.g. 30,000)"
                                value={formData.budgetMax} onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })} />
                            </div>
                          </div>
                        </div>

                        {/* Body type chips */}
                        <div>
                          <label className={labelCls} style={{ fontWeight: 600 }}>Body Type</label>
                          <div className="flex flex-wrap gap-2">
                            {["Any", "Sedan", "SUV", "Van", "Truck", "Wagon", "Coupe", "Hatchback"].map((t) => {
                              const val = t === "Any" ? "" : t;
                              const selected = formData.bodyType === val;
                              return (
                                <button
                                  key={t}
                                  type="button"
                                  onClick={() => setFormData({ ...formData, bodyType: val })}
                                  className={`px-3.5 py-1.5 text-xs rounded-full border transition-all ${
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
                        </div>
                      </div>
                    )}

                    {/* Step 3: Specs + Features */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        {/* Segmented controls */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className={labelCls} style={{ fontWeight: 600 }}>Transmission</label>
                            <div className="flex gap-2">
                              {[{ v: "", l: "Any" }, { v: "AT", l: "Automatic" }, { v: "MT", l: "Manual" }].map(({ v, l }) => (
                                <button key={l} type="button"
                                  onClick={() => setFormData({ ...formData, transmission: v })}
                                  className={`flex-1 py-2 text-xs rounded-lg border transition-all ${
                                    formData.transmission === v
                                      ? "bg-[#00275c] text-white border-[#00275c]"
                                      : "bg-white text-gray-600 border-gray-200 hover:border-[#0589d9] hover:text-[#0589d9]"
                                  }`}
                                  style={{ fontWeight: 600 }}
                                >{l}</button>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className={labelCls} style={{ fontWeight: 600 }}>Drive Type</label>
                            <div className="flex gap-2">
                              {[{ v: "", l: "Any" }, { v: "2WD", l: "2WD" }, { v: "4WD", l: "4WD" }, { v: "AWD", l: "AWD" }].map(({ v, l }) => (
                                <button key={l} type="button"
                                  onClick={() => setFormData({ ...formData, driveType: v })}
                                  className={`flex-1 py-2 text-xs rounded-lg border transition-all ${
                                    formData.driveType === v
                                      ? "bg-[#00275c] text-white border-[#00275c]"
                                      : "bg-white text-gray-600 border-gray-200 hover:border-[#0589d9] hover:text-[#0589d9]"
                                  }`}
                                  style={{ fontWeight: 600 }}
                                >{l}</button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                          <div>
                            <label className={labelCls} style={{ fontWeight: 600 }}>Fuel Type</label>
                            <select className={selectCls} value={formData.fuelType}
                              onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}>
                              {["Any", "Petrol", "Diesel", "Hybrid", "Electric"].map((o) => <option key={o}>{o}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className={labelCls} style={{ fontWeight: 600 }}>Max Mileage (km)</label>
                            <input type="number" className={inputCls} placeholder="e.g. 100,000"
                              value={formData.mileageMax}
                              onChange={(e) => setFormData({ ...formData, mileageMax: e.target.value })} />
                          </div>
                          <div>
                            <label className={labelCls} style={{ fontWeight: 600 }}>Preferred Color</label>
                            <input type="text" className={inputCls} placeholder="e.g. White, Black"
                              value={formData.color}
                              onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className={labelCls + " mb-0"} style={{ fontWeight: 600 }}>Desired Features</label>
                            {formData.features.length > 0 && (
                              <span className="text-xs text-[#0589d9]" style={{ fontWeight: 700 }}>
                                {formData.features.length} selected
                              </span>
                            )}
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {featureOptions.map((feature) => {
                              const checked = formData.features.includes(feature);
                              return (
                                <button
                                  key={feature}
                                  type="button"
                                  onClick={() => toggleFeature(feature)}
                                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm transition-all text-left ${
                                    checked
                                      ? "bg-[#0589d9]/10 border-[#0589d9] text-[#00275c]"
                                      : "bg-white border-gray-200 text-gray-600 hover:border-[#0589d9]/50"
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                    checked ? "bg-[#0589d9] border-[#0589d9]" : "border-gray-300"
                                  }`}>
                                    {checked && <CheckCircle2 size={10} className="text-white" strokeWidth={3} />}
                                  </div>
                                  <span style={{ fontSize: "0.8rem", fontWeight: checked ? 700 : 500 }}>{feature}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Additional requirements */}
                        <div>
                          <label className={labelCls} style={{ fontWeight: 600 }}>Additional Requirements</label>
                          <textarea
                            rows={4}
                            className={inputCls}
                            style={{ resize: "vertical" }}
                            placeholder="Any special requests, condition preferences, or questions..."
                            value={formData.additionalRequirements}
                            onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex flex-col-reverse sm:flex-row gap-3">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(s => s - 1)}
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 bg-white text-gray-700 rounded-xl text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
                      style={{ fontWeight: 600 }}
                    >
                      <ArrowLeft size={15} /> Previous
                    </button>
                  )}
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={() => isStepValid() && setCurrentStep(s => s + 1)}
                      disabled={!isStepValid()}
                      className="flex-1 bg-[#00275c] hover:bg-[#0589d9] text-white py-3 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#00275c] disabled:hover:shadow-sm"
                      style={{ fontWeight: 700 }}
                    >
                      Continue to {STEP_META[currentStep]?.title}
                      <ArrowRight size={15} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-[#00275c] to-[#0589d9] hover:shadow-[0_10px_30px_rgba(0,147,208,0.35)] text-white py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                      style={{ fontWeight: 800 }}
                    >
                      <Sparkles size={15} />
                      Submit Custom Order Request
                      <ArrowRight size={15} />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* ═══ SIDEBAR ═══ */}
            <aside className="space-y-5 lg:sticky lg:top-24 h-fit">
              {/* What happens next */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-[#0589d9]/10 rounded-lg flex items-center justify-center">
                    <Info size={15} className="text-[#0589d9]" />
                  </div>
                  <h3 className="text-gray-900 font-display" style={{ fontWeight: 800, fontSize: "1rem" }}>What Happens Next?</h3>
                </div>
                <div className="relative">
                  {/* Vertical connector */}
                  <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[#0589d9]/40 via-[#0589d9]/20 to-transparent" />
                  <div className="space-y-4">
                    {PROCESS_STEPS.map(({ icon: Icon, title, desc }, i) => (
                      <div key={title} className="relative flex items-start gap-3">
                        <div className="relative z-10 w-8 h-8 bg-white border-2 border-[#0589d9]/30 rounded-full flex items-center justify-center flex-shrink-0 text-[#0589d9]" style={{ fontWeight: 800, fontSize: "0.7rem" }}>
                          <Icon size={13} />
                        </div>
                        <div className="pt-0.5">
                          <p className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>{i + 1}. {title}</p>
                          <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-2.5">
                  <Clock size={14} className="text-green-600 flex-shrink-0" />
                  <p className="text-green-700 text-xs leading-snug">
                    Average response: <span style={{ fontWeight: 800 }}>24–48 hours</span>
                  </p>
                </div>
              </motion.div>

              {/* Already found a car CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative bg-[#00275c] rounded-2xl p-6 text-white overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(0,147,208,0.35) 0%, transparent 60%)",
                  }}
                />
                <div className="relative">
                  <p className="font-display mb-1" style={{ fontWeight: 800, fontSize: "1rem" }}>Already know what you want?</p>
                  <p className="text-white/65 text-xs mb-4 leading-relaxed">Skip the form — browse our in-stock inventory of 150,000+ verified vehicles.</p>
                  <Link to="/inventory" className="block">
                    <button className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#00275c] hover:bg-[#0589d9] hover:text-white py-2.5 rounded-xl text-sm transition-all shadow-sm" style={{ fontWeight: 800 }}>
                      Browse Inventory
                      <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </motion.div>

              {/* Need help */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <h3 className="text-gray-900 font-display mb-1" style={{ fontWeight: 800, fontSize: "1rem" }}>Need Immediate Help?</h3>
                <p className="text-gray-500 text-xs mb-4">Our team is available in English & 日本語</p>
                <div className="space-y-2.5">
                  <a href="tel:+81312345678" className="block">
                    <button className="w-full flex items-center gap-3 border border-gray-200 hover:border-[#0589d9] bg-white hover:bg-[#0589d9]/5 py-2.5 px-3 rounded-xl text-sm transition-all text-left">
                      <div className="w-8 h-8 bg-[#0589d9]/10 rounded-lg flex items-center justify-center">
                        <Phone size={14} className="text-[#0589d9]" />
                      </div>
                      <div>
                        <div className="text-gray-800 text-xs" style={{ fontWeight: 700 }}>Call Us</div>
                        <div className="text-gray-500 text-[11px]">+81-3-1234-5678</div>
                      </div>
                    </button>
                  </a>
                  <a href="https://wa.me/81312345678" target="_blank" rel="noopener noreferrer" className="block">
                    <button className="w-full flex items-center gap-3 bg-[#128C4A] hover:bg-[#0e6e3a] text-white py-2.5 px-3 rounded-xl text-sm transition-all text-left shadow-sm">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <MessageSquare size={14} className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs" style={{ fontWeight: 700 }}>WhatsApp Chat</div>
                        <div className="text-white/80 text-[11px]">Instant reply · 24/7</div>
                      </div>
                    </button>
                  </a>
                </div>
              </motion.div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
