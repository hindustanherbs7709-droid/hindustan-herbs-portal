
import React, { useState } from "react";
import Auth from "./Auth";
import {
  Leaf, Menu, X, ArrowRight, Phone, Mail, Globe,
  ShieldCheck, Truck, Sprout, Package, CheckCircle2,
  MessageCircle, ChevronRight
} from "lucide-react";

const categories = [
  {
    name: "Roots & Rhizomes",
    hindi: "जड़ें और कंद",
    items: "Ashwagandha, Shatavari, Mulethi, Giloy",
    image: "https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Seeds & Spices",
    hindi: "बीज और मसाले",
    items: "Kalmegh, Bavchi, Gokhru, Jeera",
    image: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Leaves & Herbs",
    hindi: "पत्तियां और जड़ी-बूटियां",
    items: "Brahmi, Neem, Tulsi, Bhringraj",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=85"
  },
  {
    name: "Barks & Wood",
    hindi: "छाल और लकड़ी",
    items: "Arjun Chhal, Dalchini, Ashok Chhal",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=85"
  }
];

export default function App() {
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
const [user, setUser] = useState(null);
  const hindi = language === "HI";

  const submitRequirement = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = `Hello Hindustan Herbs,%0A%0AMy Name: ${data.get("name")}%0ABusiness: ${data.get("business")}%0AMaterial: ${data.get("material")}%0AQuantity: ${data.get("quantity")}%0ALocation: ${data.get("location")}%0ADetails: ${data.get("details")}`;
    window.open(`https://wa.me/918305842429?text=${message}`, "_blank");
  };

  return (
    <div className="app">
      <div className="topbar">
        <span>🌿 100+ Raw Herbal Materials</span>
        <span>Pan India Wholesale Supply</span>
        <a href="tel:8305842429">Call: +91 83058 42429</a>
      </div>

      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon"><Leaf size={30} /></span>
          <span className="brand-name">HINDUSTAN <b>HERBS</b>
            <small>NATURE · QUALITY · TRUST</small>
          </span>
        </a>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? "nav-links open" : "nav-links"} onClick={() => setMenuOpen(false)}>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#products">Our Products</a>
          <a href="#why-us">Why Us</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="nav-actions">
          <button className="language" onClick={() => setLanguage(hindi ? "EN" : "HI")}>
            <Globe size={17} /> {hindi ? "English" : "हिंदी"}
          </button>
          <a className="nav-cta" href="#requirement">Send Requirement <ArrowRight size={16} /></a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <span className="eyebrow"><Sprout size={17} /> YOUR TRUSTED HERBAL SOURCING PARTNER</span>
            <h1>{hindi ? "प्रकृति की शुद्धता, आपके व्यवसाय के लिए" : "Nature's Goodness. Your Business Growth."}</h1>
            <p>{hindi ? "भारत भर में कच्ची जड़ी-बूटियों और प्राकृतिक सामग्री की थोक सप्लाई।" : "A dependable source for raw herbs, botanicals and natural ingredients for businesses across India."}</p>
            <div className="hero-buttons">
              <a className="primary-btn" href="#requirement">Share Your Requirement <ArrowRight size={18} /></a>
              <a className="outline-btn" href="#products">Explore Materials</a>
            </div>
            <div className="hero-stats">
              <div><b>100+</b><span>Herbal Materials</span></div>
              <div><b>Pan India</b><span>Supply Reach</span></div>
              <div><b>Since 2021</b><span>Our Journey</span></div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div><ShieldCheck /><span><b>Quality Focus</b><small>Careful material selection</small></span></div>
          <div><Package /><span><b>Wholesale Supply</b><small>Multiple herbal categories</small></span></div>
          <div><Truck /><span><b>Pan India Network</b><small>Business supply across India</small></span></div>
          <div><MessageCircle /><span><b>Personal Assistance</b><small>One point of contact</small></span></div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1000&q=85" alt="Natural green herbs" />
            <div className="experience-card"><b>Since 2021</b><span>Growing with nature</span></div>
          </div>
          <div className="about-copy">
            <span className="section-tag">ABOUT HINDUSTAN HERBS</span>
            <h2>A Reliable Partner for Raw Herbal Materials</h2>
            <p>Hindustan Herbs is a wholesale supplier of raw herbs and botanical materials, serving businesses that work with natural ingredients.</p>
            <p>We work with buyers, manufacturers, traders and wholesalers to understand their material requirements and help them source suitable products through one dedicated point of contact.</p>
            <div className="about-points">
              <span><CheckCircle2 /> Wide range of herbal materials</span>
              <span><CheckCircle2 /> Requirement-based sourcing</span>
              <span><CheckCircle2 /> Dedicated buyer assistance</span>
            </div>
            <a className="text-link" href="#requirement">Work With Us <ArrowRight size={17} /></a>
          </div>
        </section>

        <section className="section products-section" id="products">
          <div className="section-heading">
            <span className="section-tag">OUR PRODUCT RANGE</span>
            <h2>Explore Herbal Materials</h2>
            <p>Discover a wide range of raw herbs and botanical ingredients for your business needs.</p>
          </div>
          <div className="product-grid">
            {categories.map((item) => (
              <article className="product-card" key={item.name}>
                <div className="product-image">
                  <img src={item.image} alt={item.name} />
                  <span><Leaf size={18} /></span>
                </div>
                <div className="product-info">
                  <h3>{hindi ? item.hindi : item.name}</h3>
                  <p>{item.items}</p>
                  <a href="#requirement">Enquire Now <ChevronRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>
          <p className="catalog-note">Looking for a specific herb? Tell us your requirement, even if it is not listed here.</p>
        </section>

        <section className="why-section" id="why-us">
          <div className="section-heading">
            <span className="section-tag">WHY HINDUSTAN HERBS</span>
            <h2>Business Requirements, One Trusted Partner</h2>
            <p>We focus on understanding what your business needs.</p>
          </div>
          <div className="why-grid">
            <div><span className="why-icon"><Sprout /></span><h3>Wide Product Range</h3><p>Access a broad selection of raw herbs and botanical materials.</p></div>
            <div><span className="why-icon"><ShieldCheck /></span><h3>Quality Conscious</h3><p>Material discussions focused on your required grade and specifications.</p></div>
            <div><span className="why-icon"><MessageCircle /></span><h3>Dedicated Support</h3><p>Share your requirement with our team for coordinated assistance.</p></div>
          </div>
        </section>

        <section className="requirement-section" id="requirement">
          <div className="requirement-copy">
            <span className="section-tag">BUYER ENQUIRY</span>
            <h2>Tell Us What Your Business Needs</h2>
            <p>Looking for a particular raw herb, quantity or quality? Share your requirement with us. Our team will connect with you.</p>
            <div className="requirement-points">
              <span><CheckCircle2 /> Share any herbal material requirement</span>
              <span><CheckCircle2 /> Mention quantity and quality specifications</span>
              <span><CheckCircle2 /> Our team will coordinate with you</span>
            </div>
          </div>
          <form className="requirement-form" onSubmit={submitRequirement}>
            <h3>Submit Your Requirement</h3>
            <label>Your Name<input name="name" placeholder="Enter your name" required /></label>
            <label>Business Type<input name="business" placeholder="Manufacturer, trader, buyer..." /></label>
            <label>Material Required<input name="material" placeholder="e.g. Ashwagandha, Kalmegh..." required /></label>
            <div className="form-row">
              <label>Quantity<input name="quantity" placeholder="e.g. 500 kg" required /></label>
              <label>Delivery Location<input name="location" placeholder="City, State" required /></label>
            </div>
            <label>Additional Details<textarea name="details" placeholder="Quality, grade, whole/powder, etc." rows="3" /></label>
            <button className="primary-btn form-submit" type="submit">Send Enquiry on WhatsApp <ArrowRight size={18} /></button>
            <small className="form-note">Your enquiry will be sent directly to Hindustan Herbs on WhatsApp.</small>
          </form>
        </section>

        <section className="contact-section" id="contact">
          <span className="section-tag">LET'S CONNECT</span>
          <h2>Let's Build a Better Supply Partnership</h2>
          <p>Connect with Hindustan Herbs for your raw herbal material requirements.</p>
          <div className="contact-actions">
            <a href="tel:8305842429"><Phone /> +91 83058 42429</a>
            <a href="mailto:hindustanherbs7709@gmail.com"><Mail /> hindustanherbs7709@gmail.com</a>
          </div>
          <a className="primary-btn" href="https://wa.me/918305842429" target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowRight size={18} /></a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand"><Leaf /><b>HINDUSTAN HERBS</b><span>Nature · Quality · Trust</span></div>
        <p>Raw Herbal Materials · Wholesale Supply · Pan India</p>
        <div className="footer-links"><a href="#about">About</a><a href="#products">Products</a><a href="#requirement">Buyer Enquiry</a><a href="#contact">Contact</a></div>
        <small>© 2026 Hindustan Herbs. All rights reserved.</small>
      </footer>
    </div>
  );
}
