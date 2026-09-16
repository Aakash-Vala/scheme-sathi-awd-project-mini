import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Filter,
  Layers,
  ExternalLink,
  Bookmark,
  CheckCircle2,
  FileText,
  Clock,
  Landmark,
  X,
  Info,
  DollarSign,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const SchemesCatalog = ({ initialSelectedId, onClearSelectedId, setActiveTab }) => {
  const { user, isSchemeSaved, toggleSaveScheme } = useAuth();

  const [schemes, setSchemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCaste, setSelectedCaste] = useState('All');

  // Selected scheme for detail modal
  const [activeScheme, setActiveScheme] = useState(null);

  // Fetch schemes from MongoDB
  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (selectedCategory !== 'All') params.category = selectedCategory;
      if (selectedCaste !== 'All') params.caste = selectedCaste;

      const res = await axios.get('/api/schemes', { params });
      if (res.data.success) {
        setSchemes(res.data.schemes);

        // If an initial scheme was passed from another view, open it
        if (initialSelectedId) {
          const found = res.data.schemes.find(s => s._id === initialSelectedId);
          if (found) {
            setActiveScheme(found);
            if (onClearSelectedId) onClearSelectedId();
          }
        }
      }
    } catch (err) {
      console.error('Failed to load schemes:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories once
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get('/api/schemes/categories');
        if (res.data.success) {
          setCategories(['All', ...res.data.categories]);
        }
      } catch (err) {
        console.error('Categories error:', err);
      }
    };
    fetchCats();
  }, []);

  // Fetch schemes on filter change
  useEffect(() => {
    fetchSchemes();
  }, [selectedCategory, selectedCaste]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSchemes();
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-8 py-4 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl border-2 border-[#ffb0e7] bg-white dark:bg-[#121824] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-700 dark:text-[#94ffdb] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Real-World Central & NSFDC Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Government Concessional Schemes Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Explore active credit assistance programs, verified interest rates, and eligibility terms stored in MongoDB.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('predictor')}
          className="btn-action px-4 py-2 rounded-xl text-xs whitespace-nowrap shadow-sm"
        >
          Check My Eligibility
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl border border-[#ffb0e7] bg-white dark:bg-[#121824] shadow-sm space-y-4">
        
        {/* Search & Select Row */}
        <div className="flex flex-col md:flex-row gap-3">
          
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by scheme title, category, ministry, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#94ffdb]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedCaste}
              onChange={(e) => setSelectedCaste(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#94ffdb]"
            >
              <option value="All">All Categories / Castes</option>
              <option value="SC">SC (Scheduled Caste)</option>
              <option value="ST">ST (Scheduled Tribe)</option>
              <option value="OBC">OBC (Backward Class)</option>
              <option value="EWS">EWS (Economically Weaker)</option>
            </select>
          </div>

        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#94ffdb] text-slate-950 border border-[#ffb0e7] font-bold shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#ffb0e7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Schemes Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-500 text-xs">
          Querying MongoDB schemes database...
        </div>
      ) : schemes.length === 0 ? (
        <div className="p-12 rounded-2xl border-2 border-dashed border-[#ffb0e7] bg-white dark:bg-[#121824] text-center space-y-2">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No schemes found matching your criteria.
          </p>
          <p className="text-xs text-slate-400">
            Try adjusting your search terms or clearing the category filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => {
            const saved = isSchemeSaved(scheme._id);

            return (
              <div
                key={scheme._id}
                className="p-5 rounded-2xl bg-white dark:bg-[#121824] border-2 border-[#ffb0e7] hover:border-[#94ffdb] transition-all shadow-sm flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-2.5">
                  
                  {/* Top tags */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#94ffdb]/30 text-teal-950 dark:text-[#94ffdb] border border-[#ffb0e7]">
                      {scheme.code}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      {scheme.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-teal-700 dark:group-hover:text-[#94ffdb] transition-colors">
                    {scheme.name}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {scheme.description}
                  </p>

                  <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                    <span className="text-slate-400">Ministry:</span> {scheme.ministry}
                  </div>

                  {/* Financial Highlights */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-center">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Interest</span>
                      <span className="text-xs font-bold text-teal-700 dark:text-[#94ffdb]">
                        {scheme.interestRate}% p.a.
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Subsidy</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {scheme.subsidyPercentage > 0 ? `${scheme.subsidyPercentage}%` : 'Nil'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Max Limit</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        ₹{(scheme.maxLoanAmount / 100000).toFixed(1)}L
                      </span>
                    </div>
                  </div>

                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  {user && (
                    <button
                      onClick={() => toggleSaveScheme(scheme._id)}
                      title={saved ? 'Remove Bookmark' : 'Bookmark Scheme'}
                      className={`p-2 rounded-xl border border-[#ffb0e7] transition-colors ${
                        saved ? 'bg-[#94ffdb] text-slate-950' : 'text-slate-400 hover:text-slate-700 dark:hover:text-white'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => setActiveScheme(scheme)}
                    className="btn-action flex-1 py-2 px-3 text-xs rounded-xl flex items-center justify-center gap-1 group"
                  >
                    <span>Full Guidelines & Documents</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {activeScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#121824] rounded-2xl border-2 border-[#ffb0e7] shadow-2xl p-6 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#94ffdb]/30 text-teal-950 dark:text-[#94ffdb] border border-[#ffb0e7]">
                    {activeScheme.code}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activeScheme.category}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                  {activeScheme.name}
                </h2>
                <p className="text-xs text-teal-700 dark:text-[#94ffdb] font-semibold">
                  {activeScheme.ministry}
                </p>
              </div>

              <button
                onClick={() => setActiveScheme(null)}
                className="p-1.5 rounded-lg border border-[#ffb0e7] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scheme Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Scheme Objectives
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeScheme.description}
              </p>
              <p className="text-xs text-slate-500 pt-1">
                <strong>Target Beneficiaries:</strong> {activeScheme.targetBeneficiary}
              </p>
            </div>

            {/* Financial Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-[#ffb0e7] text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Interest Rate</span>
                <span className="text-sm font-black text-teal-700 dark:text-[#94ffdb]">
                  {activeScheme.interestRate}% p.a.
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Capital Subsidy</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {activeScheme.subsidyPercentage}%
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Moratorium</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {activeScheme.moratoriumMonths} Months
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Loan Ceiling</span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  ₹{(activeScheme.maxLoanAmount / 100000).toFixed(1)} Lakhs
                </span>
              </div>
            </div>

            {/* Eligibility Criteria */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Statutory Eligibility Checklist
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>Age: {activeScheme.eligibility?.minAge} - {activeScheme.eligibility?.maxAge} Years</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>Gender: {activeScheme.eligibility?.gender}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>Categories: {activeScheme.eligibility?.casteAllowed?.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>Max Family Income: Up to ₹{(activeScheme.eligibility?.maxAnnualIncome / 100000).toFixed(1)} Lakh</span>
                </div>
              </div>
            </div>

            {/* Required Documents */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                <span>Mandatory Documentation</span>
              </h4>
              <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                {activeScheme.requiredDocuments?.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Steps */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Application & Disbursement Pipeline
              </h4>
              <ol className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-decimal list-inside">
                {activeScheme.applicationSteps?.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <a
                href={activeScheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-action px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
              >
                <span>Visit Official Scheme Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveScheme(null);
                    setActiveTab('predictor');
                  }}
                  className="btn-action px-4 py-2 rounded-xl text-xs shadow-sm"
                >
                  Predict Approval For This Scheme
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default SchemesCatalog;
