import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Briefcase, CreditCard, Star, TrendingUp, Bell } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const data = [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 3000 },
  { name: 'Mar', earnings: 5000 },
  { name: 'Apr', earnings: 4500 },
  { name: 'May', earnings: 6000 },
  { name: 'Jun', earnings: 5500 },
  { name: 'Jul', earnings: 7000 },
];

const MetricCard = ({ title, value, icon: Icon, trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-36"
  >
    <div className="flex justify-between items-start">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <Badge variant="success" className="bg-green-100 text-green-700">{trend}</Badge>
    </div>
    <div>
      <h4 className="text-sm text-muted font-medium mb-1">{title}</h4>
      <h2 className="text-2xl font-black">{value}</h2>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const userStr = localStorage.getItem('gigsphere_user');
  const user = userStr ? JSON.parse(userStr) : { name: 'Alex Morgan', avatar: 'https://i.pravatar.cc/150?u=12' };
  const firstName = user.name.split(' ')[0] || 'User';

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-28 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden mb-3">
              <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h3 className="font-bold">{user.name}</h3>
            <p className="text-xs text-muted">Generative AI Engineer</p>
          </div>
          <nav className="p-4 flex flex-col gap-2">
            {['Overview', 'Active Contracts', 'Earnings', 'Messages', 'Settings'].map((item, i) => (
              <button key={item} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${i === 0 ? 'bg-primary/10 text-primary border-l-4 border-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-textMain'}`}>
                {item}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
           <h1 className="text-2xl font-black">Welcome back, {firstName}!</h1>
           <div className="relative cursor-pointer">
             <Bell className="w-6 h-6 text-muted hover:text-primary transition-colors" />
             <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-surface"></span>
           </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard title="Total Earnings" value="$35,000" icon={CreditCard} trend="+12%" />
          <MetricCard title="Active Contracts" value="4" icon={Briefcase} trend="+1" />
          <MetricCard title="Active Proposals" value="12" icon={TrendingUp} trend="High Match" />
          <MetricCard title="Success Score" value="99%" icon={Star} trend="Top Rated" />
        </div>

        {/* Chart & Active Contracts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-lg mb-6">Earnings Overview</h3>
             <div className="h-72">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                   <defs>
                     <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#5B4FE9" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#5B4FE9" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9691A4' }} />
                   <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9691A4' }} tickFormatter={(value) => `$${value}`} />
                   <Tooltip 
                     contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                     formatter={(value) => [`$${value}`, "Earnings"]}
                   />
                   <Area type="monotone" dataKey="earnings" stroke="#5B4FE9" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </div>

          {/* Contracts List */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <h3 className="font-bold text-lg mb-6">Active Contracts</h3>
            <div className="space-y-4">
               {[
                 { client: 'LexTech Inc.', task: 'LLaMA Fine-tuning', amount: '$5,000', status: 'In Progress' },
                 { client: 'ManuAI', task: 'CV Defect Model', amount: '$8,000', status: 'In Review' },
                 { client: 'StartupX', task: 'RAG Pipeline Demo', amount: '$2,500', status: 'Action Needed' }
               ].map((c, i) => (
                 <div key={i} className="flex flex-col gap-2 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                   <div className="flex justify-between items-start">
                     <h4 className="font-bold text-sm">{c.task}</h4>
                     <Badge variant={c.status === 'In Progress' ? 'success' : c.status === 'In Review' ? 'warning' : 'danger'}>{c.status}</Badge>
                   </div>
                   <div className="flex justify-between items-center text-xs text-muted">
                     <span>{c.client}</span>
                     <span className="font-bold text-textMain">{c.amount}</span>
                   </div>
                 </div>
               ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="ghost" size="sm" className="w-full text-primary">View All Contracts</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
