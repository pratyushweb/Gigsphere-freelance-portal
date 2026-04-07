import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function RegisterForm() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'client'; // defaulting to client if missing
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, role })
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = 'Registration failed';
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          errorMessage = data.errors[0].msg; // From express-validator
        } else if (data.error) {
          if (typeof data.error === 'string') {
            errorMessage = data.error; // Custom string errors
          } else if (data.error.message) {
            errorMessage = data.error.message; // Global error handler objects
          }
        }
        throw new Error(errorMessage);
      }

      // Save token locally
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Navigate to correct dashboard
      navigate(`/dashboard/${data.user.role}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl z-0"></div>

      <Card className="max-w-md w-full space-y-8 p-10 relative z-10 border-0 shadow-float">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
            Create an Account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Joining as a <span className="font-bold text-primary capitalize">{role}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl border border-red-200 text-sm font-medium">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <Input 
                 icon={User} 
                 type="text" 
                 placeholder="John Doe" 
                 required 
                 value={formData.full_name}
                 onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <Input 
                 icon={Mail} 
                 type="email" 
                 placeholder="you@example.com" 
                 required 
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
               <div className="relative">
                  <Input 
                    icon={Lock} 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="••••••••" 
                    required 
                    minLength={6}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-slate-700">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
               </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" isLoading={loading}>
            Create Account
          </Button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
