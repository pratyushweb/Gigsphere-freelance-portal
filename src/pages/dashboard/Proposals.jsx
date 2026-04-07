import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Star, Zap, AlignLeft, Check, X, Loader2, ChevronLeft, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiFetch, formatCurrency } from '../../lib/api';

export default function Proposals() {
  const { gigId } = useParams();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hiringId, setHiringId] = useState(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/proposals/${gigId}`);
        setProposals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [gigId]);

  const handleHire = async (proposal) => {
    try {
      setHiringId(proposal.id);
      const data = await apiFetch('/contracts/hire', {
        method: 'POST',
        body: JSON.stringify({
          gig_id: gigId,
          freelancer_id: proposal.freelancer_id,
          proposal_id: proposal.id
        })
      });

      if (data.checkoutUrl) {
        // Redirect to Stripe
        window.location.href = data.checkoutUrl;
      }
    } catch (err) {
      alert('Error initiating hire: ' + err.message);
    } finally {
      setHiringId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary mb-4" />
        <p className="text-slate-500 font-medium">Analyzing freelancer applications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
       <div className="mb-8">
          <Link to="/dashboard/client" className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-primary mb-4 transition-colors">
             <ChevronLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Review Proposals</h1>
          <p className="text-slate-500">
             {proposals.length > 0 
               ? `You have ${proposals.length} active proposals to review.` 
               : "No proposals have been submitted for this project yet."}
          </p>
       </div>

       {error && (
          <Card className="bg-red-50 border-red-100 p-6 flex items-center gap-3 text-red-600">
             <AlertCircle size={20} />
             <p className="font-medium">{error}</p>
          </Card>
       )}

       <div className="space-y-6">
          <AnimatePresence>
            {proposals.map((proposal, i) => (
               <motion.div 
                 key={proposal.id} 
                 initial={{ opacity: 0, y: 10 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 transition={{ delay: i * 0.1 }}
               >
                  <Card className={`overflow-visible border-2 transition-all relative ${proposal.ai_badge === 'Top Match' ? 'border-primary/20 ring-4 ring-primary/5 shadow-float' : 'border-border'}`}>
                     <CardContent className="p-6">
                        {/* AI Highlight Badge */}
                        {proposal.ai_badge === 'Top Match' && (
                           <div className="absolute -top-3 left-6">
                              <Badge variant="ai" className="px-3 py-1 bg-white border border-primary/20 shadow-sm flex items-center gap-1">
                                 <Zap size={14} className="fill-primary text-primary" /> AI Top Match
                              </Badge>
                           </div>
                        )}

                        <div className="flex flex-col md:flex-row gap-6 mt-2">
                           {/* Left Column: Freelancer Info */}
                           <div className="w-full md:w-1/3 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 pr-0 md:pr-6">
                              <div className="flex items-start gap-4">
                                 <Avatar 
                                    alt={proposal.freelancer?.name} 
                                    fallback={proposal.freelancer?.name?.charAt(0)}
                                    size="lg" 
                                    className="ring-2 ring-white shadow-sm rounded-xl" 
                                 />
                                 <div>
                                    <h3 className="font-bold text-lg text-slate-900 leading-tight">{proposal.freelancer?.name}</h3>
                                    <div className="flex items-center gap-1 mt-1 text-amber-500">
                                       <Star size={14} className="fill-current" />
                                       <span className="text-sm font-medium text-slate-700">{proposal.freelancer?.rating || 'New'}</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                                 <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Bid Amount</p>
                                    <p className="text-2xl font-black text-slate-900">{formatCurrency(proposal.bid_amount)}</p>
                                 </div>
                                 <Badge variant="secondary" className="bg-white border-slate-200">{proposal.delivery_days} days</Badge>
                              </div>
                              <Button variant="outline" className="w-full h-11 rounded-xl">Message</Button>
                           </div>

                           {/* Right Column: Experience & Cover Letter */}
                           <div className="w-full md:w-2/3 flex flex-col pt-2 md:pt-0">
                              <div className="flex items-center gap-2 mb-3">
                                 <AlignLeft size={16} className="text-slate-400" />
                                 <h4 className="font-bold text-slate-900 text-sm">Cover Letter</h4>
                              </div>
                              <div className="p-5 bg-slate-50 rounded-2xl text-slate-600 text-sm leading-relaxed border border-slate-100 mb-6 flex-1 min-h-[140px] whitespace-pre-wrap">
                                 {proposal.cover_letter}
                              </div>

                              {proposal.ai_analysis && (
                                 <div className="mb-6 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
                                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                                       <Zap size={10} className="fill-indigo-500" /> AI Insights
                                    </p>
                                    <p className="text-xs text-indigo-900/70 italic leading-relaxed">
                                       "{proposal.ai_analysis}"
                                    </p>
                                 </div>
                              )}

                              <div className="flex justify-end gap-3 mt-auto">
                                 <Button variant="ghost" className="text-slate-400 hover:text-red-500 hover:bg-red-50">
                                    <X size={16} className="mr-1.5" /> Decline
                                 </Button>
                                 <Button 
                                    className="bg-emerald-500 hover:bg-emerald-600 text-white min-w-[160px] h-12 rounded-xl shadow-lg shadow-emerald-200"
                                    onClick={() => handleHire(proposal)}
                                    isLoading={hiringId === proposal.id}
                                    disabled={hiringId !== null}
                                 >
                                    <Check size={18} className="mr-1.5" /> Hire Freelancer
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </motion.div>
            ))}
          </AnimatePresence>
       </div>
    </div>
  );
}
