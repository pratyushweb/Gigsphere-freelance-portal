import React from 'react';
import { XCircle, ArrowLeft, RefreshCw, HelpCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export default function Cancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-500/5 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl z-0"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="max-w-xl w-full bg-white rounded-[3rem] shadow-float border border-slate-100 p-12 text-center relative z-10"
      >
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-10">
           <XCircle size={48} className="text-red-500" />
        </div>

        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Payment Cancelled</h1>
        <p className="text-slate-500 text-lg font-medium mb-12">No charges were made to your card. If you experienced any issues during checkout, our support team is available 24/7 to help you resolve them.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 text-left">
           {[
             { icon: RefreshCw, title: 'Try Again', desc: 'Re-initiate the checkout flow.' },
             { icon: HelpCircle, title: 'Contact Support', desc: 'Need help with payments?' },
           ].map((step, i) => (
              <div key={i} className="p-5 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4 cursor-pointer hover:bg-white hover:shadow-sm transition-all" onClick={() => i === 0 ? navigate(-1) : null}>
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-red-500 flex-shrink-0">
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
           <Button size="lg" className="h-14 rounded-2xl text-white shadow-glow bg-slate-900 hover:bg-slate-800" onClick={() => navigate('/dashboard/client')}>
              <ArrowLeft size={18} className="mr-2" /> Back to Dashboard
           </Button>
           <div className="mt-8 pt-8 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-300 font-bold uppercase tracking-widest text-[10px]">
              <ShieldAlert size={14} className="fill-slate-100" /> Secure Encryption & Data Protection
           </div>
        </div>
      </motion.div>
    </div>
  );
}
