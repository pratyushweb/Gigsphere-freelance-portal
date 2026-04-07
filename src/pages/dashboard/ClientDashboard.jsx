import React, { useState, useEffect } from 'react';
import { Plus, Briefcase, Clock, CheckCircle, TrendingUp, MoreHorizontal, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { apiFetch, formatCurrency, formatDate } from '../../lib/api';
import PostGigModal from '../../components/dashboard/PostGigModal';

export default function ClientDashboard() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchMyGigs = async () => {
    try {
      setLoading(true);
      // Backend getGigs returns all open by default, 
      // ideally we'd have a /gigs/my endpoint but for now we filter locally
      const data = await apiFetch('/gigs');
      setGigs(data.filter(g => g.client_id === user.id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyGigs();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Client Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your projects and hire top freelancers.</p>
        </div>
        <Button size="lg" className="gap-2 shadow-glow text-white" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Post a new gig
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Gigs</p>
              <h3 className="text-2xl font-bold text-slate-900">{gigs.filter(g => g.status === 'open' || g.status === 'in_progress').length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Managed Projects</p>
              <h3 className="text-2xl font-bold text-slate-900">{gigs.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
               <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Completed</p>
              <h3 className="text-2xl font-bold text-slate-900">{gigs.filter(g => g.status === 'completed').length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center mt-8 mb-4">
        <h2 className="text-xl font-bold text-slate-900">Your Recent Gigs</h2>
        <Button variant="ghost" onClick={fetchMyGigs} disabled={loading}>
          {loading ? <Loader2 size={16} className="animate-spin" /> : 'Refresh'}
        </Button>
      </div>

      <div className="space-y-4">
         {loading && gigs.length === 0 ? (
            <div className="py-20 text-center">
               <Loader2 size={40} className="animate-spin text-slate-200 mx-auto mb-4" />
               <p className="text-slate-400">Loading your project history...</p>
            </div>
         ) : gigs.length === 0 ? (
            <Card className="border-dashed border-2 py-20 text-center">
               <div className="max-w-xs mx-auto">
                  <Briefcase size={40} className="text-slate-200 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 mb-2">No gigs posted yet</h3>
                  <p className="text-slate-500 text-sm mb-6">Create your first gig to start receiving proposals from experts.</p>
                  <Button onClick={() => setIsModalOpen(true)}>Post your first gig</Button>
               </div>
            </Card>
         ) : (
            <AnimatePresence>
               {gigs.map((gig, i) => (
                  <motion.div key={gig.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: i * 0.1 }}>
                     <Card hover className="overflow-visible">
                       <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                          <div className="flex-1 space-y-2">
                             <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{gig.title}</h3>
                                <Badge variant={gig.status === 'open' ? 'success' : 'warning'} className="capitalize">{gig.status}</Badge>
                             </div>
                             <p className="text-slate-500 text-sm">Skills: {gig.skills_required?.slice(0, 3).join(', ')} • {formatCurrency(gig.budget)} • Posted {formatDate(gig.created_at)}</p>
                          </div>
                          <div className="flex items-center gap-6">
                             <div className="text-center">
                                <span className="block text-xl font-bold text-slate-900">--</span>
                                <span className="text-xs text-slate-500 font-medium">Proposals</span>
                             </div>
                             <div className="w-px h-10 bg-border hidden md:block"></div>
                             <div className="flex gap-2">
                                <Button 
                                  variant="outline"
                                  onClick={() => navigate(`/dashboard/client/gigs/${gig.id}/proposals`)}
                                >
                                  Manage
                                </Button>
                                <Button variant="ghost" size="icon"><MoreHorizontal size={20} /></Button>
                             </div>
                          </div>
                       </CardContent>
                     </Card>
                  </motion.div>
               ))}
            </AnimatePresence>
         )}
      </div>

      <PostGigModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchMyGigs}
      />
    </div>
  );
}
