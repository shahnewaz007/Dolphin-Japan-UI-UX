import { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin,
  ChevronRight, Send, CheckCircle2, MessageSquare, Globe, Shield,
  ArrowRight, HeadphonesIcon, Sparkles
} from "lucide-react";
import { Link } from "react-router";

const PRIMARY = "#00275c";
const SECONDARY = "#0589d9";

export function ContactPage() {
  const [formData, setFormData] = useState({
    carName: "",
    stockId: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: "Our Office",
      primary: "123 Tokyo Street, Minato-ku",
      secondary: "Tokyo 105-0001, Japan",
      action: { label: "Get Directions", href: "#" },
    },
    {
      icon: Phone,
      label: "Phone Support",
      primary: "+81-3-1234-5678",
      secondary: "+81-80-1234-5678 (Mobile)",
      action: { label: "Call Now", href: "tel:+81312345678" },
    },
    {
      icon: Mail,
      label: "Email Us",
      primary: "info@dolphinjapan.com",
      secondary: "sales@dolphinjapan.com",
      action: { label: "Send Email", href: "mailto:info@dolphinjapan.com" },
    },
    {
      icon: Clock,
      label: "Business Hours",
      primary: "Mon – Fri: 9:00 AM – 6:00 PM JST",
      secondary: "Saturday: 9:00 AM – 1:00 PM JST",
      action: null,
    },
  ];

  const HIGHLIGHTS = [
    { icon: Globe, label: "60+ Countries Served" },
    { icon: Shield, label: "Secure & Verified" },
    { icon: HeadphonesIcon, label: "24/7 Customer Care" },
  ];

  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0589d9] focus:ring-2 focus:ring-[#0589d9]/15 bg-white transition-all";
  const labelCls = "block text-xs text-gray-700 mb-1.5";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ═══ HERO ═══ */}
      <section className="relative bg-[#00275c] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 85% 0%, rgba(5,137,217,0.28) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 0% 100%, rgba(0,56,130,0.55) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-14 md:pt-8 md:pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/50 mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">Contact</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#0589d9]/15 border border-[#0589d9]/30 rounded-full px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0589d9] animate-pulse" />
              <span className="text-[#0589d9] text-[10px] tracking-[0.2em] uppercase" style={{ fontWeight: 700 }}>
                We're Here to Help
              </span>
            </div>

            <h1 className="text-white font-display mb-4" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.1rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Let's Talk About
              <span className="block text-[#0589d9]">Your Next Vehicle</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
              Questions about a specific car, shipping to your country, or payment terms? Our multilingual team replies within 24 hours — guaranteed.
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <Icon size={12} className="text-[#0589d9]" />
                  <span className="text-white/80 text-xs" style={{ fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT INFO CARDS (float over hero) ═══ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {contactInfo.map(({ icon: Icon, label, primary, secondary, action }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * idx }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#0589d9]/30 transition-all p-5 flex flex-col"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-[#00275c] to-[#0589d9] shadow-sm group-hover:scale-110 transition-transform">
                <Icon size={18} className="text-white" />
              </div>
              <p className="text-[10px] tracking-[0.18em] uppercase text-gray-400 mb-1" style={{ fontWeight: 700 }}>{label}</p>
              <p className="text-[#00275c] text-sm" style={{ fontWeight: 700 }}>{primary}</p>
              <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{secondary}</p>
              {action && (
                <a
                  href={action.href}
                  className="mt-3 inline-flex items-center gap-1 text-xs text-[#0589d9] hover:text-[#00275c] transition-colors group/link"
                  style={{ fontWeight: 700 }}
                >
                  {action.label}
                  <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* ── FORM ── */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Header bar with gradient */}
              <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)` }}>
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <div className="relative px-6 md:px-8 py-5 flex items-start gap-3">
                  <div className="w-11 h-11 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={20} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-white font-display" style={{ fontWeight: 800, fontSize: "1.15rem" }}>Send Us a Message</h2>
                    <p className="text-white/70 text-xs mt-0.5">Fill out the form and we'll respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-6 md:px-8 py-14 text-center"
                >
                  <div className="relative w-20 h-20 mx-auto mb-5">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
                    <div className="relative w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={40} className="text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <h3 className="text-gray-900 mb-2 font-display" style={{ fontWeight: 800, fontSize: "1.4rem" }}>Message Sent!</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">
                    Thank you, <span className="text-[#00275c]" style={{ fontWeight: 700 }}>{formData.name || "there"}</span>! We've received your inquiry and will reply within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ carName: "", stockId: "", name: "", email: "", phone: "", country: "", message: "" });
                      setSecurityAnswer("");
                    }}
                    className="bg-[#00275c] hover:bg-[#0589d9] text-white px-7 py-3 rounded-xl text-sm transition-all shadow-sm"
                    style={{ fontWeight: 700 }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 md:px-8 py-7 space-y-5">
                  {/* Car Reference */}
                  <div className="bg-[#0589d9]/5 border border-[#0589d9]/20 rounded-xl p-4">
                    <p className="text-[#00275c] text-[10px] tracking-[0.15em] uppercase mb-3" style={{ fontWeight: 700 }}>Car You're Interested In</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls} style={{ fontWeight: 600 }}>Car Name / Model <span className="text-red-500">*</span></label>
                        <input
                          type="text" required className={inputCls}
                          placeholder="e.g. 2021 Toyota Land Cruiser"
                          value={formData.carName}
                          onChange={(e) => setFormData({ ...formData, carName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className={labelCls} style={{ fontWeight: 600 }}>Stock ID <span className="text-gray-400" style={{ fontWeight: 400 }}>(optional)</span></label>
                        <input
                          type="text" className={inputCls}
                          placeholder="e.g. DJ-20241"
                          value={formData.stockId}
                          onChange={(e) => setFormData({ ...formData, stockId: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelCls} style={{ fontWeight: 600 }}>Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text" required className={inputCls} placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelCls} style={{ fontWeight: 600 }}>Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email" required className={inputCls} placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelCls} style={{ fontWeight: 600 }}>Phone Number</label>
                      <input
                        type="tel" className={inputCls} placeholder="+1 234 567 8900"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelCls} style={{ fontWeight: 600 }}>Country</label>
                      <select
                        className={inputCls + " cursor-pointer"} value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      >
                        <option value="">Select your country</option>
                        {["Australia", "United Kingdom", "United States", "Canada", "New Zealand", "UAE", "Russia", "Kenya", "South Africa", "Other"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelCls} style={{ fontWeight: 600 }}>Your Message <span className="text-red-500">*</span></label>
                    <textarea
                      required rows={7} className={inputCls}
                      style={{ resize: "vertical" }}
                      placeholder="Tell us what you're looking for — make, model, budget, shipping destination, or any specific questions."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
                    <div>
                      <label className={labelCls} style={{ fontWeight: 600 }}>Security Check: What is 5 + 3? <span className="text-red-500">*</span></label>
                      <input
                        type="text" required className={inputCls} placeholder="Enter answer"
                        value={securityAnswer}
                        onChange={(e) => setSecurityAnswer(e.target.value)}
                      />
                    </div>
                    <div className="bg-[#0589d9]/5 rounded-xl p-3 text-xs text-gray-600 border border-[#0589d9]/15">
                      <p className="flex items-start gap-2">
                        <Shield size={14} className="text-[#0589d9] mt-0.5 flex-shrink-0" />
                        <span>Your info is encrypted and <span style={{ fontWeight: 700 }}>never shared</span> with third parties.</span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-[0_10px_30px_rgba(5,137,217,0.35)]"
                    style={{
                      fontWeight: 800, fontSize: "0.95rem",
                      background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`
                    }}
                  >
                    <Send size={16} />
                    Send Message
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="lg:col-span-2 space-y-5">
            {/* FAQ preview / quick help */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#0589d9]/10 rounded-lg flex items-center justify-center">
                  <Sparkles size={15} className="text-[#0589d9]" />
                </div>
                <h3 className="text-gray-900 font-display" style={{ fontWeight: 800, fontSize: "1rem" }}>Quick Answers</h3>
              </div>
              <div className="space-y-3">
                {[
                  { q: "How long does shipping take?", a: "Typically 4–6 weeks depending on port." },
                  { q: "Do you offer financing?", a: "Yes — we partner with trusted international lenders." },
                  { q: "Can I inspect before buying?", a: "Absolutely. Full inspection reports included." },
                ].map((item) => (
                  <div key={item.q} className="border-l-2 border-[#0589d9]/40 pl-3">
                    <p className="text-[#00275c] text-sm" style={{ fontWeight: 700 }}>{item.q}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* WhatsApp + Phone split card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <h3 className="text-gray-900 font-display mb-1" style={{ fontWeight: 800, fontSize: "1rem" }}>Prefer to Talk?</h3>
              <p className="text-gray-500 text-xs mb-4">Instant support in English & 日本語</p>

              <a href="https://wa.me/81312345678" target="_blank" rel="noopener noreferrer" className="block mb-2.5">
                <button className="w-full flex items-center gap-3 bg-[#128C4A] hover:bg-[#0e6e3a] text-white py-2.5 px-3 rounded-xl text-sm transition-all text-left shadow-sm">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <MessageSquare size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs" style={{ fontWeight: 700 }}>WhatsApp Chat</div>
                    <div className="text-white/80 text-[11px]">Instant reply · 24/7</div>
                  </div>
                  <ArrowRight size={14} />
                </button>
              </a>

              <a href="tel:+81312345678" className="block">
                <button className="w-full flex items-center gap-3 border border-gray-200 hover:border-[#0589d9] bg-white hover:bg-[#0589d9]/5 py-2.5 px-3 rounded-xl text-sm transition-all text-left">
                  <div className="w-8 h-8 bg-[#0589d9]/10 rounded-lg flex items-center justify-center">
                    <Phone size={14} className="text-[#0589d9]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 text-xs" style={{ fontWeight: 700 }}>Call Us</div>
                    <div className="text-gray-500 text-[11px]">+81-3-1234-5678</div>
                  </div>
                  <ArrowRight size={14} className="text-gray-400" />
                </button>
              </a>
            </motion.div>

            {/* Social media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <h3 className="text-gray-900 font-display mb-1" style={{ fontWeight: 800, fontSize: "1rem" }}>Follow Us</h3>
              <p className="text-gray-500 text-xs mb-4">New arrivals, offers & auction insights</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Twitter, label: "Twitter" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Linkedin, label: "LinkedIn" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    title={label}
                    className="aspect-square flex items-center justify-center rounded-xl border border-gray-200 text-gray-500 hover:text-white hover:bg-[#00275c] hover:border-[#00275c] transition-all group"
                  >
                    <Icon size={16} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Can't find car CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
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
                style={{ background: "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(5,137,217,0.35) 0%, transparent 60%)" }}
              />
              <div className="relative">
                <p className="font-display mb-1" style={{ fontWeight: 800, fontSize: "1rem" }}>Can't find your car?</p>
                <p className="text-white/65 text-xs mb-4 leading-relaxed">
                  Submit a custom order and we'll search Japan's auctions specifically for you.
                </p>
                <Link to="/order-custom" className="block">
                  <button className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#00275c] hover:bg-[#0589d9] hover:text-white py-2.5 rounded-xl text-sm transition-all shadow-sm" style={{ fontWeight: 800 }}>
                    Order Custom Car
                    <ArrowRight size={14} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>

      {/* ═══ MAP STRIP ═══ */}
      <section className="relative bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#0589d9]/10 border border-[#0589d9]/20 rounded-full px-3 py-1 mb-3">
                <MapPin size={11} className="text-[#0589d9]" />
                <span className="text-[#0589d9] text-[10px] tracking-[0.2em] uppercase" style={{ fontWeight: 700 }}>Visit Us</span>
              </div>
              <h2 className="text-gray-900 font-display" style={{ fontWeight: 800, fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)", letterSpacing: "-0.02em" }}>
                Our Tokyo Office
              </h2>
              <p className="text-gray-500 text-sm mt-1.5">123 Tokyo Street, Minato-ku · Tokyo 105-0001, Japan</p>
            </div>
            <a
              href="https://maps.google.com/?q=Minato-ku,Tokyo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#00275c] hover:text-[#0589d9] transition-colors"
              style={{ fontWeight: 700 }}
            >
              Open in Google Maps
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm aspect-[16/7] bg-gray-100">
            <iframe
              title="Dolphin Japan office location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.7632569892456!2d139.74547231525855!3d35.65858038019815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bbd9009ec09%3A0x481a93f0d2a409dd!2sMinato%20City%2C%20Tokyo%2C%20Japan!5e0!3m2!1sen!2sus!4v1640000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
}
