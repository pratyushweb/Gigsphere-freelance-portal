import React from 'react';
import { Users, Briefcase, DollarSign, Activity, AlertCircle, Search } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { adminStats } from '../../data/dummy';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl space-y-8">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
               <h1 className="text-3xl font-extrabold text-slate-900">Platform Overview</h1>
               <p className="text-slate-500 text-sm mt-1">Admin control panel and system metrics.</p>
            </div>
            <div className="flex items-center gap-3">
               <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> System Healthy
               </span>
            </div>
         </div>

         {/* KPI Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-float bg-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5"><Users size={80} /></div>
               <CardContent className="p-6 relative z-10">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Users</p>
                  <h3 className="text-4xl font-extrabold text-slate-900 mb-2">{adminStats.totalUsers.toLocaleString()}</h3>
                  <div className="flex items-center gap-2 text-sm">
                     <Badge variant="success" className="bg-emerald-100 text-emerald-700 border-0">+12%</Badge>
                     <span className="text-slate-400">vs last month</span>
                  </div>
               </CardContent>
            </Card>
            <Card className="border-0 shadow-float bg-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-5"><Briefcase size={80} /></div>
               <CardContent className="p-6 relative z-10">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Active Gigs</p>
                  <h3 className="text-4xl font-extrabold text-slate-900 mb-2">{adminStats.totalGigs.toLocaleString()}</h3>
                  <div className="flex items-center gap-2 text-sm">
                     <Badge variant="success" className="bg-emerald-100 text-emerald-700 border-0">+5.4%</Badge>
                     <span className="text-slate-400">vs last month</span>
                  </div>
               </CardContent>
            </Card>
            <Card className="border-0 shadow-[0_0_20px_rgba(79,70,229,0.15)] bg-gradient-to-br from-primary to-primary-hover text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10"><DollarSign size={80} /></div>
               <CardContent className="p-6 relative z-10">
                  <p className="text-sm font-semibold text-primary-light uppercase tracking-wider mb-2">Monthly Revenue</p>
                  <h3 className="text-4xl font-extrabold text-white mb-2">{adminStats.revenue}</h3>
                  <div className="flex items-center gap-2 text-sm">
                     <Badge className="bg-white/20 text-white border-0 hover:bg-white/30">+18%</Badge>
                     <span className="text-primary-light">vs last month</span>
                  </div>
               </CardContent>
            </Card>
         </div>

         {/* User Management Section */}
         <Card className="border-0 shadow-soft hidden md:block">
            <CardContent className="p-0">
               <div className="p-6 border-b border-border flex justify-between items-center">
                  <h2 className="text-xl font-bold text-slate-900">User Management</h2>
                  <div className="w-64">
                     <Input icon={Search} placeholder="Search users by name or email..." className="h-9 text-sm" />
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-slate-50 border-b border-border text-xs uppercase tracking-wider text-slate-500 font-bold">
                           <th className="p-4 pl-6">User</th>
                           <th className="p-4">Role</th>
                           <th className="p-4">Status</th>
                           <th className="p-4">Joined Date</th>
                           <th className="p-4 pr-6 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border">
                        {[
                           { name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'Freelancer', status: 'Active', date: 'Oct 24, 2023' },
                           { name: 'TechNova Inc.', email: 'admin@technova.io', role: 'Client', status: 'Active', date: 'Nov 02, 2023' },
                           { name: 'Marcus Dubois', email: 'marcus.d@example.com', role: 'Freelancer', status: 'Suspended', date: 'Sep 15, 2023' }
                        ].map((user, i) => (
                           <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4 pl-6">
                                 <div className="flex flex-col">
                                    <span className="font-bold text-slate-900">{user.name}</span>
                                    <span className="text-xs text-slate-500">{user.email}</span>
                                 </div>
                              </td>
                              <td className="p-4"><span className="text-sm font-medium text-slate-700">{user.role}</span></td>
                              <td className="p-4">
                                 <Badge variant={user.status === 'Active' ? 'success' : 'danger'} className="text-[10px]">
                                    {user.status}
                                 </Badge>
                              </td>
                              <td className="p-4 text-sm text-slate-500">{user.date}</td>
                              <td className="p-4 pr-6 text-right">
                                 <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/5">View</Button>
                                    {user.status === 'Active' ? (
                                       <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">Suspend</Button>
                                    ) : (
                                       <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">Activate</Button>
                                    )}
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
