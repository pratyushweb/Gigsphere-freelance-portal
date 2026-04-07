import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

const steps = [
  { id: 1, title: 'Basics' },
  { id: 2, title: 'Details' },
  { id: 3, title: 'Budget' },
];

const PostGig = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: 500,
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length + 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
      {/* Form Area */}
      <div className="flex-1">
        <h1 className="text-3xl font-black mb-8">Post a New Gig</h1>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
          <motion.div 
            className="absolute left-0 top-1/2 h-0.5 bg-primary -z-10"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-surface px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${currentStep >= step.id ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-200 text-gray-500'}`}>
                {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span className={`text-xs font-semibold ${currentStep >= step.id ? 'text-primary' : 'text-gray-400'}`}>{step.title}</span>
            </div>
          ))}
        </div>

        {/* Steps Content */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm min-h-[350px]">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold mb-2">Project Title</label>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Build a highly converted landing page" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold mb-2 flex items-center justify-between">
                    Project Description
                    <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                      <Sparkles className="w-3 h-3" /> Enhance with AI
                    </button>
                  </label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Describe what you need done..." 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold mb-2">Budget Setup ${formData.budget}</label>
                  <input 
                    type="range" 
                    name="budget"
                    min="100"
                    max="10000"
                    step="100"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted">
                    <span>$100</span>
                    <span>$10,000+</span>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center text-center py-10"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                  <Check className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Gig Posted Successfully!</h2>
                <p className="text-muted">Our AI is currently matching your gig with the top 1% of freelancers. You'll be notified soon.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={prevStep} disabled={currentStep === 1}>
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <Button onClick={nextStep}>
              {currentStep === steps.length ? 'Post Gig' : 'Continue'} <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>

      {/* Live Preview Sidebar */}
      <div className="w-full md:w-80 flex-shrink-0">
        <h3 className="font-bold text-lg mb-4 text-gray-400">Live Preview</h3>
        <div className="bg-white rounded-[20px] p-6 border border-gray-100 shadow-xl shadow-primary/5 pointer-events-none sticky top-28">
           <div className="flex justify-between items-start mb-4">
             <div className="bg-secondary/10 text-secondary text-xs font-bold px-2 py-1 rounded-full">${formData.budget}</div>
           </div>
           <h3 className="font-bold text-lg mb-2 line-clamp-2">{formData.title || 'Your Project Title'}</h3>
           <p className="text-muted text-sm line-clamp-3 mb-6">
             {formData.description || 'Your project description will appear here...'}
           </p>
        </div>
      </div>
    </div>
  );
};

export default PostGig;
