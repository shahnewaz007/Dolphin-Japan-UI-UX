import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, ScrollRestoration } from "react-router";
import {
  Phone, Mail, Globe, Facebook, Twitter, Instagram, Linkedin,
  ChevronDown, Menu, X, MapPin, Clock
} from "lucide-react";
import logo from "../../imports/logo.png";

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/inventory", label: "Inventory" },
    { to: "/order-custom", label: "Order Custom Car" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Utility Bar */}
      <div className="bg-[#00275c] text-white py-2.5 relative z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+81312345678" className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors">
              <Phone size={12} />
              <span>+81-3-1234-5678</span>
            </a>
            <a href="mailto:info@dolphinjapan.com" className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white transition-colors">
              <Mail size={12} />
              <span>info@dolphinjapan.com</span>
            </a>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1 text-xs border border-white/25 px-2.5 py-1 rounded cursor-pointer hover:border-white/50 transition-all">
              <Globe size={11} />
              <span>English</span>
              <ChevronDown size={11} />
            </div>
            <div className="flex items-center gap-1 text-xs border border-white/25 px-2.5 py-1 rounded cursor-pointer hover:border-white/50 transition-all">
              <span>USD $</span>
              <ChevronDown size={11} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 transition-all duration-300 bg-white/97 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.09)] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img
              src={logo}
              alt="DOLPHIN JAPAN"
              className="h-12"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm transition-all duration-200 relative group py-1 ${
                    active ? "text-[#0589d9]" : "text-gray-700 hover:text-[#0589d9]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-0.5 bg-[#0589d9] rounded-full transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden lg:block">
              <button className="text-sm px-5 py-2 rounded-lg bg-[#00275c] text-white hover:bg-[#001e52] shadow-sm hover:shadow-md transition-all duration-200" style={{ fontWeight: 600 }}>
                Get a Quote
              </button>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } bg-white border-t border-gray-100 shadow-lg`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  location.pathname === link.to
                    ? "bg-[#0589d9]/10 text-[#0589d9]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="block pt-2">
              <button className="w-full bg-[#00275c] text-white py-2.5 rounded-lg text-sm">
                Get a Quote
              </button>
            </Link>
          </div>
        </div>
      </header>

      <ScrollRestoration />
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#001a3e]">
        {/* Top gradient accent */}
        <div className="h-1 bg-gradient-to-r from-[#0589d9] via-[#06adf5] to-[#0589d9]" />

        <div className="max-w-7xl mx-auto px-4 pt-14 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <img src={logo} alt="DOLPHIN JAPAN" className="h-12 mb-5 brightness-0 invert" />
              <p className="text-sm text-white leading-relaxed mb-6">
                Your trusted partner for Japanese used cars export worldwide. Quality vehicles, competitive prices, reliable shipping to 60+ countries.
              </p>
              <div className="flex gap-2">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 bg-white/8 hover:bg-[#0589d9] rounded-lg flex items-center justify-center transition-all duration-200 text-white/60 hover:text-white"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/70 mb-5">Quick Links</h4>
              <ul className="space-y-2.5">
                {[
                  { to: "/", label: "Home" },
                  { to: "/inventory", label: "Browse Inventory" },
                  { to: "/order-custom", label: "Order Custom Car" },
                  { to: "/contact", label: "Contact Us" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-white hover:text-[#0589d9] flex items-center gap-2 group transition-colors"
                    >
                      <span className="text-[#0589d9] transition-transform group-hover:translate-x-0.5">›</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/70 mb-5">Resources</h4>
              <ul className="space-y-2.5">
                {["How to Buy", "Shipping Info", "Payment Methods", "Terms & Conditions", "Privacy Policy", "FAQ"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-white hover:text-[#0589d9] flex items-center gap-2 group transition-colors"
                      >
                        <span className="text-[#0589d9] transition-transform group-hover:translate-x-0.5">›</span>
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/70 mb-5">Contact Us</h4>
              <div className="space-y-4">
                {[
                  { Icon: MapPin, text: "123 Tokyo Street, Minato-ku\nTokyo 105-0001, Japan" },
                  { Icon: Phone, text: "+81-3-1234-5678" },
                  { Icon: Mail, text: "info@dolphinjapan.com" },
                  { Icon: Clock, text: "Mon–Fri: 9AM–6PM JST" },
                ].map(({ Icon, text }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0589d9]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={14} className="text-[#0589d9]" />
                    </div>
                    <p className="text-sm text-white whitespace-pre-line leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-white/70 text-center md:text-left">© 2026 DOLPHIN JAPAN. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-1.5">
              <span className="text-xs text-white/70">We Accept:</span>
              {["VISA", "Mastercard", "PayPal", "T/T Transfer", "Western Union"].map((m) => (
                <span key={m} className="text-xs bg-white/15 text-white px-2.5 py-1 rounded-md">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}