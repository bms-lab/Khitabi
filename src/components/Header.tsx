import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CONFIG } from '../config';
import { TEMPLATES } from '../data/templates';
import { Search, Moon, Sun, Menu, X, Sparkles, FileText, ChevronDown, Download } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter templates for search modal
  const filteredTemplates = searchQuery.trim()
    ? TEMPLATES.filter(
        (t) =>
          t.title_ar.includes(searchQuery) ||
          t.meta_description.includes(searchQuery) ||
          t.slug.includes(searchQuery)
      )
    : TEMPLATES.slice(0, 6);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F3]/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4D] rounded-xl p-1">
            <div className="w-10 h-10 rounded-xl bg-[#0F5C4D] flex items-center justify-center text-white shadow-sm shadow-[#0F5C4D]/20 transition-transform group-hover:scale-105">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M7 6H15L19 10V18C19 19.1 18.1 20 17 20H7C5.9 20 5 19.1 5 18V8C5 6.9 5.9 6 7 6Z" fill="#FAF8F3" fillOpacity="0.2"/>
                <path d="M15 6V10H19" stroke="#C8A24A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 15C11 13 14 13 16 15" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12.5" cy="11" r="1.5" fill="#C8A24A"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#0F5C4D] dark:text-emerald-400 font-ui leading-none">
                {CONFIG.SITE_NAME}
              </span>
              <span className="text-[10px] font-semibold text-[#C8A24A] tracking-wider uppercase mt-0.5">
                {CONFIG.SITE_NAME_EN}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-[#0F5C4D] dark:hover:text-emerald-400 rounded-lg transition-colors"
            >
              الرئيسية
            </Link>

            {CONFIG.CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/tasnif/${cat.id}`}
                className="px-3 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-[#0F5C4D] dark:hover:text-emerald-400 rounded-lg transition-colors"
              >
                {cat.name_ar}
              </Link>
            ))}
          </nav>

          {/* Action Tools: Search, Dark Mode, Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-xs text-stone-700 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/70 dark:hover:bg-stone-700/60 rounded-lg border border-stone-200 dark:border-stone-700 transition-colors cursor-pointer"
              aria-label="البحث في النماذج"
            >
              <Search className="w-4 h-4 text-stone-700 dark:text-stone-400" />
              <span className="hidden sm:inline">ابحث عن نموذج...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded shadow-xs font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Download Project ZIP Button */}
            <a
              href="/khitabi.zip"
              download="khitabi.zip"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#0F5C4D]/10 hover:bg-[#0F5C4D]/20 text-[#0F5C4D] dark:bg-emerald-950/40 dark:text-emerald-300 dark:hover:bg-emerald-900/50 border border-[#0F5C4D]/20 dark:border-emerald-800 transition-colors"
              title="Télécharger le code source complet (ZIP)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل ZIP</span>
            </a>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
              aria-label={darkMode ? 'الوضع النهاري' : 'الوضع الليلي'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-[#C8A24A]" /> : <Moon className="w-5 h-5 text-stone-600" />}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-[#FAF8F3] dark:bg-stone-900 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
            >
              الرئيسية
            </Link>
            <div className="pt-2 pb-1 text-xs font-bold text-stone-700 dark:text-stone-400 px-3">
              التصنيفات
            </div>
            {CONFIG.CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/tasnif/${cat.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
              >
                <span>{cat.name_ar}</span>
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  {TEMPLATES.filter((t) => t.category === cat.id).length} نموذج
                </span>
              </Link>
            ))}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-1 text-xs text-stone-700 dark:text-stone-400 px-3">
              <a
                href="/khitabi.zip"
                download="khitabi.zip"
                className="font-bold text-[#0F5C4D] dark:text-emerald-400 py-1 flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل المشروع كاملاً (ZIP)</span>
              </a>
              <Link to="/man-nahnu" onClick={() => setMobileMenuOpen(false)}>من نحن</Link>
              <Link to="/siyasat-al-khususiya" onClick={() => setMobileMenuOpen(false)}>سياسة الخصوصية</Link>
              <Link to="/ittasil-bina" onClick={() => setMobileMenuOpen(false)}>اتصل بنا</Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs">
          <div
            className="w-full max-w-xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-[#0F5C4D] dark:text-emerald-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن خطاب (استقالة، إجازة، شكوى، تفويض...)"
                className="w-full bg-transparent text-stone-900 dark:text-stone-100 placeholder-stone-600 dark:placeholder-stone-400 text-sm focus:outline-none font-ui"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-600 dark:text-stone-400">
                {searchQuery ? 'نتائج البحث' : 'النماذج الأكثر استخداماً'}
              </div>

              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <button
                    key={template.slug}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                      navigate(`/khitab/${template.slug}`);
                    }}
                    className="w-full text-right p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/80 flex items-start gap-3 transition-colors group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-[#0F5C4D]/10 dark:bg-emerald-950/40 text-[#0F5C4D] dark:text-emerald-400 group-hover:scale-105 transition-transform shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-stone-900 dark:text-stone-100 group-hover:text-[#0F5C4D] dark:group-hover:text-emerald-400">
                        {template.title_ar}
                      </div>
                      <div className="text-xs text-stone-700 dark:text-stone-400 line-clamp-1 mt-0.5">
                        {template.meta_description}
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-sm text-stone-600 dark:text-stone-400">
                  لم نجد نموذجاً مطابقاً لـ "{searchQuery}"
                </div>
              )}
            </div>

            <div className="px-4 py-2.5 bg-stone-50 dark:bg-stone-800/40 border-t border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 flex items-center justify-between">
              <span>{TEMPLATES.length} نموذجاً رسمياً متوفراً</span>
              <span>اضغط ESC للإغلاق</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
