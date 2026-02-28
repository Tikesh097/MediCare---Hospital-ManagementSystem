import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'patient' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const result = await register(form.name, form.email, form.password, form.role);
      if (result.success) {
        toast.success('Account created successfully!');
        const map = { admin: '/admin', doctor: '/doctor', patient: '/patient' };
        navigate(map[form.role] || '/');
      } else {
        toast.error(result.message || 'Registration failed');
      }
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: 'patient', icon: '🧑‍🤝‍🧑', label: 'Patient', desc: 'Book appointments & view prescriptions' },
    { value: 'doctor', icon: '👨‍⚕️', label: 'Doctor', desc: 'Manage appointments & create prescriptions' },
  ];

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#0a2342] via-[#0d3060] to-[#1a5276] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 70% 30%, #1abc9c 0%, transparent 50%)'}} />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1abc9c] to-[#0d3060] border border-white/20 flex items-center justify-center text-xl">🏥</div>
            <span className="text-2xl font-extrabold text-white">Medi<span className="text-[#1abc9c]">Care</span></span>
          </Link>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-4">Join MediCare Today</h2>
          <p className="text-blue-300 text-lg mb-8">Experience seamless healthcare management tailored to your role.</p>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex gap-1 mb-3">{[...Array(5)].map((_,i)=><span key={i} className="text-[#f39c12]">★</span>)}</div>
            <p className="text-blue-200 italic mb-4">"MediCare completely transformed how I manage my health. Everything is so easy!"</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1abc9c] to-[#16a085] flex items-center justify-center text-white font-bold text-sm">AK</div>
              <div>
                <p className="text-white text-sm font-semibold">Aditya Kumar</p>
                <p className="text-blue-400 text-xs">Patient</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 text-blue-400 text-sm">© {new Date().getFullYear()} MediCare. All rights reserved.</div>
      </div>

      <div className="w-full lg:w-3/5 flex items-center justify-center bg-[#f0f4f8] p-8 overflow-y-auto">
        <div className="w-full max-w-lg py-8">
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1abc9c] to-[#0d3060] flex items-center justify-center text-xl">🏥</div>
              <span className="text-2xl font-extrabold text-[#0a2342]">Medi<span className="text-[#1abc9c]">Care</span></span>
            </Link>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-[#0a2342] mb-2">Create Account</h1>
              <p className="text-gray-500">Join thousands who trust MediCare</p>
            </div>

            {/* Role Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">I am a...</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map(r => (
                  <button key={r.value} type="button" onClick={()=>setForm({...form,role:r.value})}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${form.role===r.value ? 'border-[#1abc9c] bg-[#e8f8f5]' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="text-2xl mb-1">{r.icon}</div>
                    <p className={`font-bold text-sm ${form.role===r.value ? 'text-[#1abc9c]' : 'text-gray-700'}`}>{r.label}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                  <input type="text" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="John Doe" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1abc9c] focus:ring-2 focus:ring-[#1abc9c]/20 transition-all text-sm bg-gray-50 focus:bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                  <input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1abc9c] focus:ring-2 focus:ring-[#1abc9c]/20 transition-all text-sm bg-gray-50 focus:bg-white" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔑</span>
                    <input type={showPass?'text':'password'} required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••" className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1abc9c] focus:ring-2 focus:ring-[#1abc9c]/20 transition-all text-sm bg-gray-50 focus:bg-white" />
                    <button type="button" onClick={()=>setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{showPass?'🙈':'👁️'}</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                    <input type="password" required value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})} placeholder="••••••••" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1abc9c] focus:ring-2 focus:ring-[#1abc9c]/20 transition-all text-sm bg-gray-50 focus:bg-white" />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-[#1abc9c] to-[#16a085] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#1abc9c]/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2 mt-2">
                {loading ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</>) : 'Create Free Account →'}
              </button>
            </form>
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm">Already have an account? <Link to="/login" className="text-[#1abc9c] font-bold hover:underline">Sign in</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
