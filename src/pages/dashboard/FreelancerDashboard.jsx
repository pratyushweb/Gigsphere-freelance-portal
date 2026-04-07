import React, { useState, useEffect } from 'react';
import { Star, Award, TrendingUp, Zap, Clock, DollarSign, Loader2, Search, FileText } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { apiFetch, formatCurrency, formatDate } from '../../lib/api';

export default function FreelancerDashboard() {
  const [recommendedGigs, setRecommendedGigs] = useState([]);
  const [myProposals, setMyProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [gigsData, proposalsData] = await Promise.all([
          apiFetch('/gigs'),
          apiFetch('/proposals/my')
        ]);
        setRecommendedGigs(gigsData.slice(0, 3));
        setMyProposals(proposalsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user.full_name?.split(' ')[0] || 'Freelancer'}!</h1>
          <p className="text-slate-500 mt-2">Manage your applications and find new opportunities.</p>
        </div>
        <Card className="bg-gradient-to-r from-primary to-primary-hover border-0 text-white p-4 shadow-glow flex-shrink-0">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                 <Award size={24} className="text-white" />
              </div>
              <div>
                 <p className="text-primary-light text-sm font-medium">Freelancer Profile</p>
                 <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">Authenticated</span>
                    <Badge className="bg-white/20 text-white border-0 hover:bg-white/30 hidden sm:inline-flex">Level 1</Badge>
                 </div>
              </div>
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { icon: DollarSign, label: 'Total Earnings', value: '$0.00', color: 'text-accent', bg: 'bg-accent/10' },
          { icon: FileText, label: 'Total Proposals', value: myProposals.length.toString(), color: 'text-primary', bg: 'bg-primary/10' },
          { icon: Star, label: 'Avg Rating', value: 'New', color: 'text-amber-500', bg: 'bg-amber-100' },
          { icon: TrendingUp, label: 'Success Rate', value: '100%', color: 'text-emerald-500', bg: 'bg-emerald-100' },
        ].map((stat, i) => (
           <Card key={i}>
             <CardContent className="p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
               <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                 <stat.icon size={20} />
               </div>
               <div>
                 <p className="text-xs text-slate-500 font-medium whitespace-nowrap">{stat.label}</p>
                 <h3 className="text-xl font-bold text-slate-900 mt-0.5">{stat.value}</h3>
               </div>
             </CardContent>
           </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
         {/* Left Column: Recommendations & Applications */}
         <div className="lg:col-span-2 space-y-10">
            {/* My Applications Section */}
            <section>
               <h2 className="text-xl font-bold text-slate-900 mb-4">Your Recent Applications</h2>
               <div className="space-y-4">
                  {loading ? (
                     <div className="py-8 flex justify-center"><Loader2 className="animate-spin text-slate-200" /></div>
                  ) : myProposals.length === 0 ? (
                     <Card className="border-dashed border-2 py-8 text-center bg-transparent">
                        <p className="text-slate-500 text-sm">You haven't applied for any gigs yet.</p>
                     </Card>
                  ) : (
                     myProposals.map((proposal, i) => (
                        <Card key={proposal.id} className="border-border">
                           <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex-1">
                                 <h4 className="font-bold text-slate-900 text-sm">{proposal.gig?.title}</h4>
                                 <p className="text-xs text-slate-500 mt-1">Bid: {formatCurrency(proposal.bid_amount)} • Status: <span className="capitalize font-bold text-primary">{proposal.status}</span></p>
                              </div>
                              <div className="text-right">
                                 {proposal.ai_rank_score && (
                                    <div className="flex items-center gap-1 text-primary text-[10px] font-bold uppercase tracking-wider">
                                       <Zap size={10} className="fill-primary" /> AI Match: {proposal.ai_rank_score}%
                                    </div>
                                 )}
                                 <p className="text-[10px] text-slate-400 mt-1">{formatDate(proposal.created_at)}</p>
                              </div>
                           </CardContent>
                        </Card>
                     ))
                  )}
               </div>
            </section>

            {/* Recommendations Section */}
            <section>
               <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Recommended for you</h2>
                  <Button variant="ghost" className="text-primary text-sm" onClick={() => navigate('/gigs')}>Explore Marketplace</Button>
               </div>

               <div className="space-y-4">
                  {loading ? (
                     <div className="py-12 flex flex-col items-center gap-3 text-slate-300">
                        <Loader2 size={32} className="animate-spin" />
                     </div>
                  ) : recommendedGigs.length === 0 ? (
                     <Card className="border-dashed border-2 py-12 text-center">
                        <Search size={32} className="text-slate-200 mx-auto mb-3" />
                        <p className="text-slate-500 text-sm">No new recommendations today.</p>
                     </Card>
                  ) : (
                     <AnimatePresence>
                        {recommendedGigs.map((gig, i) => (
                           <motion.div 
                              key={gig.id} 
                              initial={{ opacity: 0, x: -20 }} 
                              animate={{ opacity: 1, x: 0 }} 
                              transition={{ delay: i * 0.1 }}
                           >
                              <Card hover className="cursor-pointer" onClick={() => navigate(`/gigs/${gig.id}`)}>
                                 <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                       <div className="flex-1">
                                          <Badge variant="ai" className="mb-3 flex w-max gap-1 items-center px-3 py-1 bg-primary/5 text-primary border-primary/10">
                                             <Zap size={14} className="fill-primary" /> AI Recommended
                                          </Badge>
                                          <h3 className="text-lg font-bold text-slate-900 mb-1 leading-tight">{gig.title}</h3>
                                          <p className="text-sm text-slate-500 line-clamp-2">{gig.description}</p>
                                       </div>
                                       <div className="text-right ml-4 shrink-0">
                                          <p className="font-bold text-slate-900">{formatCurrency(gig.budget)}</p>
                                       </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                       <div className="flex flex-wrap gap-2">
                                          {gig.skills_required?.slice(0,3).map(skill => (
                                             <Badge key={skill} variant="outline" className="text-[10px] h-5">{skill}</Badge>
                                          ))}
                                       </div>
                                       <Button variant="outline" size="sm" className="h-8">View Gig</Button>
                                    </div>
                                 </CardContent>
                              </Card>
                           </motion.div>
                        ))}
                     </AnimatePresence>
                  )}
               </div>
            </section>
         </div>

         {/* Right Column: Profile Status */}
         <div className="space-y-6">
             <Card className="border-0 shadow-soft sticky top-24">
                <CardContent className="p-6 space-y-6">
                   <div>
                        <h3 className="font-bold text-slate-900 mb-2">Profile Health</h3>
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                           <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <p className="text-xs text-slate-500 font-medium whitespace-pre-wrap">Complete your bio to improve your AI ranking in searches.</p>
                   </div>
                   <div className="pt-6 border-t border-border">
                      <h3 className="font-bold text-slate-900 mb-4">Next Steps</h3>
                      <div className="space-y-4">
                         <div className="flex gap-3 items-start">
                            <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                            <p className="text-xs text-slate-600 font-medium">Verify your email to bid on high-budget projects.</p>
                         </div>
                         <div className="flex gap-3 items-start">
                            <div className="w-2 h-2 rounded-full bg-accent mt-1.5" />
                            <p className="text-xs text-slate-600 font-medium">Update your portfolio with your latest work.</p>
                         </div>
                      </div>
                   </div>
                   <Button variant="secondary" className="w-full h-11 text-indigo-700">Customize Profile</Button>
                </CardContent>
             </Card>
         </div>
      </div>
    </div>
  );
}
