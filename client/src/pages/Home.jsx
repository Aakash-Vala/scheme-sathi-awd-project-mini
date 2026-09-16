import React from 'react';
import {
  Sparkles,
  Layers,
  Bookmark,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  Landmark,
  CheckCircle2,
  FileCheck,
  Cpu,
  BarChart3,
  Users
} from 'lucide-react';

const Home = ({ setActiveTab, onOpenAuth }) => {
  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-[#ffb0e7] bg-gradient-to-b from-white via-slate-50 to-[#94ffdb]/10 dark:from-[#121824] dark:via-[#0e141f] dark:to-[#0b0f17] p-8 md:p-14 shadow-lg">
        <div className="max-w-3xl space-y-6">
          
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Empowering Marginalized Entrepreneurs with <span className="text-teal-700 dark:text-[#94ffdb]">Predictive AI</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Scheme Sathi bridges the critical gap between underserved citizens and statutory government credit assistance. Using Machine Learning underwriting and real-world scheme criteria, determine your approval probability and access low-interest concessional funding starting from 4.0% per annum.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('predictor')}
              className="btn-action px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg flex items-center gap-2 group"
            >
              <span>Launch AI Predictor</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setActiveTab('schemes')}
              className="btn-action px-6 py-3 rounded-xl text-sm flex items-center gap-2 group"
            >
              <Layers className="w-4 h-4 text-pink-600 dark:text-[#ffb0e7] group-hover:text-slate-950 transition-colors" />
              <span>Explore Real Database</span>
            </button>
          </div>

        </div>

        {/* Decorative Grid Accents */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-[#94ffdb]/20 dark:bg-[#94ffdb]/10 blur-3xl pointer-events-none" />
        <div className="absolute right-12 top-12 w-48 h-48 rounded-full bg-[#ffb0e7]/20 dark:bg-[#ffb0e7]/10 blur-2xl pointer-events-none" />
      </section>

      {/* Core Highlights */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Comprehensive Concessional Finance Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            A complete full-stack decision platform engineered with Explainable AI for end-to-end evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: AI Predictor */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121824] border-2 border-[#ffb0e7] hover:border-[#94ffdb] transition-colors flex flex-col justify-between h-full">
            <div className="space-y-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/90 border-2 border-[#ffb0e7] flex items-center justify-center text-teal-700 dark:text-[#94ffdb] shadow-sm">
                <Sparkles className="w-6 h-6 text-teal-700 dark:text-[#94ffdb]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                AI Eligibility & Risk Predictor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[48px]">
                Trained on multi-dimensional underwriting parameters including income ceilings, project cost, debt-to-income (DTI) ratio, caste category, and credit history.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>Instant likelihood calculation (0 - 100%)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>Risk Tier badge (Low, Moderate, High)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>Explainable AI (XAI) transparent factors</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-auto">
              <button
                onClick={() => setActiveTab('predictor')}
                className="btn-action w-full py-2.5 rounded-xl text-xs shadow-sm flex items-center justify-center"
              >
                Test Eligibility Now
              </button>
            </div>
          </div>

          {/* Card 2: Schemes Database */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121824] border-2 border-[#ffb0e7] hover:border-[#94ffdb] transition-colors flex flex-col justify-between h-full">
            <div className="space-y-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/90 border-2 border-[#ffb0e7] flex items-center justify-center text-teal-700 dark:text-[#94ffdb] shadow-sm">
                <Layers className="w-6 h-6 text-teal-700 dark:text-[#94ffdb]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Real-World Scheme Registry
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[48px]">
                Populated directly into MongoDB with 15+ official government concessional schemes, including NSFDC Mahila Samriddhi, Green Business, PMEGP, and Stand-Up India.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>Accurate interest rates & capital subsidies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>Document checklists & application steps</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>Direct link to official government portals</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-auto">
              <button
                onClick={() => setActiveTab('schemes')}
                className="btn-action w-full py-2.5 rounded-xl text-xs shadow-sm flex items-center justify-center"
              >
                Browse All Schemes
              </button>
            </div>
          </div>

          {/* Card 3: Beneficiary Dashboard */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#121824] border-2 border-[#ffb0e7] hover:border-[#94ffdb] transition-colors flex flex-col justify-between h-full">
            <div className="space-y-4 flex-1">
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800/90 border-2 border-[#ffb0e7] flex items-center justify-center text-teal-700 dark:text-[#94ffdb] shadow-sm">
                <Bookmark className="w-6 h-6 text-teal-700 dark:text-[#94ffdb]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Beneficiary Portfolio & Dashboard
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed min-h-[48px]">
                A dedicated beneficiary portal to manage bookmarked schemes, inspect previous AI evaluations, and audit subsidy savings.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>Personalized scheme bookmarking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>MongoDB audit trail of prior predictions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-[#94ffdb]" />
                  <span>1-Click demographic profile synchronization</span>
                </li>
              </ul>
            </div>
            <div className="pt-6 mt-auto">
              <button
                onClick={() => setActiveTab('dashboard')}
                className="btn-action w-full py-2.5 rounded-xl text-xs shadow-sm flex items-center justify-center"
              >
                View Beneficiary Dashboard
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Comparison Section: Concessional vs Commercial Bank */}
      <section className="p-8 rounded-3xl border-2 border-[#ffb0e7] bg-white dark:bg-[#121824] shadow-sm">
        <div className="max-w-3xl mb-8 space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            The Concessional Difference: Why Scheme Sathi Matters
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Comparing typical commercial bank business credit with statutory affirmative action schemes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-[#ffb0e7] text-slate-900 dark:text-white">
                <th className="py-3 px-4 font-bold">Feature / Underwriting Factor</th>
                <th className="py-3 px-4 font-bold bg-[#94ffdb]/20 text-teal-950 dark:text-[#94ffdb]">
                  Scheme Sathi (NSFDC / MoSJE)
                </th>
                <th className="py-3 px-4 font-bold text-slate-500">Commercial Bank Loans</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 px-4 font-medium">Annual Interest Rate</td>
                <td className="py-3 px-4 font-bold text-teal-700 dark:text-[#94ffdb] bg-[#94ffdb]/10">
                  4.0% to 7.0% per annum
                </td>
                <td className="py-3 px-4 text-slate-500">11.5% to 16.0% per annum</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Repayment Moratorium</td>
                <td className="py-3 px-4 font-bold text-teal-700 dark:text-[#94ffdb] bg-[#94ffdb]/10">
                  3 to 24 Months Grace Period
                </td>
                <td className="py-3 px-4 text-slate-500">0 to 1 Month (Immediate EMI)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Capital Subsidy Support</td>
                <td className="py-3 px-4 font-bold text-teal-700 dark:text-[#94ffdb] bg-[#94ffdb]/10">
                  15% to 35% Government Backed
                </td>
                <td className="py-3 px-4 text-slate-500">0% (Nil Subsidy)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Collateral Requirements</td>
                <td className="py-3 px-4 font-bold text-teal-700 dark:text-[#94ffdb] bg-[#94ffdb]/10">
                  Zero Collateral (Guaranteed by CEGSSC / CGTMSE)
                </td>
                <td className="py-3 px-4 text-slate-500">Immovable Property / 100% Security</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Special Rebates for Women</td>
                <td className="py-3 px-4 font-bold text-teal-700 dark:text-[#94ffdb] bg-[#94ffdb]/10">
                  0.5% to 1.0% Additional Interest Subsidy
                </td>
                <td className="py-3 px-4 text-slate-500">Standard rates apply</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

export default Home;
