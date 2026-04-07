import React, { useState } from 'react';
import { X, Briefcase, DollarSign, Calendar, List, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { apiFetch } from '../../lib/api';

export default function PostGigModal({ isOpen, onClose, onRefresh }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    skills_required: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const skills = formData.skills_required.split(',').map(s => s.trim()).filter(s => s !== '');

    try {
      if (!formData.deadline) throw new Error('Please select a deadline date');
      
      const payload = {
        title: formData.title,
        description: formData.description,
        budget: parseFloat(formData.budget),
        deadline: formData.deadline,
        skills_required: skills
      };

      await apiFetch('/gigs', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      
      // Reset form on success
      setFormData({
        title: '',
        description: '',
        budget: '',
        deadline: '',
        skills_required: ''
      });
      
      onRefresh();
      onClose();
    } catch (err) {
      console.error('Post Gig Error:', err);
      // Ensure error is a string for UI rendering
      setError(typeof err === 'string' ? err : err.message || 'Something went wrong while posting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-[2rem] shadow-float w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="px-8 py-6 border-b border-border flex justify-between items-center bg-slate-50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Post a new project</h2>
                <p className="text-sm text-slate-500 mt-1">Fill in the details to find the best talent.</p>
              </div>
              <button 
                onClick={onClose} 
                className="text-slate-400 hover:text-slate-700 transition-colors bg-white w-10 h-10 rounded-full flex items-center justify-center border border-border shadow-sm hover:shadow-md"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
              <div className="p-8 space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium border border-red-100">
                    <AlertCircle size={20} /> {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Project Title</label>
                    <Input 
                      required
                      placeholder="e.g. Build a modern landing page for my SaaS" 
                      icon={Briefcase}
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Project Description</label>
                    <textarea 
                      required
                      className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 min-h-[150px] resize-y" 
                      placeholder="Describe the scope, goals, and technical requirements..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Budget ($)</label>
                      <Input 
                        required
                        type="number" 
                        placeholder="e.g. 1500" 
                        icon={DollarSign}
                        value={formData.budget}
                        onChange={e => setFormData({...formData, budget: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Deadline</label>
                      <Input 
                        required
                        type="date" 
                        icon={Calendar}
                        value={formData.deadline}
                        onChange={e => setFormData({...formData, deadline: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Skills Required (comma separated)</label>
                    <Input 
                      required
                      placeholder="e.g. React, Node.js, Tailwind CSS" 
                      icon={List}
                      value={formData.skills_required}
                      onChange={e => setFormData({...formData, skills_required: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 border-t border-border bg-slate-50 flex justify-end gap-3 mt-auto">
                <Button type="button" variant="outline" size="lg" onClick={onClose}>Cancel</Button>
                <Button type="submit" size="lg" className="min-w-[160px] text-white" isLoading={loading}>
                  Post Project
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
