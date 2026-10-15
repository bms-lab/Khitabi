import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { POPULAR_TEMPLATES_SLUGS, TEMPLATES_MAP } from '../data/templates';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="الصفحة غير موجودة (404) | خطابي"
        description="عذراً، الصفحة التي تبحث عنها غير موجودة. تصفح أشهر نماذج الخطابات الرسمية المتاحة على خطابي."
        canonicalPath="/404"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-20 h-20 rounded-3xl bg-amber-50 dark:bg-amber-950/40 text-[#C8A24A] flex items-center justify-center mx-auto mb-6 shadow-xs border border-amber-200/50 dark:border-amber-900/50">
          <FileQuestion className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold text-[#C8A24A] uppercase tracking-widest">خطأ 404</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-ui mt-2">
          عذراً، الصفحة التي تبحث عنها غير موجودة
        </h1>
        <p className="mt-3 text-sm text-stone-700 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
          ربما تم نقل الصفحة أو تغيير الرابط. يمكنك العودة للصفحة الرئيسية أو تصفح أحد النماذج الأكثر استخداماً أدناه:
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F5C4D] text-white text-xs font-semibold hover:bg-[#0c4a3e] transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>

        {/* Popular Letters Quick Access */}
        <div className="mt-14 pt-10 border-t border-stone-200 dark:border-stone-800 text-right">
          <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4 font-ui">
            نماذج خطابات مقترحة:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {POPULAR_TEMPLATES_SLUGS.slice(0, 6).map((slug) => {
              const t = TEMPLATES_MAP[slug];
              if (!t) return null;
              return (
                <Link
                  key={slug}
                  to={`/khitab/${slug}`}
                  className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#0F5C4D] dark:hover:border-emerald-500 transition-colors flex items-center justify-between text-xs group"
                >
                  <span className="font-semibold text-stone-900 dark:text-stone-100 group-hover:text-[#0F5C4D] dark:group-hover:text-emerald-400">
                    {t.title_ar}
                  </span>
                  <ArrowLeft className="w-3.5 h-3.5 text-stone-600 group-hover:-translate-x-1 transition-transform" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
