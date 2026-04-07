import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Bot, Code2, Paintbrush, LineChart } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Landing = () => {
  return (
    <div className="pt-32 pb-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mt-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            AI-Powered Matchmaking is Live
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-6xl md:text-8xl font-black mb-6 leading-[1.1]">
            Find Talent.<br/>
            <span className="text-gradient">Build Dreams.</span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-xl text-muted mb-10 max-w-2xl mx-auto">
            The premium marketplace where visionary clients meet top-tier AI-vetted professionals. Skip the noise, hire the best.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/gigs" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 px-10 text-lg">
                Find Freelancers
              </Button>
            </Link>
            <Link to="/signup" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full h-14 px-10 text-lg">
                Earn Money
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="mt-32 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <h3 className="text-center text-xl font-bold mb-8">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Bot, label: 'AI & Machine Learning', count: '1,240+' },
              { icon: Code2, label: 'Development & IT', count: '5,000+' },
              { icon: Paintbrush, label: 'Design & Creative', count: '3,200+' },
              { icon: LineChart, label: 'Sales & Marketing', count: '2,100+' }
            ].map((cat, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center group hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                  <cat.icon className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-bold text-textMain mb-1">{cat.label}</h4>
                <p className="text-sm text-muted">{cat.count} talents</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
