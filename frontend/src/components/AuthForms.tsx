import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flower2 as Spa } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface FormProps {
  onSwitch: () => void;
  onSuccess: () => void;
}

export const LoginForm = ({ onSwitch, onSuccess }: FormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        login(data, data.token);
        onSuccess();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface biophilic-gradient">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20 w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Spa className="mx-auto text-primary" size={48} />
          <h1 className="text-3xl font-black text-on-surface">Welcome Back</h1>
          <p className="text-on-surface-variant font-medium">Continue your journey to inner peace.</p>
        </div>
        {error && <p className="text-error text-sm font-bold bg-error/10 p-3 rounded-xl text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary shadow-inner" />
          <input required type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary shadow-inner" />
          <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Sign In</button>
        </form>
        <p className="text-center text-on-surface-variant text-sm font-medium">
          Don't have an account? <button onClick={onSwitch} className="text-primary font-bold hover:underline">Register</button>
        </p>
      </motion.div>
    </div>
  );
};

export const RegisterForm = ({ onSwitch, onSuccess }: FormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        login(data, data.token);
        onSuccess();
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Connection error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-surface biophilic-gradient">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl border border-white/20 w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Spa className="mx-auto text-primary" size={48} />
          <h1 className="text-3xl font-black text-on-surface">Begin Journey</h1>
          <p className="text-on-surface-variant font-medium">Create your sanctuary profile.</p>
        </div>
        {error && <p className="text-error text-sm font-bold bg-error/10 p-3 rounded-xl text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary shadow-inner" />
          <input required type="email" placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full p-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary shadow-inner" />
          <input required type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full p-4 rounded-2xl bg-surface-container-low border-none focus:ring-2 focus:ring-primary shadow-inner" />
          <button type="submit" className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">Create Account</button>
        </form>
        <p className="text-center text-on-surface-variant text-sm font-medium">
          Already have an account? <button onClick={onSwitch} className="text-primary font-bold hover:underline">Sign In</button>
        </p>
      </motion.div>
    </div>
  );
};
