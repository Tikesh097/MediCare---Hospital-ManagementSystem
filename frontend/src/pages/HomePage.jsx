import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '15,000+', label: 'Patients Treated' },
  { value: '200+', label: 'Expert Doctors' },
  { value: '98%', label: 'Success Rate' },
  { value: '24/7', label: 'Emergency Care' },
];

const services = [
  {
    icon: '🫀',
    title: 'Cardiology',
    desc: 'Advanced heart care with state-of-the-art diagnostic and treatment facilities.',
  },
  {
    icon: '🧠',
    title: 'Neurology',
    desc: 'Comprehensive brain and nervous system care from top neurologists.',
  },
  {
    icon: '🦷',
    title: 'Orthopedics',
    desc: 'Expert bone, joint, and muscle care for pain-free living.',
  },
  {
    icon: '👁️',
    title: 'Ophthalmology',
    desc: 'Complete eye care services including surgery and vision correction.',
  },
  {
    icon: '🩺',
    title: 'General Medicine',
    desc: 'Primary healthcare services for all ages, from routine checkups to complex cases.',
  },
  {
    icon: '🍼',
    title: 'Pediatrics',
    desc: 'Compassionate care tailored for infants, children, and adolescents.',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Patient',
    text: 'The care I received at MediCare was exceptional. The doctors were attentive and the entire process was seamless.',
    avatar: 'PS',
  },
  {
    name: 'Rahul Mehta',
    role: 'Patient',
    text: 'Booking appointments online has never been easier. MediCare truly puts patients first.',
    avatar: 'RM',
  },
  {
    name: 'Sunita Joshi',
    role: 'Patient',
    text: 'World-class facilities and incredibly warm staff. I always feel in safe hands here.',
    avatar: 'SJ',
  },
];

