import React, { useEffect } from 'react';
import { CheckCircle, ArrowRight, PartyPopper, Calendar, MessageSquare, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="max-w-xl w-full bg-white rounded-[3rem] shadow-float border border-slate-100 p-12 text-center relative z-10"
      >
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-10 relative">
           <CheckCircle size={48} className="text-emerald-500" />
           <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.2 }}
              className="absolute -top-2 -right-2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-glow"
           >
              <PartyPopper size={20} className="text-white" />
           </motion.div>
        </div>

        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Payment Successful!</h1>
        <p className="text-slate-500 text-lg font-medium mb-12">Congratulations! Your contract has been formally initiated. We've notified the freelancer and put the funds in escrow.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 text-left">
           {[
             { icon: Calendar, title: 'Kickoff Project', desc: 'Schedule your first meeting.' },
             { icon: MessageSquare, title: 'Start Chatting', desc: 'Discuss final details.' },
           ].map((step, i) => (
              <div key={i} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-primary flex-shrink-0">
                    <step.icon size={20} />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">{step.desc}</p>
                 </div>
              </div>
           ))}
        </div>

        <div className="flex flex-col gap-3">
           <Button size="lg" className="h-14 rounded-2xl text-white shadow-glow" onClick={() => navigate('/dashboard/client')}>
              Go to Dashboard <ArrowRight size={18} className="ml-2" />
           </Button>
           <Button variant="ghost" size="lg" className="h-14 rounded-2xl text-slate-400 font-bold uppercase tracking-widest text-xs" onClick={() => navigate('/dashboard/chat')}>
              Go to Messages
           </Button>
        </div>
      </motion.div>
    </div>
  );
}
