import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  TrendingDown,
  Percent,
  DollarSign,
  ShieldCheck,
  RefreshCw,
  Bookmark,
  ExternalLink,
  ChevronRight,
  Info,
  Layers
} from 'lucide-react';

const Predictor = ({ setActiveTab, onSelectScheme }) => {
  const { user, isSchemeSaved, toggleSaveScheme } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    age: 28,
    gender: 'Female',
    caste: 'SC',
    annual_income: 240000,
    loan_amount: 140000,
    credit_score: 720,
    prior_default: false,
    has_business_plan: true,
    experience_years: 3,
    business_type: 'Micro-Enterprise / Tailoring Boutique',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Auto-fill from user profile if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        age: user.age || prev.age,
        gender: user.gender || prev.gender,
        caste: user.caste || prev.caste,
        annual_income: user.annualIncome || prev.annual_income,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePredict = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/predict', formData);
      if (res.data.success) {
        setResult(res.data);
      }
    } catch (err) {
      console.error('Prediction request error:', err);
      setError('Unable to complete AI evaluation. Please verify your server connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-4 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl border-2 border-[#ffb0e7] bg-white dark:bg-[#121824] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-700 dark:text-[#94ffdb] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Underwriting ML Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            AI Scheme Eligibility & Loan Approval Predictor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Evaluates applicant profile against statutory lending criteria and computes approval probability with Explainable AI factors.
          </p>
        </div>

        {user && (
          <button
            onClick={() => {
              setFormData(prev => ({
                ...prev,
                age: user.age || 28,
                gender: user.gender || 'Female',
                caste: user.caste || 'SC',
                annual_income: user.annualIncome || 240000,
              }));
            }}
            className="btn-action px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Autofill Profile Data</span>
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-300 text-xs text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Main Grid: Form Left, Results Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handlePredict}
            className="p-6 rounded-2xl border-2 border-[#ffb0e7] bg-white dark:bg-[#121824] shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Applicant Demographics & Credit
              </h2>
              <span className="text-[11px] font-semibold text-teal-700 dark:text-[#94ffdb]">
                10 Underwriting Signals
              </span>
            </div>

            {/* Row 1: Caste & Gender */}
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
                  <option value="General">General Category</option>
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

            {/* Row 2: Age & Income */}
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
                  Annual Family Income (INR)
                </label>
                <input
                  type="number"
                  name="annual_income"
                  step="10000"
                  min="30000"
                  max="5000000"
                  value={formData.annual_income}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#94ffdb]"
                />
              </div>
            </div>

            {/* Row 3: Loan Amount */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Requested Loan / Project Cost (INR)
                </label>
                <span className="text-xs font-bold text-teal-700 dark:text-[#94ffdb]">
                  ₹{Number(formData.loan_amount).toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                name="loan_amount"
                min="20000"
                max="3000000"
                step="20000"
                value={formData.loan_amount}
                onChange={handleChange}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>₹20,000 (Micro)</span>
                <span>₹10,00,000 (Medium)</span>
                <span>₹30,00,000 (Large)</span>
              </div>
            </div>

            {/* Row 4: Credit Score */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Credit / CIBIL Score
                </label>
                <span className={`text-xs font-bold ${
                  formData.credit_score >= 700
                    ? 'text-teal-600 dark:text-[#94ffdb]'
                    : formData.credit_score >= 600
                    ? 'text-amber-500'
                    : 'text-red-500'
                }`}>
                  {formData.credit_score} {formData.credit_score >= 700 ? '(Prime)' : formData.credit_score >= 600 ? '(Fair)' : '(Subprime)'}
                </span>
              </div>
              <input
                type="range"
                name="credit_score"
                min="450"
                max="850"
                step="10"
                value={formData.credit_score}
                onChange={handleChange}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>450</span>
                <span>650</span>
                <span>850</span>
              </div>
            </div>

            {/* Row 5: Proposed Project Domain */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Proposed Business / Project Domain
              </label>
              <select
                name="business_type"
                value={formData.business_type}
                onChange={handleChange}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#94ffdb]"
              >
                <option value="Micro-Enterprise / Tailoring Boutique">Micro-Enterprise / Tailoring Boutique</option>
                <option value="Green Mobility / Battery E-Rickshaw">Green Mobility / Battery E-Rickshaw</option>
                <option value="Rooftop Solar & Bio-Gas Installation">Rooftop Solar & Bio-Gas Installation</option>
                <option value="Retail Kirana / Grocery Trading">Retail Kirana / Grocery Trading</option>
                <option value="Food Processing / Agro Business">Food Processing / Agro Business</option>
                <option value="Technical & Higher Professional Degree">Technical & Higher Professional Degree</option>
                <option value="Traditional Craft / Artisan Workshop">Traditional Craft / Artisan Workshop</option>
                <option value="Light Manufacturing & Assembly">Light Manufacturing & Assembly</option>
              </select>
            </div>

            {/* Row 6: Toggles & Experience */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-slate-700 dark:text-slate-300">
                  Prior Loan Default in past 3 years?
                </label>
                <input
                  type="checkbox"
                  name="prior_default"
                  checked={formData.prior_default}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-[#ffb0e7] text-teal-600 focus:ring-[#94ffdb]"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-xs text-slate-700 dark:text-slate-300">
                  Prepared Detailed Project Report (DPR)?
                </label>
                <input
                  type="checkbox"
                  name="has_business_plan"
                  checked={formData.has_business_plan}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-[#ffb0e7] text-teal-600 focus:ring-[#94ffdb]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="text-xs text-slate-700 dark:text-slate-300">
                  Experience in Selected Activity
                </label>
                <select
                  name="experience_years"
                  value={formData.experience_years}
                  onChange={handleChange}
                  className="px-2 py-1 text-xs rounded-lg border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value={0}>0 Years (New Entry)</option>
                  <option value={2}>1 - 2 Years</option>
                  <option value={5}>3 - 5 Years</option>
                  <option value={10}>5+ Years</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-action w-full py-3 rounded-xl text-xs shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Computing Random Forest Evaluation...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Evaluate Scheme Eligibility</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Prediction Results & Matches (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <>
              {/* Scorecard Overview */}
              <div className="p-6 rounded-2xl border-2 border-[#ffb0e7] bg-white dark:bg-[#121824] shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Evaluated Outcome
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      Underwriting Approval Probability
                    </h2>
                  </div>

                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                    result.risk_badge === 'success'
                      ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-[#94ffdb] border-[#94ffdb]'
                      : result.risk_badge === 'warning'
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300'
                      : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border-red-300'
                  }`}>
                    {result.risk_tier}
                  </span>
                </div>

                {/* Meter and Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  
                  {/* Gauge Graphic */}
                  <div className="sm:col-span-1 flex flex-col items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-[#ffb0e7]">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-200 dark:text-slate-800"
                          strokeWidth="3.5"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-[#94ffdb]"
                          strokeDasharray={`${result.approval_probability}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                          {result.approval_probability}%
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Likelihood</span>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Metrics */}
                  <div className="sm:col-span-2 grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Debt to Income (DTI)</span>
                      <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                        {result.dti_ratio}x
                      </div>
                      <p className="text-[10px] text-slate-500">
                        {result.dti_ratio <= 0.6 ? 'Safe repayment profile' : 'High leverage ratio'}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Model Engine</span>
                      <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                        Random Forest
                      </div>
                      <p className="text-[10px] text-teal-600 dark:text-[#94ffdb]">
                        120 Decision Estimators
                      </p>
                    </div>
                  </div>

                </div>

                {/* Explainable AI (XAI) breakdown */}
                {result.xai && (
                  <div className="space-y-3 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                      <span>Explainable AI (XAI) Underwriting Factors</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Positive Drivers */}
                      <div className="p-3 rounded-xl bg-teal-50/40 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase text-teal-800 dark:text-[#94ffdb] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Favorable Underwriting Drivers</span>
                        </span>
                        <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                          {result.xai.positive_factors.map((f, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-teal-600 font-bold">•</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Concerns & Tips */}
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-[#ffb0e7] space-y-1.5">
                        <span className="text-[10px] font-bold uppercase text-slate-700 dark:text-slate-200 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-500" />
                          <span>Advisory & Enhancement Steps</span>
                        </span>
                        <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                          {result.xai.concerning_factors.length > 0 ? (
                            result.xai.concerning_factors.map((c, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>{c}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-teal-600 dark:text-[#94ffdb]">
                              No critical risk warnings identified for this profile.
                            </li>
                          )}
                          {result.xai.actionable_tips.map((t, idx) => (
                            <li key={`tip-${idx}`} className="text-teal-700 dark:text-[#94ffdb] font-medium pt-1">
                              Tip: {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Matched Real-World Schemes */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Recommended Concessional Schemes ({result.matchedSchemes?.length || 0})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Ranked by statutory qualification and estimated annual interest savings.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('schemes')}
                    className="text-xs font-semibold text-teal-700 dark:text-[#94ffdb] hover:underline flex items-center gap-1"
                  >
                    <span>View all schemes</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {result.matchedSchemes?.map((scheme) => {
                    const saved = isSchemeSaved(scheme.schemeId);

                    return (
                      <div
                        key={scheme.schemeId}
                        className="p-4 rounded-xl bg-white dark:bg-[#121824] border border-[#ffb0e7] hover:border-[#94ffdb] transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#94ffdb]/30 text-teal-950 dark:text-[#94ffdb] border border-[#ffb0e7]">
                              {scheme.code}
                            </span>
                            <span className="text-xs text-slate-400 font-medium">
                              {scheme.category}
                            </span>
                            <span className="text-[10px] font-bold text-teal-700 dark:text-[#94ffdb] ml-auto sm:ml-0">
                              {scheme.matchScore}% Match
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {scheme.schemeName}
                          </h4>

                          <p className="text-xs text-slate-500 line-clamp-1">
                            {scheme.targetBeneficiary}
                          </p>

                          {/* Stat badges */}
                          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              Interest: <strong className="text-teal-700 dark:text-[#94ffdb]">{scheme.interestRate}% p.a.</strong>
                            </span>
                            {scheme.subsidyPercentage > 0 && (
                              <span className="px-2 py-0.5 rounded bg-[#ffb0e7]/30 text-slate-900 dark:text-white border border-[#ffb0e7]">
                                Subsidy: <strong>{scheme.subsidyPercentage}%</strong>
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              Max Loan: ₹{(scheme.maxLoanAmount / 100000).toFixed(1)}L
                            </span>
                          </div>
                        </div>

                        {/* Right: Interest Savings badge & Actions */}
                        <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">
                              Est. Annual Savings
                            </span>
                            <span className="text-sm font-black text-teal-700 dark:text-[#94ffdb]">
                              ₹{scheme.estimatedSavingsAnnual?.toLocaleString('en-IN') || 0} / yr
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {user && (
                              <button
                                onClick={() => toggleSaveScheme(scheme.schemeId)}
                                title={saved ? 'Remove Bookmark' : 'Bookmark Scheme'}
                                className={`p-1.5 rounded-lg border border-[#ffb0e7] transition-colors ${
                                  saved ? 'bg-[#94ffdb] text-slate-950' : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
                                }`}
                              >
                                <Bookmark className="w-3.5 h-3.5" />
                              </button>
                            )}

                              <button
                                onClick={() => {
                                  if (onSelectScheme) onSelectScheme(scheme.schemeId);
                                  setActiveTab('schemes');
                                }}
                                className="btn-action px-3 py-1.5 text-xs rounded-lg whitespace-nowrap shadow-sm"
                              >
                              View Details
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 rounded-2xl border-2 border-dashed border-[#ffb0e7] bg-white dark:bg-[#121824] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#94ffdb]/30 border border-[#ffb0e7] flex items-center justify-center mx-auto text-slate-700 dark:text-slate-300">
                <Sparkles className="w-6 h-6 text-teal-600 dark:text-[#94ffdb]" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ready for Evaluation
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Adjust the underwriting parameters on the left and click "Evaluate Scheme Eligibility" to generate the ML prediction and matched schemes.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default Predictor;
