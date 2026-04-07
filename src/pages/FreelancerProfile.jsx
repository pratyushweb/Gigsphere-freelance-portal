import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GigCard } from '../components/ui/Card';
import { SkillTag } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Star, MapPin, Briefcase, Edit2, Check } from 'lucide-react';

const FreelancerProfile = () => {
  const userStr = localStorage.getItem('gigsphere_user');
  const user = userStr ? JSON.parse(userStr) : { name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=12' };

  const [jobTitle, setJobTitle] = useState('');
  const [isEditingJob, setIsEditingJob] = useState(true);
  const [tempJobTitle, setTempJobTitle] = useState('');

  const [aboutMe, setAboutMe] = useState('I am a machine learning engineer specializing in applied Generative AI and LLMs. I have helped over 20 startups build context-aware chatbots, retrieval-augmented generation (RAG) pipelines, and intelligent data extraction systems.');
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [tempAbout, setTempAbout] = useState(aboutMe);

  const handleSaveJob = () => {
    setJobTitle(tempJobTitle || 'Freelancer');
    setIsEditingJob(false);
  };

  const handleEditAbout = () => {
    setTempAbout(aboutMe);
    setIsEditingAbout(true);
  };

  const handleSaveAbout = () => {
    setAboutMe(tempAbout);
    setIsEditingAbout(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-5xl mx-auto">
      {/* Hero Profile Banner */}
      <div className="glass-panel rounded-3xl p-8 mb-12 relative overflow-hidden border border-white/50 shadow-sm border-b-primary/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black mb-4">{user.name}</h1>
            
            <div className="mb-6 max-w-md mx-auto md:mx-0">
              {isEditingJob ? (
                <div className="flex flex-col md:flex-row gap-2">
                  <input 
                    type="text" 
                    value={tempJobTitle}
                    onChange={(e) => setTempJobTitle(e.target.value)}
                    placeholder="+ Add your profile job title..." 
                    className="w-full bg-white/80 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm shadow-sm"
                  />
                  <Button onClick={handleSaveJob} size="sm" className="whitespace-nowrap h-10 px-6">Save</Button>
                </div>
              ) : (
                <div className="group flex items-center justify-center md:justify-start gap-3">
                  <p className="text-lg text-primary font-bold">{jobTitle}</p>
                  <button onClick={() => { setTempJobTitle(jobTitle); setIsEditingJob(true); }} className="text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start text-sm text-muted mb-6">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-secondary fill-secondary" /> 4.98 (124 reviews)</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> San Francisco, CA</span>
              <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> 15 Active Contracts</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
               {['Python', 'PyTorch', 'HuggingFace', 'LangChain', 'React'].map(skill => (
                 <SkillTag key={skill} skill={skill} />
               ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto">
             <div className="text-center md:text-right mb-2">
                <span className="text-2xl font-bold text-textMain">$120</span><span className="text-muted">/hr</span>
             </div>
             <Button size="lg" className="w-full">Hire Alex</Button>
             <Button variant="secondary" size="lg" className="w-full">Message</Button>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-bold text-xl">About Me</h3>
          {!isEditingAbout && (
            <button onClick={handleEditAbout} className="text-muted hover:text-primary transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {isEditingAbout ? (
          <div className="mb-6">
            <textarea
              rows={4}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm mb-3"
              value={tempAbout}
              onChange={(e) => setTempAbout(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={handleSaveAbout} size="sm" className="px-6 flex items-center gap-2"><Check className="w-4 h-4"/> Save</Button>
              <Button onClick={() => setIsEditingAbout(false)} variant="ghost" size="sm">Cancel</Button>
            </div>
          </div>
        ) : (
          <p className="text-muted leading-relaxed mb-6">
            {aboutMe}
          </p>
        )}
        
        <div className="border-t border-gray-200 pt-6 max-w-sm">
          <h4 className="font-bold mb-3">Languages</h4>
          <ul className="text-sm text-muted space-y-2">
            <li className="flex justify-between"><span>English</span> <span className="font-medium">Native</span></li>
            <li className="flex justify-between"><span>Spanish</span> <span className="font-medium">Conversational</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
