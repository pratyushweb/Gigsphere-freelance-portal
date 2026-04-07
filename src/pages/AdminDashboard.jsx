import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Users, LayoutDashboard, DollarSign, AlertTriangle, ShieldCheck } from 'lucide-react';

const sparklineData = [
  { value: 10 }, { value: 15 }, { value: 8 }, { value: 20 }, { value: 25 }, { value: 18 }, { value: 30 }
];

const MetricCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-sm text-muted font-medium mb-1">{title}</h4>
        <h2 className="text-2xl font-black">{value}</h2>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="h-12 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={sparklineData}>
          <Area type="monotone" dataKey="value" stroke="currentColor" fill="currentColor" fillOpacity={0.1} strokeWidth={2} className="text-primary" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
      
      {/* Header & Status Indicator */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black">Admin Overview</h1>
          <p className="text-muted">Platform health and high-level metrics</p>
        </div>
        <div className="bg-green-50 border border-green-100 px-4 py-2 rounded-full flex items-center gap-2">
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
           </span>
           <span className="text-xs font-bold text-green-700">All Systems Operational</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total Users" value="12,450" icon={Users} color="bg-blue-50 text-blue-600" />
        <MetricCard title="Active Gigs" value="1,204" icon={LayoutDashboard} color="bg-indigo-50 text-indigo-600" />
        <MetricCard title="30-day Revenue" value="$450k" icon={DollarSign} color="bg-green-50 text-green-600" />
        <MetricCard title="Active Disputes" value="3" icon={AlertTriangle} color="bg-red-50 text-red-600" />
      </div>

      {/* Data Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
           <h3 className="font-bold">Recent Signups</h3>
           <button className="text-sm text-primary font-medium hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-sm">
                <th className="p-4 font-bold text-muted">User</th>
                <th className="p-4 font-bold text-muted">Role</th>
                <th className="p-4 font-bold text-muted">Joined</th>
                <th className="p-4 font-bold text-muted">Status</th>
                <th className="p-4 font-bold text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Sarah Jenkins', email: 'sarah@lextech.com', role: 'Client', status: 'Active' },
                { name: 'Alex Morgan', email: 'alex@ai.dev', role: 'Freelancer', status: 'Active' },
                { name: 'Unknown User', email: 'spammer@bot.net', role: 'Freelancer', status: 'Flagged' },
              ].map((user, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                  <td className="p-4">
                    <div className="font-bold text-sm">{user.name}</div>
                    <div className="text-xs text-muted">{user.email}</div>
                  </td>
                  <td className="p-4 text-sm font-medium">{user.role}</td>
                  <td className="p-4 text-sm text-muted">Just now</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {user.status === 'Flagged' ? (
                       <button onClick={() => setShowModal(true)} className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                         Suspend User
                       </button>
                    ) : (
                       <button className="text-xs font-bold text-muted hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                         View Profile
                       </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold mb-2">Suspend User?</h2>
            <p className="text-muted text-sm mb-6">Are you sure you want to suspend this user? They will immediately lose access to the platform.</p>
            <div className="flex gap-4">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl shadow-md shadow-red-500/20 transition-all">Suspend</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
