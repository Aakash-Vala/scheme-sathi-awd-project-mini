import React from 'react';
import {
  Landmark,
  Cpu,
  ShieldCheck,
  TrendingDown,
  Layers,
  Database,
  Code2,
  Sparkles
} from 'lucide-react';

const About = ({ setActiveTab }) => {
  return (
    <div className="space-y-12 py-6 max-w-7xl mx-auto">
      
      {/* Top Hero Banner */}
      <div className="p-8 rounded-3xl border-2 border-[#ffb0e7] bg-gradient-to-b from-white via-slate-50 to-[#94ffdb]/10 dark:from-[#121824] dark:via-[#0e141f] dark:to-[#0b0f17] shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-teal-700 dark:text-[#94ffdb] text-xs font-bold uppercase tracking-wider">
          <Landmark className="w-4 h-4" />
          <span>Advanced Web Development (AWD) University Capstone</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          About Scheme Sathi Platform
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          Scheme Sathi is an intelligent concessional credit decision portal developed as an academic subset of the national SIH Scheme-Sathi initiative. It addresses information friction and complex statutory underwriting by combining a machine learning approval predictor with a real-world government scheme registry.
        </p>
      </div>

      {/* Real-World Statistics Strip */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-700 dark:text-[#94ffdb]" />
          <span>Platform Benchmark Statistics</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Real-World Schemes',
              val: '15+ Programs',
              desc: 'NSFDC, Mudra, PMEGP, Stand-Up India',
              icon: Landmark
            },
            {
              label: 'Starting Interest Rate',
              val: '4.0% p.a.',
              desc: 'Vs 11.5% Commercial Bank Rate',
              icon: TrendingDown
            },
            {
              label: 'ML Model Precision',
              val: '89.9% Accuracy',
              desc: 'Scikit-Learn Random Forest Classifier',
              icon: Cpu
            },
            {
              label: 'Statutory Inclusivity',
              val: '100% Affirmative',
              desc: 'SC, ST, OBC, Women & Micro-Sellers',
              icon: ShieldCheck
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-[#121824] border border-[#ffb0e7] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 rounded-xl bg-[#94ffdb]/30 dark:bg-[#94ffdb]/15 border border-[#ffb0e7] flex items-center justify-center text-teal-950 dark:text-[#94ffdb] mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {stat.val}
                </div>
                <div className="text-xs font-bold text-teal-700 dark:text-[#94ffdb] mt-0.5">
                  {stat.label}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technical Architecture Stack */}
      <section className="p-8 rounded-3xl border-2 border-[#ffb0e7] bg-white dark:bg-[#121824] shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-teal-700 dark:text-[#94ffdb]" />
            <span>Full-Stack Architecture: ML + React + Node + MongoDB</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Engineered with a clean microservice architecture to decouple ML predictive inference from the application API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Layer 1: ML */}
          <div className="p-4 rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#94ffdb]/30 text-teal-950 dark:text-[#94ffdb] border border-[#ffb0e7]">
                Port 5001
              </span>
              <Cpu className="w-4 h-4 text-teal-600 dark:text-[#94ffdb]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Python ML Microservice
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Scikit-Learn Random Forest Classifier (120 trees, 89.9% accuracy, 0.971 ROC-AUC) generating approval likelihood, risk tiers, and Explainable AI (XAI) factors.
            </p>
          </div>

          {/* Layer 2: Express */}
          <div className="p-4 rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#94ffdb]/30 text-teal-950 dark:text-[#94ffdb] border border-[#ffb0e7]">
                Port 5000
              </span>
              <Layers className="w-4 h-4 text-teal-600 dark:text-[#94ffdb]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Node.js Express Backend
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              RESTful API gateway managing JWT authentication, schemes CRUD queries, and internal ML underwriting routing.
            </p>
          </div>

          {/* Layer 3: React */}
          <div className="p-4 rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#94ffdb]/30 text-teal-950 dark:text-[#94ffdb] border border-[#ffb0e7]">
                Port 5173
              </span>
              <Code2 className="w-4 h-4 text-teal-600 dark:text-[#94ffdb]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              React 19 + Vite Frontend
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Responsive user interface styled with Tailwind CSS v4, Lucide SVG iconography, class-based dark mode toggle, and interactive predictor gauges.
            </p>
          </div>

          {/* Layer 4: MongoDB */}
          <div className="p-4 rounded-xl border border-[#ffb0e7] bg-slate-50 dark:bg-slate-900/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#94ffdb]/30 text-teal-950 dark:text-[#94ffdb] border border-[#ffb0e7]">
                Port 27017
              </span>
              <Database className="w-4 h-4 text-teal-600 dark:text-[#94ffdb]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              MongoDB Database
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Real-world database instance storing 15 statutory government schemes, user demographic profiles, bookmarked schemes, and evaluation logs.
            </p>
          </div>

        </div>
      </section>


      {/* Comparison Section: Concessional vs Commercial Bank */}
      <section className="p-8 rounded-3xl border-2 border-[#ffb0e7] bg-white dark:bg-[#121824] shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            The Concessional Difference: Underwriting Benchmarks
          </h2>
          <p className="text-xs text-slate-500">
            Comparing typical commercial bank business credit against statutory affirmative action schemes.
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

      {/* Quick CTA to return to Predictor */}
      <div className="text-center pt-4">
        <button
          onClick={() => setActiveTab('predictor')}
          className="btn-action px-6 py-3 rounded-xl text-xs shadow-md"
        >
          Proceed to AI Predictor
        </button>
      </div>

    </div>
  );
};

export default About;
