import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GigCard } from '../components/ui/Card';
import { SkillTag } from '../components/ui/Badge';

const DUMMY_GIGS = [
  { id: 1, title: 'Fine-tune LLaMA 3 for Legal Document Analysis', client: 'LexTech Inc.', budget: '5,000', skills: ['NLP', 'Python', 'LLMs'], avatarUrls: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2'] },
  { id: 2, title: 'Build a Next.js AI Chatbot with Streaming UI', client: 'SaaS Builder', budget: '2,500', skills: ['React', 'Next.js', 'OpenAI'], avatarUrls: ['https://i.pravatar.cc/150?u=3'] },
  { id: 3, title: 'Computer Vision Model for Defect Detection', client: 'ManuAI', budget: '8,000', skills: ['PyTorch', 'CV', 'AWS'], avatarUrls: ['https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5', 'https://i.pravatar.cc/150?u=6'] },
  { id: 4, title: 'Design System for FinTech Web App', client: 'FinancePros', budget: '4,000', skills: ['Figma', 'UI/UX', 'Design Systems'], avatarUrls: ['https://i.pravatar.cc/150?u=7'] },
  { id: 5, title: 'Full-stack MERN Application Developer Needed', client: 'StartupX', budget: '3,500', skills: ['MongoDB', 'Express', 'React', 'Node.js'], avatarUrls: [] },
  { id: 6, title: 'AI Automation Workflow Expert (Zapier + Make)', client: 'AutoMate', budget: '1,500', skills: ['Zapier', 'Automation', 'API'], avatarUrls: ['https://i.pravatar.cc/150?u=8', 'https://i.pravatar.cc/150?u=9'] },
];

const SKILLS = ['All', 'React', 'Python', 'UI/UX', 'LLMs', 'Node.js', 'AWS'];

const BrowseGigs = () => {
  const [loading, setLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate network fetch
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar - Filters */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-64 flex-shrink-0"
      >
        <div className="sticky top-28 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filters
          </h3>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-textMain mb-3">Skills & Categories</h4>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map(skill => (
                <SkillTag 
                  key={skill} 
                  skill={skill} 
                  selected={selectedSkill === skill} 
                  onClick={() => setSelectedSkill(skill)} 
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-textMain mb-3">Budget Range</h4>
            <input type="range" className="w-full accent-primary" min="0" max="10000" />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>$0</span>
              <span>$10k+</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content - Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black mb-1">Browse Gigs</h1>
            <p className="text-muted text-sm">Find your next big project</p>
          </div>
          
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer">
              <option>Recommended (AI)</option>
              <option>Newest First</option>
              <option>Highest Budget</option>
            </select>
            <ChevronDown className="w-4 h-4 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading 
            ? Array(6).fill(null).map((_, i) => <GigCard key={i} loading={true} />)
            : DUMMY_GIGS.filter(g => selectedSkill === 'All' || g.skills.includes(selectedSkill)).map(gig => (
                <GigCard key={gig.id} {...gig} />
              ))
          }
        </div>

        {!loading && (
          <div className="mt-12 text-center">
            <Button variant="secondary" className="px-8">Load More Gigs</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseGigs;
