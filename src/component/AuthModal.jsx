import React, { useState } from 'react';
import { Mail, Lock, User, Image as ImageIcon, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AuthScreen({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [pfpUrl, setPfpUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    // Fallback if Supabase is not configured
    if (!supabase) {
      onLoginSuccess({
        id: 'local-user',
        email: email || 'student@studyflow.app',
        user_metadata: {
          full_name: fullName || email.split('@')[0] || 'Study User',
          avatar_url: pfpUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        },
      });
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName || 'Student',
              avatar_url: pfpUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
            },
          },
        });
        if (error) throw error;
        if (data?.session?.user) {
          onLoginSuccess(data.session.user);
        } else {
          alert('Account created successfully! You can now sign in.');
          setIsSignUp(false);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data?.user) {
          onLoginSuccess(data.user);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Blur Rings */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md bg-[#1A1A1E] border border-[#2A2A30] rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#FF6B00]/10 text-[#FF6B00] mb-3">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome to Syncademics</h1>
          <p className="text-xs text-gray-400 mt-1">Please sign in to access your study planner</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Full Name / Username</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#0F0F10] border border-[#2A2A30] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="Alex Smith"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Profile Picture URL (PFP)</label>
                <div className="relative">
                  <ImageIcon className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                  <input
                    type="url"
                    value={pfpUrl}
                    onChange={(e) => setPfpUrl(e.target.value)}
                    className="w-full bg-[#0F0F10] border border-[#2A2A30] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs text-gray-400 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0F0F10] border border-[#2A2A30] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                placeholder="student@university.edu"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0F0F10] border border-[#2A2A30] rounded-xl pl-9 pr-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6B00]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6B00] text-white py-3 rounded-xl font-semibold hover:bg-[#FF6B00]/90 transition flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/20 cursor-pointer"
          >
            {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-[#FF6B00] hover:underline cursor-pointer"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}