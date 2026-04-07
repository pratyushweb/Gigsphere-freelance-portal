import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown, Star, Loader2, X, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { apiFetch, formatCurrency, formatDate } from '../../lib/api';

export default function GigList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchGigs = async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const queryParams = new URLSearchParams(filters).toString();
      const data = await apiFetch(`/gigs?${queryParams}`);
      
      // Safety check: ensure data is an array
      if (Array.isArray(data)) {
        setGigs(data);
      } else {
        setGigs([]);
        console.warn('Backend did not return an array for /gigs');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch gigs. Please check if your backend is running.');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch based on URL params
  useEffect(() => {
    const filters = {};
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    
    if (search) filters.search = search;
    if (category) filters.category = category;
    
    fetchGigs(filters);
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      newParams.set('search', searchQuery.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 mb-10">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header & Search */}
        <div className="mb-12 text-center">
           <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-black text-primary tracking-widest uppercase mb-6">
              <Briefcase size={14} className="fill-primary" /> The Global Talent Market
           </span>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">Find your next big thing.</h1>
          <p className="text-xl text-slate-500 mb-8 max-w-2xl mx-auto font-medium">Connect with top-tier projects and scale your freelance career.</p>
          
          <form className="max-w-2xl mx-auto flex gap-3 p-1 bg-white rounded-[2rem] shadow-float border border-slate-100" onSubmit={handleSearchSubmit}>
             <div className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input 
                   className="w-full text-base h-14 pl-14 pr-4 rounded-2xl border-0 focus:ring-0 transition-all font-medium placeholder:text-slate-300" 
                   placeholder="Search skills, titles, or industries..." 
                   value={searchQuery}
                   onChange={e => setSearchQuery(e.target.value)}
                />
             </div>
             <Button type="submit" size="lg" className="h-14 px-10 rounded-2xl text-white shadow-glow">Explore</Button>
          </form>
          
          {(searchParams.get('search') || searchParams.get('category')) && (
             <div className="mt-6 flex items-center justify-center gap-2">
                {searchParams.get('search') && (
                   <Badge className="bg-primary/5 text-primary border-primary/20 flex items-center gap-2 px-3 py-2 text-xs font-bold h-auto rounded-xl">
                      "{searchParams.get('search')}"
                      <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => {
                        const p = new URLSearchParams(searchParams);
                        p.delete('search');
                        setSearchParams(p);
                        setSearchQuery('');
                      }} />
                   </Badge>
                )}
                {searchParams.get('category') && (
                   <Badge className="bg-accent/10 text-accent border-accent/20 flex items-center gap-2 px-3 py-2 text-xs font-bold h-auto rounded-xl">
                      {searchParams.get('category')}
                      <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => {
                        const p = new URLSearchParams(searchParams);
                        p.delete('category');
                        setSearchParams(p);
                      }} />
                   </Badge>
                )}
             </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
             <div className="sticky top-24 space-y-6">
                <h3 className="font-black text-slate-900 flex items-center gap-2 text-sm uppercase tracking-widest px-2"><SlidersHorizontal size={16} /> Filters</h3>
                <Card className="rounded-[2.5rem] border-0 shadow-soft overflow-hidden">
                   <CardContent className="p-8 space-y-8 bg-white">
                      <div>
                         <h4 className="font-bold text-slate-400 mb-5 text-[10px] uppercase tracking-[0.2em]">Expertise</h4>
                         <div className="space-y-4">
                            {['Entry', 'Intermediate', 'Expert'].map(level => (
                               <label key={level} className="flex items-center gap-3 cursor-pointer group">
                                  <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-slate-200 text-primary focus:ring-primary/10 transition-all" />
                                  <span className="text-slate-500 text-sm font-semibold group-hover:text-slate-900">{level} Level</span>
                               </label>
                            ))}
                         </div>
                      </div>
                      <div className="pt-2">
                         <h4 className="font-bold text-slate-400 mb-5 text-[10px] uppercase tracking-[0.2em]">Pricing Range</h4>
                         <div className="grid grid-cols-2 gap-3">
                            <input type="number" placeholder="$ Min" className="h-11 text-xs bg-slate-50 border-0 rounded-xl px-4 font-bold outline-none" />
                            <input type="number" placeholder="$ Max" className="h-11 text-xs bg-slate-50 border-0 rounded-xl px-4 font-bold outline-none" />
                         </div>
                      </div>
                   </CardContent>
                </Card>
             </div>
          </div>

          {/* List */}
          <div className="flex-1">
             <div className="flex justify-between items-center mb-8 px-2">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                  {loading ? 'Searching...' : <><span className="text-slate-900">{Array.isArray(gigs) ? gigs.length : 0}</span> matches found</>}
                </p>
                <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900">
                   Recent <ChevronDown size={14} />
                </button>
             </div>

             <div className="space-y-6">
                {loading ? (
                   <div className="flex flex-col items-center justify-center py-32 text-slate-200">
                      <Loader2 size={48} className="animate-spin mb-6 text-primary" />
                      <p className="font-black uppercase tracking-widest text-xs text-slate-300">Synchronizing with marketplace...</p>
                   </div>
                ) : error ? (
                   <Card className="border-red-50 bg-red-50/20 rounded-[2.5rem] p-12 text-center">
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                         <X size={32} className="text-red-500" />
                      </div>
                      <h3 className="text-xl font-bold text-red-600 mb-2">Connection Issue</h3>
                      <p className="text-slate-500 font-medium mb-8 max-w-xs mx-auto">{String(error)}</p>
                      <Button variant="outline" className="border-red-200 text-red-600 font-bold hover:bg-red-50 px-8 h-12" onClick={() => fetchGigs()}>Try Again</Button>
                   </Card>
                ) : !Array.isArray(gigs) || gigs.length === 0 ? (
                   <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] p-32 text-center">
                      <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                         <Search size={40} className="text-slate-200" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">No Gigs Match</h3>
                      <p className="text-slate-400 font-medium mb-10">We couldn't find any results. Try adjusting your filters or search terms.</p>
                      <Button variant="primary" className="h-14 px-12 text-white shadow-glow rounded-2xl" onClick={clearFilters}>Reset All Filters</Button>
                   </div>
                ) : (
                   <AnimatePresence>
                      {gigs.map((gig, i) => (
                         <motion.div 
                            key={gig.id} 
                            initial={{ opacity: 0, y: 30 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ delay: Math.min(i * 0.05, 0.5) }}
                         >
                            <Card 
                               hover 
                               className="overflow-visible border-transparent hover:border-primary/10 transition-all cursor-pointer rounded-[2.5rem] shadow-soft hover:shadow-float mb-4"
                               onClick={() => navigate(`/gigs/${gig.id}`)}
                            >
                               <CardContent className="p-10">
                                  <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                                     <div className="flex-1 space-y-5">
                                        <div className="flex items-center gap-3">
                                           <h3 className="text-3xl font-black text-slate-900 tracking-tighter hover:text-primary transition-colors leading-none">{gig.title}</h3>
                                           {i === 0 && <Badge variant="ai" className="h-7 px-3 py-0.5 font-black text-[10px] uppercase tracking-widest"><Star size={12} className="mr-1 fill-current" /> AI Top Pick</Badge>}
                                        </div>
                                        <p className="text-lg text-slate-500 line-clamp-2 leading-relaxed font-medium">{gig.description}</p>
                                        <div className="flex flex-wrap items-center gap-2 pt-2">
                                           {gig.skills_required?.map(skill => (
                                              <Badge key={skill} variant="outline" className="bg-slate-50 font-black text-[10px] uppercase tracking-widest h-9 px-4 border-transparent shadow-sm rounded-xl">{skill}</Badge>
                                           ))}
                                        </div>
                                     </div>
                                     <div className="text-left md:text-right bg-slate-50 md:bg-transparent p-6 md:p-0 rounded-[2rem] w-full md:w-auto flex-shrink-0 border border-slate-100 md:border-0 shadow-inner-soft md:shadow-none">
                                        <p className="text-4xl font-black text-slate-900 leading-none">{formatCurrency(gig.budget)}</p>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black mt-3">Total Budget</p>
                                        <div className="mt-8 flex flex-col md:items-end">
                                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 shadow-sm px-2 py-1 bg-white rounded-md inline-block">
                                              Posted {formatDate(gig.created_at)}
                                           </p>
                                        </div>
                                     </div>
                                  </div>
                                  
                                  <div className="flex flex-col sm:flex-row items-center justify-between pt-10 mt-10 border-t border-slate-100 gap-6">
                                     <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-black text-slate-400 text-lg shadow-sm">
                                           {gig.client?.name?.charAt(0)}
                                        </div>
                                        <div>
                                           <div className="flex items-center gap-2">
                                              <span className="font-black text-slate-900 text-sm tracking-tight">{gig.client?.name}</span>
                                              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-100 h-5 px-1.5 font-bold text-[9px] uppercase tracking-tighter">Verified</Badge>
                                           </div>
                                           <div className="flex items-center text-amber-500 gap-1 mt-0.5">
                                             <Star size={12} className="fill-current" />
                                             <Star size={12} className="fill-current" />
                                             <Star size={12} className="fill-current" />
                                             <Star size={12} className="fill-current" />
                                             <Star size={12} className="fill-current shadow-sm" />
                                             <span className="text-[10px] font-black text-slate-400 ml-1">5.0</span>
                                           </div>
                                        </div>
                                     </div>
                                     <Button variant="secondary" className="h-12 px-10 shadow-float-sm transition-all text-sm rounded-2xl font-black uppercase tracking-widest w-full sm:w-auto hover:translate-y-[-2px]">Review Project</Button>
                                  </div>
                               </CardContent>
                            </Card>
                         </motion.div>
                      ))}
                   </AnimatePresence>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
