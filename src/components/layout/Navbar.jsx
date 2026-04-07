import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-white">
              <span className="font-bold text-lg leading-none">G</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">GigSphere</span>
          </Link>
          <nav className="hidden md:ml-10 md:flex md:gap-6">
            <Link to="/gigs" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Find Gigs</Link>
            <Link to="/freelancers" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Find Talent</Link>
            <Link to="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">How it Works</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">Log in</Link>
          <Button onClick={() => navigate('/register')}>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
