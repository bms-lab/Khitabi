import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { TemplatePage } from './pages/TemplatePage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('khitabi_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('khitabi_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('khitabi_theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FAF8F3] dark:bg-stone-950 text-[#1C1C1C] dark:text-stone-100 transition-colors">
        <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/khitab/:slug" element={<TemplatePage />} />
            <Route path="/tasnif/:category" element={<CategoryPage />} />
            <Route path="/man-nahnu" element={<AboutPage />} />
            <Route path="/siyasat-al-khususiya" element={<PrivacyPage />} />
            <Route path="/shurut" element={<TermsPage />} />
            <Route path="/ittasil-bina" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