const faqs = [
  { q: 'How do I book an appointment?', a: 'Simply register, log in as a patient, and use the "Book Appointment" feature to choose your doctor and preferred time slot.' },
  { q: 'Is my medical data secure?', a: 'Absolutely. We use JWT-based authentication and encrypted storage to keep all patient records confidential.' },
  { q: 'Can I view my prescriptions online?', a: 'Yes! After your appointment, prescriptions created by your doctor are instantly available in your patient dashboard.' },
  { q: 'Do you offer emergency services?', a: 'Yes, our emergency department is operational 24/7. For life-threatening situations, please call emergency services directly.' },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [count, setCount] = useState({ p: 0, d: 0, s: 0, e: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-sans overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0a2342] via-[#0d3060] to-[#1a5276]">
        {/* Decorative circles */}
        <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-[#1abc9c] opacity-10 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-60px] w-[350px] h-[350px] rounded-full bg-[#3498db] opacity-10 blur-3xl" />
        <div className="absolute top-[30%] left-[55%] w-[200px] h-[200px] rounded-full bg-[#e74c3c] opacity-5 blur-2xl" />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#1abc9c] animate-pulse" />
              <span className="text-[#1abc9c] text-sm font-medium tracking-wide">India's Trusted Hospital System</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Your Health.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1abc9c] to-[#3498db]">Our Priority.</span>
            </h1>
            <p className="text-lg text-blue-200 mb-10 leading-relaxed max-w-lg">
              MediCare brings world-class healthcare management to your fingertips. Book appointments, manage prescriptions, and connect with expert doctors — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-[#1abc9c] to-[#16a085] text-white font-bold rounded-2xl shadow-lg hover:shadow-[#1abc9c]/40 hover:scale-105 transition-all duration-300 text-lg">
                Get Started Free
              </Link>
              <Link to="/login" className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 text-lg">
                Sign In
              </Link>
            </div>
          </div>

          {/* Hero Card */}
          <div className="relative hidden lg:block">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1abc9c] to-[#16a085] flex items-center justify-center text-2xl">🏥</div>
                <div>
                  <p className="text-white font-bold text-lg">MediCare</p>
                  <p className="text-blue-300 text-sm">Hospital Management</p>
                </div>
              </div>
              {[
                { label: 'Next Available', val: 'Dr. Sharma — 10:30 AM', color: '#1abc9c' },
                { label: 'Departments', val: '12 Specializations', color: '#3498db' },
                { label: 'Prescriptions', val: '3 Active', color: '#e67e22' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                  <span className="text-blue-300 text-sm">{item.label}</span>
                  <span className="font-semibold text-white text-sm">{item.val}</span>
                </div>
              ))}
              <Link to="/register" className="mt-6 block text-center py-3 rounded-xl bg-gradient-to-r from-[#1abc9c] to-[#3498db] text-white font-bold hover:opacity-90 transition-opacity">
                Book Appointment →
              </Link>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-5 -right-5 bg-white rounded-2xl shadow-xl px-4 py-2 flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-bold text-gray-800 text-sm">4.9 / 5.0</p>
                <p className="text-gray-500 text-xs">Patient Rating</p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-4 py-2 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-bold text-gray-800 text-sm">ISO Certified</p>
                <p className="text-gray-500 text-xs">Healthcare Standards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-blue-300 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#e8f8f5] text-[#1abc9c] font-semibold text-sm px-4 py-1 rounded-full mb-4">Our Specializations</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0a2342]">World-Class Medical Services</h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">From routine checkups to complex surgeries — we have specialists for every need.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e8f8f5] to-[#d5f5e3] flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0a2342] mb-2">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-gradient-to-br from-[#0a2342] to-[#0d3060] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 text-[#1abc9c] font-semibold text-sm px-4 py-1 rounded-full mb-4">Simple & Fast</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white">How MediCare Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* connecting line */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#1abc9c] to-[#3498db] hidden md:block" />
            {[
              { icon: '📝', step: '01', title: 'Register', desc: 'Create your free account in seconds.' },
              { icon: '🔍', step: '02', title: 'Find Doctor', desc: 'Browse by specialty or availability.' },
              { icon: '📅', step: '03', title: 'Book Slot', desc: 'Pick a convenient date and time.' },
              { icon: '💊', step: '04', title: 'Get Care', desc: 'Attend & receive digital prescriptions.' },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#1abc9c] to-[#3498db] flex items-center justify-center text-3xl mb-4 shadow-lg shadow-[#1abc9c]/30 relative z-10">
                  {item.icon}
                </div>
                <span className="text-[#1abc9c] font-black text-xs tracking-widest">{item.step}</span>
                <h3 className="text-white font-bold text-xl mt-1 mb-2">{item.title}</h3>
                <p className="text-blue-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#eaf4fb] text-[#3498db] font-semibold text-sm px-4 py-1 rounded-full mb-4">For Everyone</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0a2342]">Built for Every Role</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🛡️',
              role: 'Admin',
              color: 'from-[#8e44ad] to-[#6c3483]',
              bg: 'bg-[#f5eef8]',
              text: 'text-[#8e44ad]',
              features: ['Analytics Dashboard', 'Manage Doctors', 'User Management', 'All Appointments'],
            },
            {
              icon: '👨‍⚕️',
              role: 'Doctor',
              color: 'from-[#2980b9] to-[#1a5276]',
              bg: 'bg-[#eaf4fb]',
              text: 'text-[#2980b9]',
              features: ['View Appointments', 'Create Prescriptions', 'Patient History', 'Schedule Management'],
            },
            {
              icon: '🧑‍🤝‍🧑',
              role: 'Patient',
              color: 'from-[#1abc9c] to-[#16a085]',
              bg: 'bg-[#e8f8f5]',
              text: 'text-[#1abc9c]',
              features: ['Book Appointments', 'View Prescriptions', 'Patient Profile', 'Appointment History'],
            },
          ].map((r, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className={`h-2 bg-gradient-to-r ${r.color}`} />
              <div className="p-8">
                <div className={`w-16 h-16 rounded-2xl ${r.bg} flex items-center justify-center text-3xl mb-5`}>{r.icon}</div>
                <h3 className="text-2xl font-extrabold text-[#0a2342] mb-4">{r.role}</h3>
                <ul className="space-y-3">
                  {r.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-600">
                      <span className={`w-5 h-5 rounded-full ${r.bg} ${r.text} flex items-center justify-center text-xs font-bold`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={`mt-6 block text-center py-3 rounded-xl bg-gradient-to-r ${r.color} text-white font-bold hover:opacity-90 transition-opacity`}>
                  Join as {r.role} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-[#f7fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#fef9e7] text-[#f39c12] font-semibold text-sm px-4 py-1 rounded-full mb-4">Patient Stories</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#0a2342]">What Our Patients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-shadow border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-[#f39c12]">★</span>)}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0d3060] to-[#1abc9c] flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-[#0a2342]">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-[#eaf4fb] text-[#3498db] font-semibold text-sm px-4 py-1 rounded-full mb-4">FAQ</span>
          <h2 className="text-4xl font-extrabold text-[#0a2342]">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <button
                onClick={() => setActiveTab(activeTab === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="font-bold text-[#0a2342]">{faq.q}</span>
                <span className={`text-[#1abc9c] text-2xl font-bold transition-transform duration-300 ${activeTab === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {activeTab === i && (
                <div className="px-6 pb-5 text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 mx-6 mb-12 rounded-3xl bg-gradient-to-br from-[#0a2342] via-[#0d3060] to-[#1a5276] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #1abc9c 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3498db 0%, transparent 50%)'
        }} />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">Join thousands of patients who trust MediCare for their healthcare management needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register" className="px-10 py-4 bg-gradient-to-r from-[#1abc9c] to-[#16a085] text-white font-bold rounded-2xl text-lg hover:shadow-lg hover:shadow-[#1abc9c]/30 hover:scale-105 transition-all duration-300">
              Create Free Account
            </Link>
            <Link to="/login" className="px-10 py-4 border-2 border-white/30 text-white font-bold rounded-2xl text-lg hover:bg-white/10 transition-all duration-300">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
