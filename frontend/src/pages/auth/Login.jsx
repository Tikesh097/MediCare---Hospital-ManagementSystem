import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login(form.email, form.password);
      if (result.success) {
        toast.success('Welcome back!');
        const map = { admin: '/admin', doctor: '/doctor', patient: '/patient' };
        navigate(map[result.user?.role] || '/');
      } else {
        toast.error(result.message || 'Invalid credentials');
      }
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0a2342] via-[#0d3060] to-[#1a5276] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 30% 70%, #1abc9c 0%, transparent 50%)'}} />
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',backgroundSize:'50px 50px'}} />
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1abc9c] to-[#0d3060] border border-white/20 flex items-center justify-center text-xl">🏥</div>
            <span className="text-2xl font-extrabold text-white">Medi<span className="text-[#1abc9c]">Care</span></span>
          </Link>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">Your Health Journey<br />Starts Here</h2>
          <p className="text-blue-300 text-lg mb-10 leading-relaxed">Access your dashboard, view appointments, and manage prescriptions with ease.</p>
          <div className="space-y-4">
            {[{icon:'📅',text:'Book and manage appointments effortlessly'},{icon:'💊',text:'Access digital prescriptions instantly'},{icon:'🔒',text:'Your data is encrypted and secure'}].map((item,i)=>(
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl flex-shrink-0">{item.icon}</div>
                <p className="text-blue-200">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-blue-400 text-sm">© {new Date().getFullYear()} MediCare. All rights reserved.</div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f0f4f8] p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1abc9c] to-[#0d3060] flex items-center justify-center text-xl">🏥</div>
              <span className="text-2xl font-extrabold text-[#0a2342]">Medi<span className="text-[#1abc9c]">Care</span></span>
            </Link>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-[#0a2342] mb-2">Welcome Back</h1>
              <p className="text-gray-500">Sign in to your MediCare account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                  <input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1abc9c] focus:ring-2 focus:ring-[#1abc9c]/20 transition-all text-sm bg-gray-50 focus:bg-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔑</span>
                  <input type={showPass?'text':'password'} required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••" className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#1abc9c] focus:ring-2 focus:ring-[#1abc9c]/20 transition-all text-sm bg-gray-50 focus:bg-white" />
                  <button type="button" onClick={()=>setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPass?'🙈':'👁️'}</button>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-[#1abc9c] to-[#16a085] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#1abc9c]/30 hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
                {loading ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>) : 'Sign In →'}
              </button>
            </form>
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm">Don't have an account? <Link to="/register" className="text-[#1abc9c] font-bold hover:underline">Create one free</Link></p>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">Protected by JWT authentication & 256-bit encryption</p>
        </div>
      </div>
    </div>
  );
}
