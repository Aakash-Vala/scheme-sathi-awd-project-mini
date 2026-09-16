import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

import Home from './pages/Home';
import Predictor from './pages/Predictor';
import SchemesCatalog from './pages/SchemesCatalog';
import Dashboard from './pages/Dashboard';
import About from './pages/About';

function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState(null);

  const handleOpenAuth = (mode = 'login') => {
    if (mode === 'register') {
      setLoginModalOpen(false);
      setRegisterModalOpen(true);
    } else {
      setRegisterModalOpen(false);
      setLoginModalOpen(true);
    }
  };

  const handleSelectScheme = (schemeId) => {
    setSelectedSchemeId(schemeId);
    setActiveTab('schemes');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Clean Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activeTab === 'predictor' && (
          <Predictor
            setActiveTab={setActiveTab}
            onSelectScheme={handleSelectScheme}
          />
        )}

        {activeTab === 'schemes' && (
          <SchemesCatalog
            initialSelectedId={selectedSchemeId}
            onClearSelectedId={() => setSelectedSchemeId(null)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard
            setActiveTab={setActiveTab}
            onSelectScheme={handleSelectScheme}
          />
        )}

        {activeTab === 'about' && (
          <About
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Global Clean Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Dedicated Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setLoginModalOpen(false);
          setRegisterModalOpen(true);
        }}
      />

      {/* Dedicated Register Modal */}
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setRegisterModalOpen(false);
          setLoginModalOpen(true);
        }}
      />

    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
