import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const generatedName = formData.email ? formData.email.split('@')[0] : 'Alex Morgan';
    const displayName = generatedName.charAt(0).toUpperCase() + generatedName.slice(1);
    
    localStorage.setItem('gigsphere_user', JSON.stringify({ 
      name: displayName, 
      avatar: 'https://i.pravatar.cc/150?u=12' 
    }));
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl border border-white/50 shadow-2xl shadow-primary/10 max-w-md w-full relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg shadow-primary/20 mb-4">
            G
          </div>
          <h2 className="text-3xl font-black mb-2">Welcome Back</h2>
          <p className="text-muted text-sm">Enter your details to access your account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold mb-2">Email Address</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com" 
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
               <label className="block text-sm font-bold">Password</label>
               <a href="#" className="flex text-xs font-bold text-primary hover:underline">Forgot password?</a>
            </div>
            <input 
              type="password" 
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••" 
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
          
          <Button type="submit" className="w-full h-12 mt-4 text-lg">
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/signup" className="font-bold text-primary hover:underline">Sign up for free</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
