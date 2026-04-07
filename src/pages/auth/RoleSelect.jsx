import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase, User } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function RoleSelect() {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      navigate('/register/details?role=' + selectedRole);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
       <div className="max-w-2xl w-full text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Join as a client or freelancer</h2>
          <p className="text-slate-500 mb-10">Select how you want to use GigSphere today.</p>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card 
                  className={`p-8 h-full cursor-pointer border-2 transition-all ${selectedRole === 'client' ? 'border-primary ring-4 ring-primary/10' : 'border-border'}`}
                  onClick={() => setSelectedRole('client')}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User size={24} />
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedRole === 'client' ? 'border-primary bg-primary' : 'border-slate-300'}`}>
                      {selectedRole === 'client' && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                  <h3 className="text-left text-xl font-semibold text-slate-900 mb-2">I'm a client, hiring for a project</h3>
                </Card>
             </motion.div>
             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card 
                  className={`p-8 h-full cursor-pointer border-2 transition-all ${selectedRole === 'freelancer' ? 'border-primary ring-4 ring-primary/10' : 'border-border'}`}
                  onClick={() => setSelectedRole('freelancer')}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Briefcase size={24} />
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedRole === 'freelancer' ? 'border-primary bg-primary' : 'border-slate-300'}`}>
                      {selectedRole === 'freelancer' && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                  <h3 className="text-left text-xl font-semibold text-slate-900 mb-2">I'm a freelancer, looking for work</h3>
                </Card>
             </motion.div>
          </div>

          <Button 
            size="lg" 
            className="w-full sm:w-auto min-w-[200px]" 
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            {selectedRole ? `Join as a ${selectedRole}` : 'Create Account'}
          </Button>
          <p className="mt-6 text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
          </p>
       </div>
    </div>
  );
}
