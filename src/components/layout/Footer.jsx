import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-white">
                <span className="font-bold text-sm leading-none">G</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">GigSphere</span>
            </div>
            <p className="text-sm text-slate-500">The premier AI-powered marketplace for top-tier freelance talent.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Writing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI & Machine Learning</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">About</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-500">© 2026 GigSphere Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-slate-600">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-slate-600">LinkedIn</a>
            <a href="#" className="text-slate-400 hover:text-slate-600">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
