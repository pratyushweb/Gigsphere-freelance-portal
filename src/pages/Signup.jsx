import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase } from 'lucide-react';
import { Button } from '../components/ui/Button';

const Signup = () => {
  const [role, setRole] = useState(null); // 'client' or 'freelancer'
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem('gigsphere_user', JSON.stringify({ 
      name: formData.name || 'New User', 
      avatar: 'https://i.pravatar.cc/150?u=12' 
    }));
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl border border-white/50 shadow-2xl shadow-primary/10 max-w-md w-full relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2">Create an Account</h2>
          <p className="text-muted text-sm">Join GigSphere to find top talent or your next big gig.</p>
        </div>

        <div className="flex gap-4 mb-6">
          <button 
            className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${role === 'client' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 bg-white text-muted hover:border-primary/50'}`}
            onClick={() => setRole('client')}
            type="button"
          >
            <Briefcase className="w-6 h-6" />
            <span className="font-bold text-sm">I'm a Client</span>
          </button>
          
          <button 
            className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all ${role === 'freelancer' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 bg-white text-muted hover:border-primary/50'}`}
            onClick={() => setRole('freelancer')}
            type="button"
          >
            <User className="w-6 h-6" />
            <span className="font-bold text-sm">I'm a Freelancer</span>
          </button>
        </div>

        <AnimatePresence>
          {role && (
            <motion.form 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSignup} 
              className="space-y-5 overflow-hidden"
            >
              <div>
                <label className="block text-sm font-bold mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe" 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
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
                <label className="block text-sm font-bold mb-2">Password</label>
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
                Sign Up as {role === 'client' ? 'Client' : 'Freelancer'}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-8 text-center text-sm">
          <span className="text-muted">Already have an account? </span>
          <Link to="/login" className="font-bold text-primary hover:underline">Log In</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
