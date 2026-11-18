
import React, { useState } from "react";
import {
  Leaf,
  Menu,
  Search,
  ShoppingBasket,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sprout,
  Globe
} from "lucide-react";

export default function App() {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);

  const hindi = language === "HI";

  return (
    <div className="app">
      <div className="topbar">
        <span>🌿 {hindi ? "100+ कच्ची जड़ी-बूटियां" : "100+ Raw Herbal Materials"}</span>
        <span>📍 {hindi ? "पूरे भारत में सप्लाई" : "Pan India Supply"}</span>
      </div>

      <header className="navbar">
        <a className="brand" href="#">
          <span className="brand-icon"><Leaf size={27} /></span>
          <span>HINDUSTAN <b>HERBS</b>
            <small>PURE NATURE · TRUSTED QUALITY</small>
          </span>
        </a>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu />
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home">{hindi ? "होम" : "Home"}</a>
          <a href="#about">{hindi ? "हमारे बारे में" : "About Us"}</a>
          <a href="#products">{hindi ? "उत्पाद" : "Products"}</a>
          <a href="#contact">{hindi ? "संपर्क" : "Contact"}</a>
        </nav>

        <div className="nav-actions">
          <button className="language" onClick={() => setLanguage(hindi ? "EN" : "HI")}>
            <Globe size={16} /> {hindi ? "EN" : "हिंदी"}
          </button>
          <a className="login-btn" href="#login">
            {hindi ? "लॉगिन" : "Login"}
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              <Sprout size={16} /> NATURAL · PURE · TRUSTED
            </span>
            <h1>
              {hindi
                ? "प्रकृति की शुद्धता, आपके व्यवसाय के लिए"
                : "Nature's Purity, Your Business Partner"}
            </h1>
            <p>
              {hindi
                ? "भारत भर में उच्च गुणवत्ता वाली कच्ची हर्बल सामग्री की थोक सप्लाई।"
                : "Your trusted source for premium quality raw herbs and botanical materials across India."}
            </p>
            <a className="primary-btn" href="#contact">
              {hindi ? "अपनी जरूरत बताएं" : "Submit Your Requirement"}
              <ArrowRight size={18} />
            </a>
            <div className="hero-stats">
              <div><b>100+</b><span>Herbal Materials</span></div>
              <div><b>Pan India</b><span>Supply Network</span></div>
              <div><b>Since 2021</b><span>Hindustan Herbs</span></div>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-label">
              <Leaf size={20} />
              <span>Rooted in Nature<br /><b>Trusted in Quality</b></span>
            </div>
          </div>
        </section>

        <section className="features">
          <div><ShieldCheck /><b>Quality Focus</b><span>Carefully sourced materials</span></div>
          <div><Truck /><b>Pan India Supply</b><span>Serving businesses across India</span></div>
          <div><ShoppingBasket /><b>Wholesale Enquiries</b><span>Multiple herbal categories</span></div>
        </section>

        <section className="section" id="about">
          <span className="eyebrow">ABOUT HINDUSTAN HERBS</span>
          <h2>{hindi ? "आपका भरोसेमंद हर्बल पार्टनर" : "Your Trusted Herbal Partner"}</h2>
          <p>Hindustan Herbs supplies raw herbal materials to businesses, manufacturers, traders and wholesalers.</p>
        </section>

        <section className="section products" id="products">
          <span className="eyebrow">OUR CATEGORIES</span>
          <h2>{hindi ? "हमारी हर्बल सामग्री" : "Explore Herbal Materials"}</h2>
          <div className="product-grid">
            {["Roots & Rhizomes", "Seeds & Spices", "Leaves & Herbs", "Barks & Wood"].map(item => (
              <div className="product-card" key={item}>
                <Leaf size={25} />
                <h3>{item}</h3>
                <span>Wholesale enquiries welcome</span>
              </div>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <span className="eyebrow">LET'S WORK TOGETHER</span>
          <h2>{hindi ? "अपनी आवश्यकता हमें बताएं" : "Tell Us What You Need"}</h2>
          <p>Share your raw herbal material requirement with Hindustan Herbs.</p>
          <a className="primary-btn" href="tel:8305842429"><Phone size={18} /> 8305842429</a>
          <a className="email-link" href="mailto:hindustanherbs7709@gmail.com">
            <Mail size={16} /> hindustanherbs7709@gmail.com
          </a>
        </section>
      </main>

      <footer>
        <b>HINDUSTAN HERBS</b>
        <span>© 2026 Hindustan Herbs. All rights reserved.</span>
      </footer>
    </div>
  );
}
