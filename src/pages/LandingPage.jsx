import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Star, CheckCircle, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { categories } from '../data/dummy';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/gigs?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/5 to-background pt-24 pb-32">
        <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-900/[0.04] dark:bg-[bottom_1px_center]" style={{ maskImage: 'linear-gradient(to bottom, transparent, black)' }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <Zap size={16} className="text-primary fill-primary" /> AI-Powered Matching
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Find top talent. <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Build faster.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Join the world's most advanced marketplace connecting ambitious companies with elite freelance professionals instantly.
            </p>
          </motion.div>
          
          <motion.form 
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
          >
             <div className="relative w-full shadow-float rounded-2xl bg-white p-2 flex items-center border border-slate-100 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                 <Search className="absolute left-6 text-slate-300" size={20} />
                 <input 
                    type="text" 
                    placeholder="Search for services (e.g. Logo Design, Website)" 
                    className="w-full bg-transparent border-none pl-12 pr-32 py-3 focus:outline-none text-slate-700 font-medium" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                 />
                 <Button type="submit" className="absolute right-2 px-8 text-white h-11" size="lg">Search</Button>
             </div>
          </motion.form>

           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 flex items-center justify-center gap-6 text-[11px] text-slate-400 font-black uppercase tracking-widest">
             <span className="text-slate-200">Trusted by:</span>
             <span className="hover:text-slate-600 transition-colors cursor-default">Microsoft</span>
             <span className="hover:text-slate-600 transition-colors cursor-default">Airbnb</span>
             <span className="hover:text-slate-600 transition-colors cursor-default">Google</span>
          </motion.div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Explore Categories</h2>
              <p className="text-slate-500 text-lg font-medium">Get inspired to build your business</p>
            </div>
            <Link to="/gigs" className="text-primary font-bold hover:underline flex items-center gap-1 group">
              See all categories <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <motion.div key={cat.id} variants={itemVariants}>
                <Card 
                  hover 
                  className="h-full border-border/50 group cursor-pointer overflow-hidden rounded-[2rem]"
                  onClick={() => navigate(`/gigs?category=${encodeURIComponent(cat.name)}`)}
                >
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:scale-110">
                      <span className="text-2xl font-bold">{cat.icon}</span>
                    </div>
                    <h3 className="font-bold text-xl mb-1 text-slate-900">{cat.name}</h3>
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">{cat.count}+ Skills</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-50" id="how-it-works">
         <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2 text-center">How GigSphere Works</h2>
            <p className="text-slate-500 text-center mb-20 text-lg font-medium">Your platform for the future of work.</p>
            <div className="grid md:grid-cols-3 gap-12 relative">
               <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10"></div>
               {[
                 { step: '1', title: 'Find the right fit', desc: 'Our AI analyzes your requirement and matches you with top talent instantly.' },
                 { step: '2', title: 'Collaborate easily', desc: 'Secure workspace to chat, share files, and track progress with your partner.' },
                 { step: '3', title: 'Pay securely', desc: 'Our escrow system ensures you only pay when you approve the final delivered work.' }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center text-center relative z-10 p-4">
                    <div className="w-16 h-16 rounded-3xl bg-white border border-slate-100 shadow-float flex items-center justify-center text-2xl font-black text-primary mb-6 transition-transform hover:scale-110 duration-300">
                       {item.step}
                       {i === 1 && <div className="absolute inset-0 bg-primary/10 rounded-3xl animate-ping -z-10"></div>}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed text-sm font-medium">{item.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <h2 className="text-5xl font-black text-white mb-6 tracking-tight">Ready to get your work done?</h2>
          <p className="text-primary-light text-xl mb-12 font-medium opacity-90">Join thousands of businesses who use GigSphere to scale their teams and operations.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-slate-50 h-14 px-10 text-lg rounded-2xl" onClick={() => navigate('/login')}>Hire Super Talent</Button>
             <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 hover:text-white h-14 px-10 text-lg rounded-2xl" onClick={() => navigate('/register')}>Find Your Next Gig</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
