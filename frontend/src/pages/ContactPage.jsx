import React, { useState } from 'react';
import axios from 'axios';

const contactInfo = [
  { icon: '📍', title: 'Address', detail: '123 Medical Drive, Healthcare City, MH 440001' },
  { icon: '📞', title: 'Phone', detail: '+91 98765 43210' },
  { icon: '✉️', title: 'Email', detail: 'hello@medicare.care' },
  { icon: '🕐', title: 'Hours', detail: 'Mon–Sat: 8 AM – 8 PM | Emergency: 24/7' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/api/contact', form);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-[#f0f4f8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2342] to-[#0d3060] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 70% 50%, #1abc9c 0%, transparent 50%)'
        }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/10 text-[#1abc9c] font-semibold text-sm px-4 py-1 rounded-full mb-4">Get in Touch</span>
          <h1 className="text-5xl font-extrabold text-white mb-4">We're Here to Help</h1>
          <p className="text-blue-200 text-lg">Have a question or need assistance? Our team is ready to help you.</p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-extrabold text-[#0a2342] mb-8">Contact Information</h2>
          <div className="space-y-5 mb-10">
            {contactInfo.map((c, i) => (
              <div key={i} className="flex gap-5 items-start bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#e8f8f5] flex items-center justify-center text-2xl flex-shrink-0">{c.icon}</div>
                <div>
                  <p className="font-bold text-[#0a2342] mb-0.5">{c.title}</p>
                  <p className="text-gray-500 text-sm">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="rounded-3xl overflow-hidden h-56 bg-gradient-to-br from-[#0d3060] to-[#1abc9c] flex items-center justify-center shadow-xl">
            <div className="text-center text-white">
              <p className="text-5xl mb-3">📍</p>
              <p className="font-bold text-lg">Find Us on the Map</p>
              <p className="text-blue-200 text-sm mt-1">Healthcare City, Maharashtra</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-extrabold text-[#0a2342] mb-2">Send a Message</h2>
          <p className="text-gray-500 mb-8">We'll get back to you within 24 hours.</p>

          {sent && (
            <div className="mb-6 p-4 bg-[#e8f8f5] border border-[#1abc9c] rounded-xl text-[#16a085] font-semibold flex items-center gap-2">
              ✅ Message sent successfully! We'll be in touch soon.
            </div>
          )}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-semibold flex items-center gap-2">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1abc9c] focus:ring-2 focus:ring-[#1abc9c]/20 transition-all text-sm bg-gray-50 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1abc9c] focus:ring-2 focus:ring-[#1abc9c]/20 transition-all text-sm bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
                placeholder="How can we help?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1abc9c] focus:ring-2 focus:ring-[#1abc9c]/20 transition-all text-sm bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                rows={5}
                required
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1abc9c] focus:ring-2 focus:ring-[#1abc9c]/20 transition-all text-sm resize-none bg-gray-50 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#1abc9c] to-[#16a085] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#1abc9c]/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
              ) : 'Send Message →'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
