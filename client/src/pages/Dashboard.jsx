import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Bookmark,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
  Calendar,
  DollarSign,
  Briefcase,
  MapPin,
  RefreshCw,
  ExternalLink,
  Trash2
} from 'lucide-react';

const Dashboard = ({ setActiveTab, onSelectScheme }) => {
  const { user, refreshUser, toggleSaveScheme } = useAuth();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Fetch prediction history for this user
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('/api/predict/history');
        if (res.data.success) {
          setHistory(res.data.history);
        }
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setLoadingHistory(false);
      }
    };

    if (user?._id) {
      fetchHistory();
    }
  }, [user?._id]);

  if (!user) {
    return (
      <div className="p-12 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Authentication Required
        </h2>
        <p className="text-xs text-slate-500">
          Please sign in to view your beneficiary dashboard, saved schemes, and prediction history.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4 max-w-7xl mx-auto">
      
      {/* User Profile Card */}
      <div className="p-6 rounded-2xl border-2 border-[#ffb0e7] bg-white dark:bg-[#121824] shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#94ffdb] border-2 border-[#ffb0e7] text-slate-950 font-black text-xl flex items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {user.name}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 flex-wrap">
                <span>{user.email}</span>
                <span>•</span>
                <span className="text-teal-700 dark:text-[#94ffdb] font-semibold">MongoDB: users collection</span>
                {user.lastLogin && (
                  <>
                    <span>•</span>
                    <span>Last Login: {new Date(user.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#94ffdb]/30 text-teal-950 dark:text-[#94ffdb] text-xs font-bold border border-[#ffb0e7]">
              {user.caste} Category
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium border border-[#ffb0e7]">
              {user.gender}
            </span>
          </div>
        </div>

        {/* Demographics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Annual Income</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              ₹{Number(user.annualIncome || 0).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Age</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {user.age || 28} Years
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">State</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {user.state || 'Gujarat'}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Occupation</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white truncate block">
              {user.occupation || 'Entrepreneur'}
            </span>
          </div>
        </div>
      </div>

      {/* Bookmarked / Saved Schemes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-teal-700 dark:text-[#94ffdb]" />
              <span>Saved Government Schemes ({user.savedSchemes?.length || 0})</span>
            </h2>
            <p className="text-xs text-slate-500">
              Programs you marked for further review and application preparation.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('schemes')}
            className="text-xs font-semibold text-teal-700 dark:text-[#94ffdb] hover:underline"
          >
            Explore more schemes
          </button>
        </div>

        {(!user.savedSchemes || user.savedSchemes.length === 0) ? (
          <div className="p-8 rounded-2xl border-2 border-dashed border-[#ffb0e7] bg-white dark:bg-[#121824] text-center text-xs text-slate-500">
            No bookmarked schemes yet. Browse the catalog to save relevant programs.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.savedSchemes.map((scheme) => (
              <div
                key={scheme._id}
                className="p-4 rounded-xl bg-white dark:bg-[#121824] border border-[#ffb0e7] hover:border-[#94ffdb] transition-all shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#94ffdb]/30 text-teal-950 dark:text-[#94ffdb] border border-[#ffb0e7]">
                      {scheme.code}
                    </span>
                    <span className="text-xs font-bold text-teal-700 dark:text-[#94ffdb]">
                      {scheme.interestRate}% p.a.
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                    {scheme.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {scheme.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => toggleSaveScheme(scheme._id)}
                    className="p-1.5 rounded-lg border border-[#ffb0e7] text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectScheme) onSelectScheme(scheme._id);
                      setActiveTab('schemes');
                    }}
                    className="btn-action flex-1 py-1.5 px-2.5 rounded-lg text-xs text-center shadow-sm"
                  >
                    View Guidelines
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Prediction History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-700 dark:text-[#94ffdb]" />
              <span>Previous AI Predictor Runs ({history.length})</span>
            </h2>
            <p className="text-xs text-slate-500">
              Historical simulated underwriting evaluations.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('predictor')}
            className="btn-action px-3.5 py-1.5 rounded-xl text-xs shadow-sm"
          >
            New Evaluation
          </button>
        </div>

        {loadingHistory ? (
          <div className="text-xs text-slate-500 py-4">Loading past evaluations...</div>
        ) : history.length === 0 ? (
          <div className="p-8 rounded-2xl border-2 border-dashed border-[#ffb0e7] bg-white dark:bg-[#121824] text-center text-xs text-slate-500">
            No prediction runs recorded yet. Use the AI Predictor to generate your first assessment.
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item._id}
                className="p-4 rounded-xl bg-white dark:bg-[#121824] border border-[#ffb0e7] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold text-teal-700 dark:text-[#94ffdb]">
                      {item.approval_probability}% Probability
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-[#ffb0e7]">
                      {item.risk_tier}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Loan Amount: ₹{Number(item.applicantProfile?.loan_amount || 0).toLocaleString('en-IN')} • Income: ₹{Number(item.applicantProfile?.annual_income || 0).toLocaleString('en-IN')} • DTI: {item.dti_ratio}x
                  </p>

                  <div className="text-[11px] text-teal-700 dark:text-[#94ffdb] font-medium pt-0.5">
                    Matched {item.matchedSchemes?.length || 0} schemes ({item.matchedSchemes?.map(m => m.code).join(', ')})
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('predictor')}
                  className="btn-action px-3 py-1.5 rounded-lg text-xs whitespace-nowrap"
                >
                  Run Similar Run
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
