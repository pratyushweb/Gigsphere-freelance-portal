import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Share2, Flag, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import { apiFetch, formatCurrency, formatDate } from '../../lib/api';

export default function GigDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Proposal Form State
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryDays, setDeliveryDays] = useState(7);
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        setLoading(true);
        const data = await apiFetch(`/gigs/${id}`);
        setGig(data);
        setBidAmount(data.budget.toString());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  const handleSubmitProposal = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    try {
      await apiFetch('/proposals', {
        method: 'POST',
        body: JSON.stringify({
          gig_id: id,
          cover_letter: coverLetter,
          bid_amount: parseFloat(bidAmount),
          delivery_days: parseInt(deliveryDays)
        })
      });
      
      setIsModalOpen(false);
      alert('Proposal submitted successfully! The AI is now ranking your application.');
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !gig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="max-w-md w-full p-8 text-center border-0 shadow-float">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Project not found</h2>
          <p className="text-slate-500 mb-6">{error || "The project you're looking for doesn't exist or has been removed."}</p>
          <Button onClick={() => navigate('/gigs')} className="w-full">Back to Marketplace</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pb-24 relative">
      {/* Header Banner */}
      <div className="bg-white border-b border-border py-12">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                     <Badge variant={gig.status === 'open' ? 'success' : 'warning'} className="capitalize">{gig.status}</Badge>
                     <span className="text-sm text-slate-500 font-medium whitespace-nowrap">Posted {formatDate(gig.created_at)}</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{gig.title}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
                     <div className="flex items-center gap-1.5"><Clock size={16} /> Deadline: {new Date(gig.deadline).toLocaleDateString()}</div>
                     <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                     <div className="flex items-center gap-1.5"><ShieldCheck size={16} /> Payment Verified</div>
                  </div>
               </div>
               <div className="flex gap-3 shrink-0">
                  <Button variant="outline" size="icon" className="rounded-xl"><Share2 size={20} /></Button>
                  <Button variant="outline" size="icon" className="rounded-xl"><Flag size={20} /></Button>
               </div>
            </div>
         </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl mt-8">
         <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-8">
               <Card className="border-0 shadow-soft">
                  <CardContent className="p-8">
                     <h2 className="text-xl font-bold text-slate-900 mb-4">Project Description</h2>
                     <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                        <p className="whitespace-pre-wrap">{gig.description}</p>
                     </div>
                  </CardContent>
               </Card>

               <Card className="border-0 shadow-soft">
                  <CardContent className="p-8">
                     <h2 className="text-xl font-bold text-slate-900 mb-4">Skills Required</h2>
                     <div className="flex flex-wrap gap-2">
                        {gig.skills_required?.map(skill => (
                           <Badge key={skill} variant="outline" className="px-3 py-1.5 bg-slate-50">{skill}</Badge>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </div>

            {/* Sidebar Overview */}
            <div className="w-full lg:w-80 shrink-0 space-y-6">
               <Card className="border-0 shadow-float sticky top-24 bg-gradient-to-b from-white to-slate-50/50">
                  <CardContent className="p-6">
                     <div className="mb-6 flex justify-between items-end">
                        <div>
                           <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Budget</p>
                           <h3 className="text-3xl font-extrabold text-slate-900">{formatCurrency(gig.budget)}</h3>
                        </div>
                     </div>
                     <Button size="lg" className="w-full shadow-glow mb-4 rounded-2xl h-14 text-white font-bold" onClick={() => setIsModalOpen(true)}>Apply Now</Button>
                     <p className="text-xs text-center text-slate-500 mb-6">Your proposal will be ranked by our AI for the client.</p>

                     <div className="w-full h-px bg-border mb-6"></div>

                     <div>
                        <h4 className="font-bold text-slate-900 mb-4">About the Client</h4>
                        <div className="flex items-center gap-3 mb-4">
                           <Avatar alt={gig.client?.name} fallback={gig.client?.name?.charAt(0)} size="lg" className="rounded-xl" />
                           <div>
                              <p className="font-bold text-slate-900">{gig.client?.name}</p>
                              <div className="flex items-center gap-1 text-sm text-slate-600 mt-0.5">
                                 <Star size={14} className="fill-amber-500 text-amber-500" />
                                 <span className="font-semibold">{gig.client?.rating}</span>
                                 <span className="text-xs text-slate-400">(Verified)</span>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-3 text-sm text-slate-600">
                           <div className="flex items-center gap-2"><MapPin size={16} /> United States</div>
                           <div className="flex items-center gap-2"><Clock size={16} /> Fast Responder</div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>

      {/* Proposal Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-white rounded-3xl shadow-float w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
               <div className="px-6 py-5 border-b border-border flex justify-between items-center bg-slate-50">
                  <h2 className="text-xl font-bold text-slate-900">Submit Proposal</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors bg-white w-8 h-8 rounded-full flex items-center justify-center border border-border shadow-sm">✕</button>
               </div>
               
               <form onSubmit={handleSubmitProposal} className="overflow-y-auto flex-1">
                  <div className="p-6">
                     {submitError && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm flex items-center gap-2">
                           <AlertCircle size={18} /> {submitError}
                        </div>
                     )}

                     <div className="mb-8 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Applying for</p>
                        <h3 className="font-bold text-slate-900 text-lg leading-tight">{gig.title}</h3>
                     </div>
                     
                     <div className="grid sm:grid-cols-2 gap-6 mb-8">
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-2">Bid Amount ($)</label>
                           <Input 
                              type="number" 
                              placeholder="Enter your bid" 
                              required
                              value={bidAmount}
                              onChange={e => setBidAmount(e.target.value)}
                           />
                           <p className="text-xs text-slate-500 mt-1.5">Client's budget is {formatCurrency(gig.budget)}</p>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-2">Delivery Days</label>
                           <Input 
                              type="number" 
                              placeholder="e.g. 7" 
                              required
                              min="1"
                              value={deliveryDays}
                              onChange={e => setDeliveryDays(e.target.value)}
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Cover Letter</label>
                        <textarea 
                           required
                           className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 min-h-[200px] resize-y" 
                           placeholder="Describe why you are the best fit for this project. Mention your relevant experience."
                           value={coverLetter}
                           onChange={e => setCoverLetter(e.target.value)}
                        ></textarea>
                        <p className="text-xs text-slate-400 mt-2 italic">Pro Tip: Our AI ranks you higher for detailed, relevant cover letters.</p>
                     </div>
                  </div>

                  <div className="px-6 py-5 border-t border-border bg-slate-50 flex justify-end gap-3">
                     <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                     <Button type="submit" isLoading={submitting} disabled={submitting}>
                        Submit Application
                     </Button>
                  </div>
               </form>
            </motion.div>
         </div>
      )}
    </div>
  );
}
