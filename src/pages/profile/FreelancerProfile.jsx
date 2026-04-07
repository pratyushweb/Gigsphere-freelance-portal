import React, { useState, useEffect } from 'react';
import { MapPin, Globe, Clock, Star, Award, CheckCircle, Loader2, Save, X, Edit2 } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import { apiFetch } from '../../lib/api';

export default function FreelancerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    bio: '',
    skills: []
  });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await apiFetch(`/users/profile`);
      setProfile(data);
      setEditForm({
        full_name: data.full_name,
        bio: data.bio || '',
        skills: data.skills || []
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updated = await apiFetch('/users/update', {
        method: 'POST',
        body: JSON.stringify(editForm)
      });
      setProfile(updated);
      setIsEditing(false);
      // Update basic user info in local storage too
      localStorage.setItem('user', JSON.stringify({ ...user, full_name: updated.full_name }));
    } catch (err) {
      alert('Failed to update: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 size={40} className="animate-spin text-primary" />
        <p className="mt-4 text-slate-500 font-medium">Crunching your profile data...</p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-0 mb-20 animate-in fade-in duration-500">
      {/* Cover Banner */}
      <div className="h-48 w-full bg-gradient-to-r from-primary to-secondary rounded-3xl mb-8 relative shadow-soft overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute -bottom-16 left-8 bg-white p-2 rounded-3xl shadow-float z-10">
            <Avatar fallback={profile.full_name?.charAt(0)} size="xl" className="rounded-2xl border-4 border-white h-32 w-32" />
         </div>
         <div className="absolute top-6 right-6 z-10">
            {!isEditing ? (
               <Button 
                variant="secondary" 
                className="bg-white/20 text-white hover:bg-white/40 backdrop-blur-md border-0"
                onClick={() => setIsEditing(true)}
               >
                  <Edit2 size={16} className="mr-2" /> Edit Profile
               </Button>
            ) : (
                <div className="flex gap-2">
                   <Button variant="outline" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-white/20" onClick={() => setIsEditing(false)}><X size={16} /></Button>
                   <Button variant="secondary" size="sm" onClick={handleUpdate} isLoading={loading} className="bg-white text-primary hover:bg-slate-50"><Save size={16} className="mr-2" /> Save</Button>
                </div>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-20">
         {/* Left Column (Info) */}
         <div className="space-y-8">
            <div className="space-y-4">
               {isEditing ? (
                  <div className="space-y-4 animate-in slide-in-from-left-4">
                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                     <Input 
                       value={editForm.full_name} 
                       onChange={e => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                       className="text-lg font-bold h-12"
                     />
                  </div>
               ) : (
                  <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">{profile.full_name}</h1>
                    <p className="text-lg text-slate-500 mt-1 font-semibold flex items-center gap-2">
                       {profile.role?.charAt(0).toUpperCase() + profile.role?.slice(1)} • Senior Level
                    </p>
                  </div>
               )}
               
               <div className="flex items-center gap-4 text-sm text-slate-400 font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5"><MapPin size={14} className="text-primary" /> Hybrid</div>
                  <div className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> Available Now</div>
               </div>
            </div>

            <div className="flex gap-4 items-center p-6 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner-soft">
               <div className="text-center flex-1 border-r border-slate-200">
                  <div className="flex items-center justify-center text-amber-500 gap-1 mb-1">
                     <Star size={16} className="fill-current" />
                     <span className="font-black text-xl text-slate-900">{profile.avg_rating || '5.0'}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Rating</span>
               </div>
               <div className="text-center flex-1">
                  <h3 className="font-black text-xl text-slate-900 mb-1">0</h3>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Jobs Done</span>
               </div>
            </div>

            <div className="pt-2">
               <h3 className="font-black text-slate-900 mb-4 uppercase text-xs tracking-[0.2em]">Skills & Expertise</h3>
               <div className="flex flex-wrap gap-2">
                  {isEditing ? (
                     <textarea 
                       className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:ring-4 focus:ring-primary/10 transition-all focus:outline-none"
                       placeholder="Enter skills separated by commas (e.g. React, Node, AWS)"
                       rows="3"
                       value={editForm.skills.join(', ')}
                       onChange={e => setEditForm(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()) }))}
                     />
                  ) : (
                    profile.skills?.length > 0 ? profile.skills.map(skill => (
                      <Badge key={skill} variant="outline" className="px-3 py-2 text-xs font-bold bg-white text-slate-700 h-9 rounded-xl shadow-sm">{skill}</Badge>
                    )) : <p className="text-slate-400 text-sm">No skills added yet.</p>
                  )}
               </div>
            </div>
         </div>

         {/* Right Column (Content) */}
         <div className="lg:col-span-2 space-y-10">
            <Card className="border-0 shadow-float rounded-[2rem] overflow-hidden">
               <CardContent className="p-10 bg-white">
                  <h3 className="font-black text-2xl text-slate-900 mb-6 tracking-tight">Personal Bio</h3>
                  {isEditing ? (
                     <textarea 
                       className="w-full bg-slate-50 border-0 rounded-2xl p-6 text-slate-600 leading-relaxed focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all outline-none text-base min-h-[200px]"
                       placeholder="Tell your story. What makes you exceptional?"
                       value={editForm.bio}
                       onChange={e => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                     />
                  ) : (
                     <p className="text-slate-500 text-lg leading-[1.8] whitespace-pre-wrap font-medium">
                        {profile.bio || "This expert hasn't written their bio yet. Let's start with a friendly 'Hello' to learn more about their journey!"}
                     </p>
                  )}
               </CardContent>
            </Card>

            <div className="pt-4">
               <h3 className="font-black text-2xl text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
                  <Award size={24} className="text-primary" /> Verified Experience
               </h3>
               <div className="grid sm:grid-cols-2 gap-8">
                  {[1, 2].map((i) => (
                     <div key={i} className="group rounded-[2.5rem] p-4 bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-float transition-all duration-300">
                        <div className="h-44 bg-slate-100 rounded-[2rem] flex items-center justify-center p-6 mb-6">
                           <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden relative">
                              <div className="absolute top-0 w-full h-4 bg-slate-200 border-b border-slate-300"></div>
                              <div className="p-5 pt-8 space-y-3">
                                 <div className="w-2/3 h-2 bg-slate-100 rounded-full"></div>
                                 <div className="w-1/2 h-2 bg-slate-100 rounded-full"></div>
                                 <div className="w-3/4 h-2 bg-slate-100 rounded-full"></div>
                              </div>
                           </div>
                        </div>
                        <div className="px-4 pb-4 text-center">
                           <h4 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors">Portfolio Project {i}</h4>
                           <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Case Study</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
