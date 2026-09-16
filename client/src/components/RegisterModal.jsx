import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, UserPlus, IndianRupee, Calendar } from 'lucide-react';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    caste: 'SC',
    gender: 'Female',
    age: 28,
    annualIncome: 240000,
    state: 'Gujarat',
    occupation: 'Micro-Enterprise / Tailoring Boutique',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#121824] rounded-2xl border-2 border-[#ffb0e7] shadow-2xl p-6 overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-teal-700 dark:text-[#94ffdb]" />
              <span>Register New Account</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Create your profile for automated concessional scheme matching
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#ffb0e7] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-xs text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="name"
                required
                placeholder="Aakash Vala"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#94ffdb]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#94ffdb]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                name="password"
                required
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#94ffdb]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Caste Category
              </label>
              <select
                name="caste"
                value={formData.caste}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#94ffdb]"
              >
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
                <option value="OBC">Other Backward Class (OBC)</option>
                <option value="EWS">Economically Weaker (EWS)</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#94ffdb]"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Age (Years)
              </label>
              <input
                type="number"
                name="age"
                min="18"
                max="70"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#94ffdb]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Annual Income (INR)
              </label>
              <input
                type="number"
                name="annualIncome"
                step="10000"
                value={formData.annualIncome}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#94ffdb]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-action w-full py-2.5 mt-2 rounded-xl text-xs shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Profile...' : 'Register Account'}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Already registered?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-bold text-teal-700 dark:text-[#94ffdb] hover:underline ml-1 cursor-pointer"
            >
              Login here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterModal;
