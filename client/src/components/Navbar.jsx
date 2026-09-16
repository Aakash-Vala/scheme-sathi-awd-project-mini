import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  Sun,
  Moon,
  Landmark,
  Layers,
  User,
  LogOut,
  LogIn,
  UserCheck,
  Info
} from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, onOpenAuth }) => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Landmark },
    { id: 'schemes', label: 'Schemes Catalog', icon: Layers },
    { id: 'predictor', label: 'AI Predictor', icon: null },
    { id: 'about', label: 'About', icon: Info },
  ];

  if (user) {
    navItems.push({ id: 'dashboard', label: 'Dashboard', icon: UserCheck });
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-[#0b0f17]/90 border-b border-[#ffb0e7] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#94ffdb] border-2 border-[#ffb0e7] flex items-center justify-center text-slate-900 shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0">
              <Landmark className="w-5 h-5 text-slate-950" />
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                  Scheme Sathi
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap hidden lg:block">
                Concessional Schemes & ML Engine
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5 shrink-0">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-xl text-xs lg:text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[#94ffdb] text-slate-950 border border-[#ffb0e7] shadow-sm font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Dark / Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              className="btn-action p-2 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 group shrink-0"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-[#ffb0e7] group-hover:text-slate-950 transition-colors" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 group-hover:text-slate-950 transition-colors" />
              )}
            </button>

            {/* Auth Controls */}
            {user ? (
              <div className="flex items-center gap-2 shrink-0">
                <div
                  onClick={() => setActiveTab('dashboard')}
                  className="btn-action flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl cursor-pointer whitespace-nowrap shrink-0"
                  title="View Profile & Dashboard"
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#ffb0e7] border border-[#ffb0e7] text-slate-950 text-xs font-bold flex items-center justify-center shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium max-w-[80px] sm:max-w-[100px] truncate hidden sm:inline">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 rounded-xl border border-[#ffb0e7] bg-[#ffb0e7]/15 text-slate-500 hover:text-red-500 hover:border-red-300 transition-colors cursor-pointer shrink-0"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="btn-action px-3 py-1.5 text-xs rounded-xl whitespace-nowrap shrink-0"
                >
                  Login
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="btn-action px-3 py-1.5 text-xs rounded-xl shadow-sm whitespace-nowrap shrink-0"
                >
                  Register
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2.5 border-t border-[#ffb0e7]/40 overflow-x-auto gap-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#94ffdb] text-slate-950 border border-[#ffb0e7] font-semibold'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};

export default Navbar;
