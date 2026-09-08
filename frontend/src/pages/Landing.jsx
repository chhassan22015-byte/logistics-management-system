import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans scroll-smooth">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <h1 className="text-base sm:text-xl font-extrabold tracking-wide text-blue-400 flex items-center gap-1 sm:gap-2 leading-tight">
          🚚 <span>SwiftLogistics<br className="block sm:hidden" /> Pro</span>
        </h1>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-300">
          <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About Us</a>
          <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
          <a href="#help" className="hover:text-blue-400 transition-colors">Help & FAQ</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact Us</a>
        </div>
        
        {/* Buttons Section - Sirf ek Sign In Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/login" className="bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-blue-500/20 font-medium whitespace-nowrap">
            Sign In / Join
          </Link>
        </div>
      </nav>

      {/* 1. HOME / HERO SECTION */}
      <section id="home" className="py-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 tracking-wide uppercase">
          Next-Generation Supply Chain & Freight Solutions
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mb-6 leading-tight">
          Fast, Reliable & Secure <span className="text-blue-400">Logistics Management</span> Across the Country
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
          Streamline your cargo tracking, automated cash-on-delivery management, and real-time fleet analytics with our enterprise-grade logistics platform. Sign in to access your portal.
        </p>
        
        {/* Yahan se dono buttons (Track Shipment aur Explore Services) delete kar diye gaye hain */}

        {/* Quick Stats Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 w-full">
          <div className="bg-slate-800/60 border border-slate-750 p-6 rounded-2xl">
            <h3 className="text-3xl font-bold text-blue-400">99.8%</h3>
            <p className="text-slate-400 text-sm mt-1">On-Time Delivery Success Rate</p>
          </div>
          <div className="bg-slate-800/60 border border-slate-750 p-6 rounded-2xl">
            <h3 className="text-3xl font-bold text-amber-400">50,000+</h3>
            <p className="text-slate-400 text-sm mt-1">Monthly Active Shipments Handled</p>
          </div>
          <div className="bg-slate-800/60 border border-slate-750 p-6 rounded-2xl">
            <h3 className="text-3xl font-bold text-emerald-400">24/7</h3>
            <p className="text-slate-400 text-sm mt-1">Live Tracking & Customer Support</p>
          </div>
        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section id="about" className="py-20 px-6 bg-slate-850 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-2">About Our Company</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Pioneering Efficiency in Modern Transport & Supply Chain</h3>
            <p className="text-slate-300 leading-relaxed mb-4">
              Founded with a mission to eliminate friction in domestic and commercial cargo movement, SwiftLogistics has grown into a trusted partner for thousands of businesses and individual senders. 
            </p>
            <p className="text-slate-400 leading-relaxed mb-6">
              We combine advanced automated dispatch software, optimized route mapping, and a dedicated team of field drivers to ensure your packages reach their destination safely, on time, every time.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm font-medium">
              <div className="flex items-center gap-2">✅ Real-Time GPS Integration</div>
              <div className="flex items-center gap-2">✅ Verified Professional Drivers</div>
              <div className="flex items-center gap-2">✅ Secure COD Handling</div>
              <div className="flex items-center gap-2">✅ Automated Instant Billing</div>
            </div>
          </div>
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative">
            <h4 className="text-xl font-bold text-blue-300 mb-4">Our Core Mission</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              "To empower enterprises of all sizes with transparent, scalable, and lightning-fast supply chain technology that builds trust between merchants and consumers."
            </p>
            <div className="border-t border-slate-700 pt-4 flex justify-between text-xs text-slate-400">
              <span>Headquartered in Pakistan</span>
              <span>Trusted Nationwide</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section id="services" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-2">Our Specialized Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Tailored Logistics Solutions for Every Need</h3>
          <p className="text-slate-400 text-sm">From rapid parcel delivery to robust corporate warehousing, we handle it all with precision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl hover:border-blue-500 transition-all group">
            <div className="text-4xl mb-4">📦</div>
            <h4 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Pick & Drop Service</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Doorstep collection and swift delivery of documents, packages, and retail items with live status updates at every checkpoint.
            </p>
          </div>
          {/* Service 2 */}
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl hover:border-blue-500 transition-all group">
            <div className="text-4xl mb-4">💵</div>
            <h4 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Cash on Delivery (COD)</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              E-commerce friendly COD processing with secure weekly settlements, automated reconciliation, and fast fund transfers.
            </p>
          </div>
          {/* Service 3 */}
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl hover:border-blue-500 transition-all group">
            <div className="text-4xl mb-4">🚛</div>
            <h4 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">Heavy Cargo & Freight</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Industrial-scale transport solutions for bulk shipments, wholesale merchandise, and interstate commercial distribution.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HELP & FAQ SECTION */}
      <section id="help" className="py-20 px-6 bg-slate-850 border-t border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-2">Help & Support Center</h2>
            <h3 className="text-3xl font-bold mb-4">Frequently Asked Questions</h3>
            <p className="text-slate-400 text-sm">Got questions regarding delays, documentation, or field drivers? Find answers below.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
              <h4 className="font-semibold text-lg text-blue-300 mb-2">What should I do if my shipment is delayed?</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                If your parcel is taking longer than expected, use your Tracking ID in our portal to view live checkpoints, or reach out to our support team with your order reference.
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
              <h4 className="font-semibold text-lg text-blue-300 mb-2">How do I report an issue with a delivery driver?</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                We maintain strict code-of-conduct standards. If you face any misbehavior or delivery complications from a field driver, please use the contact form below with the driver's ID or tracking number for immediate internal review.
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl">
              <h4 className="font-semibold text-lg text-blue-300 mb-2">What documents are required for corporate shipping?</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Corporate clients need standard waybills, commercial invoices for items above threshold values, and authorized merchant verification documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT US SECTION */}
      <section id="contact" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-blue-400 text-sm font-bold uppercase tracking-wider mb-2">Get In Touch</h2>
            <h3 className="text-3xl font-bold mb-4">We're Here to Help Your Business Grow</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Have questions about bulk shipping rates, partner integrations, or general feedback? Send us a message and our support team will respond within 2 hours.
            </p>
            <div className="space-y-4 text-sm text-slate-300">
              <p>📍 Office: Main Boulevard, Khushab, Pakistan</p>
              <p>📞 Phone: +92 (300) 1234567</p>
              <p>✉️ Email: support@swiftlogistics.com</p>
            </div>
          </div>

          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
            {submitted && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg text-center">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
                  placeholder="Ali Khan"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm"
                  placeholder="ali@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Message / Inquiry</label>
                <textarea 
                  rows="4"
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 text-sm resize-none"
                  placeholder="How can we help you with your shipments?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg transition-colors shadow-lg shadow-blue-500/30 text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 SwiftLogistics Pro. All rights reserved. Built with React & Tailwind CSS.</p>
      </footer>

    </div>
  );
}