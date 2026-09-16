import React from 'react';
import {
  Landmark,
  ShieldCheck,
  Database,
  Cpu,
  Code2,
  Sparkles,
  Layers,
  ArrowUp,
  ExternalLink,
  Activity,
  ChevronRight,
  Server,
  Compass
} from 'lucide-react';

const Footer = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto border-t-2 border-[#ffb0e7] bg-white dark:bg-[#0b0f17] transition-colors duration-200">
      
      {/* Top CTA Ribbon */}
      <div className="border-b border-[#ffb0e7]/60 bg-gradient-to-r from-emerald-50/60 via-pink-50/40 to-teal-50/60 dark:from-[#121824] dark:via-[#161d2d] dark:to-[#121824] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#94ffdb]/30 border border-[#ffb0e7] flex items-center justify-center text-teal-700 dark:text-[#94ffdb] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Ready to Evaluate Your Concessional Loan Eligibility?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Run our trained ML underwriting model to evaluate statutory loan odds and interest savings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-start md:justify-end">
            <button
              onClick={() => {
                setActiveTab('predictor');
                scrollToTop();
              }}
              className="btn-action px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-teal-700 dark:text-[#94ffdb]" />
              <span>Launch AI Predictor</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('schemes');
                scrollToTop();
              }}
              className="btn-action px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-teal-700 dark:text-[#94ffdb]" />
              <span>Explore 15 Schemes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Project & Mission Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#94ffdb] border border-[#ffb0e7] flex items-center justify-center text-slate-900 font-bold shadow-sm">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  Scheme Sathi
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-teal-600 dark:text-[#94ffdb]">
                  Concessional Finance Engine
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              An intelligent decision-support portal developed for the Advanced Web Development curriculum. Bridges access to government-subsidized credit through predictive machine learning and explainable AI under statutory criteria.
            </p>

            {/* Live Service Status Indicator Cards */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#121824] border border-[#ffb0e7] space-y-2">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                System Health Status
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  MongoDB Atlas / Local
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  ML Flask Engine (5001)
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation & Core Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-teal-600 dark:text-[#94ffdb]" />
              <span>Platform Modules</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('schemes');
                    scrollToTop();
                  }}
                  className="flex items-center justify-between w-full py-1 text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-[#94ffdb] transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-[#94ffdb] transition-colors" />
                    Schemes Catalog
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-[#94ffdb] border border-teal-200 dark:border-teal-800">
                    15 Programs
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('predictor');
                    scrollToTop();
                  }}
                  className="flex items-center justify-between w-full py-1 text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-[#94ffdb] transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-[#94ffdb] transition-colors" />
                    AI Eligibility Predictor
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border border-[#ffb0e7]">
                    Scikit-Learn
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    scrollToTop();
                  }}
                  className="flex items-center justify-between w-full py-1 text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-[#94ffdb] transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-[#94ffdb] transition-colors" />
                    Beneficiary Dashboard
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-[#ffb0e7]">
                    Saved & History
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('about');
                    scrollToTop();
                  }}
                  className="flex items-center justify-between w-full py-1 text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-[#94ffdb] transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 dark:group-hover:text-[#94ffdb] transition-colors" />
                    About Project & Tech Architecture
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Statutory Compliance & Underwriting Criteria */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-[#94ffdb]" />
              <span>Statutory Frameworks</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Rules and eligibility criteria modeled directly from published government apex corporations and ministries:
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb0e7]"></span>
                <span>NSFDC (National Scheduled Castes Corp)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb0e7]"></span>
                <span>NBCFDC (National Backward Classes Corp)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb0e7]"></span>
                <span>NSKFDC (Safai Karamcharis Finance Corp)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb0e7]"></span>
                <span>Ministry of MSME (PMEGP & Mudra)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb0e7]"></span>
                <span>Stand-Up India (SIDBI Underwriting)</span>
              </li>
            </ul>
            <div className="pt-1 text-[11px] text-teal-700 dark:text-[#94ffdb] font-semibold">
              Statutory Interest Rates: 4.0% - 6.0% p.a.
            </div>
          </div>

          {/* Col 4: Technology Stack & Back to Top */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-teal-600 dark:text-[#94ffdb]" />
              <span>Engineering Stack</span>
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-[#ffb0e7] font-medium">
                React 19 + Vite
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-[#ffb0e7] font-medium">
                Node.js + Express
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-[#ffb0e7] font-medium">
                MongoDB + Mongoose
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#94ffdb]/25 text-teal-950 dark:text-[#94ffdb] border border-[#ffb0e7] font-bold">
                Python Scikit-Learn
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-[#ffb0e7] font-medium">
                JWT Auth + bcrypt
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-[#ffb0e7] font-medium">
                Tailwind CSS
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="btn-action w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Scroll Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Academic Attribution */}
        <div className="pt-6 border-t border-[#ffb0e7]/50 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Scheme Sathi
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span>Advanced Web Development (AWD) University Capstone Project</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveTab('about');
                scrollToTop();
              }}
              className="text-teal-700 dark:text-[#94ffdb] hover:underline font-semibold"
            >
              Academic Specifications
            </button>
            <span className="text-slate-400">|</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Concessional Lending Research Engine
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
