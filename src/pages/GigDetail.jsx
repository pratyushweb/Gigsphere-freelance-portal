import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../components/ui/Badge';
import { ProposalCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MessageSquare, FileText, CheckCircle } from 'lucide-react';

const GigDetail = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [showModal, setShowModal] = useState(false);

  const tabs = ['Overview', 'Proposals', 'Chat'];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="flex gap-4 items-center mb-6 relative z-10">
          <Badge variant="success" dot>Active</Badge>
          <span className="text-sm text-muted">Posted 2 days ago by TechFlow Inc.</span>
        </div>
        <h1 className="text-4xl font-black mb-4 relative z-10 leading-tight pr-20">
          Build a fully responsive React Dashboard with AI Data Insights
        </h1>
        <div className="flex flex-wrap gap-2 mb-8 relative z-10">
          <Badge variant="default" className="bg-surface">React</Badge>
          <Badge variant="default" className="bg-surface">Tailwind CSS</Badge>
          <Badge variant="default" className="bg-surface">OpenAI API</Badge>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 relative z-10 items-start sm:items-center justify-between border-t border-gray-50 pt-6">
           <div>
             <div className="text-sm text-muted mb-1">Fixed Budget</div>
             <div className="text-2xl font-bold text-textMain">$4,500</div>
           </div>
           <Button size="lg" onClick={() => setShowModal(true)}>Apply for Gig</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8 relative">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold relative transition-colors ${activeTab === tab ? 'text-primary' : 'text-muted hover:text-textMain'}`}
          >
            {tab === 'Proposals' && (
               <span className="absolute -top-1 -right-4 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">12</span>
            )}
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'Overview' && (
            <div className="prose max-w-none text-textMain">
              <h3 className="font-bold text-lg mb-2">Project Description</h3>
              <p className="text-muted leading-relaxed mb-6">
                We are looking for an experienced frontend developer to build a comprehensive analytics dashboard. 
                The application needs to integrate with our backend API and utilize the OpenAI API to summarize 
                trends in user data automatically. The ideal candidate will have strong experience in React, 
                Tailwind, and data visualization libraries like Recharts.
              </p>
              <h3 className="font-bold text-lg mb-2">Deliverables</h3>
              <ul className="list-disc list-inside text-muted space-y-2">
                <li>Fully responsive dashboard layout.</li>
                <li>Integration of 4 different chart types using Recharts.</li>
                <li>"AI Insight" panel that queries our custom OpenAI wrapper endpoint.</li>
                <li>Clean, well-documented code adhering to modern React practices.</li>
              </ul>
            </div>
          )}

          {activeTab === 'Proposals' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProposalCard 
                name="Sarah Jenkins" 
                message="I have built 4 similar dashboards using Recharts and integrated OpenAI for data summarization in my last role." 
                matchScore={98} 
                aIRanked={true} 
              />
              <ProposalCard 
                name="David Lee" 
                message="Expert in React and Tailwind. Can deliver this within 2 weeks with highly polished animations." 
                matchScore={85} 
                aIRanked={false} 
              />
              <ProposalCard 
                name="Michael Chen" 
                message="Full stack developer. I can also help optimize the backend APIs if needed." 
                matchScore={72} 
                aIRanked={false} 
              />
            </div>
          )}
          
          {activeTab === 'Chat' && (
             <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <MessageSquare className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="font-bold text-lg mb-1">No Active Conversation</h3>
                <p className="text-muted text-sm">Please apply to this gig or accept a proposal to start chatting.</p>
             </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Success/Confetti Modal Mockup */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Proposal Sent!</h2>
              <p className="text-muted text-sm mb-6">Your profile and cover letter have been submitted for AI ranking.</p>
              <Button className="w-full" onClick={() => setShowModal(false)}>Back to Gig</Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GigDetail;
