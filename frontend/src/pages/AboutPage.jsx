import React from 'react';
import { Link } from 'react-router-dom';

const team = [
  { name: 'Dr. Ananya Sharma', role: 'Chief Medical Officer', emoji: '👩‍⚕️', spec: 'Cardiology' },
  { name: 'Dr. Rajesh Patel', role: 'Head of Neurology', emoji: '👨‍⚕️', spec: 'Neurology' },
  { name: 'Dr. Priya Nair', role: 'Pediatric Specialist', emoji: '👩‍⚕️', spec: 'Pediatrics' },
  { name: 'Dr. Arjun Kapoor', role: 'Orthopedic Surgeon', emoji: '👨‍⚕️', spec: 'Orthopedics' },
];

const values = [
  { icon: '💖', title: 'Compassion', desc: 'We treat every patient with dignity, empathy, and personalized care.' },
  { icon: '🔬', title: 'Innovation', desc: 'Leveraging the latest medical technology for better outcomes.' },
  { icon: '🤝', title: 'Integrity', desc: 'Transparent, honest healthcare with your best interests at heart.' },
  { icon: '🌟', title: 'Excellence', desc: 'Committed to the highest standards in every aspect of care.' },
];

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#f0f4f8]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0a2342] to-[#0d3060] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, #1abc9c 0%, transparent 50%)'
        }} />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/10 text-[#1abc9c] font-semibold text-sm px-4 py-1 rounded-full mb-4">About MediCare</span>
          <h1 className="text-5xl font-extrabold text-white mb-6">Healing with Heart & Technology</h1>
          <p className="text-blue-200 text-xl leading-relaxed">
            Founded on the principle that great healthcare should be accessible to all, MediCare combines cutting-edge technology with compassionate care to transform the patient experience.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
          <div className="w-14 h-14 rounded-2xl bg-[#e8f8f5] flex items-center justify-center text-3xl mb-5">🎯</div>
          <h2 className="text-2xl font-extrabold text-[#0a2342] mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            To democratize healthcare management by providing an intuitive, secure, and efficient platform that empowers patients, doctors, and administrators to collaborate seamlessly — improving health outcomes for everyone.
          </p>
        </div>
        <div className="bg-gradient-to-br from-[#0a2342] to-[#0d3060] rounded-3xl p-10 shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-5">🚀</div>
          <h2 className="text-2xl font-extrabold text-white mb-4">Our Vision</h2>
          <p className="text-blue-200 leading-relaxed">
            To become India's most trusted digital healthcare ecosystem — where every patient feels heard, every doctor is empowered, and every interaction is transparent, safe, and meaningful.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#0a2342]">Our Core Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100 text-center">
              <div className="text-4xl mb-4">{v.icon}</div>
              <h3 className="font-bold text-[#0a2342] text-lg mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#0a2342]">Meet Our Specialists</h2>
          <p className="text-gray-500 mt-3">Experienced doctors dedicated to your wellbeing.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all border border-gray-100 group">
              <div className="h-32 bg-gradient-to-br from-[#0d3060] to-[#1abc9c] flex items-center justify-center text-6xl">
                {member.emoji}
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#0a2342]">{member.name}</h3>
                <p className="text-[#1abc9c] text-sm font-medium">{member.role}</p>
                <span className="inline-block mt-2 bg-[#e8f8f5] text-[#1abc9c] text-xs px-3 py-1 rounded-full">{member.spec}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 mx-6 mb-12 rounded-3xl bg-gradient-to-br from-[#0a2342] to-[#1a5276] text-center px-6">
        <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Experience Better Healthcare?</h2>
        <p className="text-blue-200 mb-8">Join thousands who have transformed how they manage their health.</p>
        <Link to="/register" className="inline-block px-10 py-4 bg-gradient-to-r from-[#1abc9c] to-[#16a085] text-white font-bold rounded-2xl text-lg hover:scale-105 transition-transform">
          Get Started Free →
        </Link>
      </section>
    </div>
  );
}
