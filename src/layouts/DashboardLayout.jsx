import React, { useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, MessageSquare, User, Settings, LogOut, FileText } from 'lucide-react';
import { Avatar } from '../components/ui/Avatar';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get user from localStorage
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const isClient = user.role === 'client';

  const navItems = isClient ? [
    { name: 'Dashboard', path: '/dashboard/client', icon: LayoutDashboard },
    { name: 'Messages', path: '/dashboard/chat', icon: MessageSquare },
  ] : [
    { name: 'Dashboard', path: '/dashboard/freelancer', icon: LayoutDashboard },
    { name: 'Messages', path: '/dashboard/chat', icon: MessageSquare },
    { name: 'Public Profile', path: '/profile/freelancer', icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-white shadow-soft">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white">
              <span className="font-bold text-lg leading-none">G</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">GigSphere</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard/chat' && location.pathname.startsWith(item.path + '/'));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors relative',
                  isActive ? 'text-primary bg-primary/5' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                {isActive && (
                  <motion.div layoutId="sidebar-active" className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-primary" />
                )}
                <item.icon className={cn('h-5 w-5', isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600')} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="px-4 py-4">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-xl p-3 bg-slate-50">
            <Avatar alt={user.full_name} fallback={user.full_name?.charAt(0)} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold truncate max-w-[120px]">{user.full_name}</span>
              <span className="text-xs text-muted capitalize">{user.role}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/80 px-4 sm:px-6 md:hidden backdrop-blur-md">
           <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white">
              <span className="font-bold text-lg leading-none">G</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
             <button onClick={handleLogout} className="text-red-500 p-2"><LogOut size={20} /></button>
             <Avatar alt={user.full_name} fallback={user.full_name?.charAt(0)} size="sm" />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
