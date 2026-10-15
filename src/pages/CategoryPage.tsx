import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CONFIG, CategoryId } from '../config';
import { getTemplatesByCategory, TEMPLATES } from '../data/templates';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb, buildBreadcrumbSchema } from '../components/Breadcrumb';
import {
  Briefcase,
  GraduationCap,
  Landmark,
  Coins,
  UserCheck,
  FileText,
  ArrowLeft,
  Search,
} from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [filterQuery, setFilterQuery] = useState('');

  const currentCategory = CONFIG.CATEGORIES.find((c) => c.id === category);

  if (!currentCategory) {
    return <Navigate to="/404" replace />;
  }

  const templates = getTemplatesByCategory(currentCategory.id);
  const filtered = templates.filter(
    (t) =>
      !filterQuery.trim() ||
      t.title_ar.includes(filterQuery) ||
      t.meta_description.includes(filterQuery)
  );

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'work':
        return <Briefcase className="w-6 h-6" />;
      case 'education':
        return <GraduationCap className="w-6 h-6" />;
      case 'government':
        return <Landmark className="w-6 h-6" />;
      case 'finance':
        return <Coins className="w-6 h-6" />;
      case 'personal':
        return <UserCheck className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'التصنيفات', url: '/' },
    { name: currentCategory.name_ar, url: `/tasnif/${currentCategory.id}` },
  ]);

  return (
    <>
      <SEOHead
        title={`نماذج وصيغ خطابات ${currentCategory.name_ar} الرسمية الجاهزة`}
        description={`تصفح جميع نماذج خطابات ${currentCategory.name_ar} الجاهزة للتحميل والطباعة مجاناً بصيغة Word و PDF مع المعاينة المباشرة.`}
        canonicalPath={`/tasnif/${currentCategory.id}`}
        jsonLd={breadcrumbSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: currentCategory.name_ar }]} />

        {/* Category Header Banner */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xs mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#0F5C4D]/10 dark:bg-emerald-950/50 text-[#0F5C4D] dark:text-emerald-400 flex items-center justify-center shrink-0">
              {getCategoryIcon(currentCategory.id)}
            </div>
            <div className="flex-1">
              <span className="text-xs font-semibold text-[#C8A24A] uppercase tracking-wider">
                قسم النماذج المتخصصة
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-ui mt-1">
                نماذج وصيغ خطابات {currentCategory.name_ar}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-3xl">
                {currentCategory.description_ar} اختر الخطاب المناسب واكتب بياناتك للحصول على نسخة A4 رسمية معتمدة قابلة للتنزيل كملف Word أو PDF فوراً.
              </p>
            </div>
          </div>

          {/* Quick Search in this Category */}
          <div className="mt-6 pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 dark:text-stone-400" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={`ابحث داخل ${currentCategory.name_ar}...`}
                className="w-full pr-9 pl-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-600 dark:placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 text-xs">
              <span className="text-stone-600 dark:text-stone-400 whitespace-nowrap">أقسام أخرى:</span>
              {CONFIG.CATEGORIES.filter((c) => c.id !== currentCategory.id).map((other) => (
                <Link
                  key={other.id}
                  to={`/tasnif/${other.id}`}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 whitespace-nowrap transition-colors"
                >
                  {other.name_ar}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-ui">
              النماذج المتوفرة في هذا القسم ({filtered.length})
            </h2>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((t) => (
                <Link
                  key={t.slug}
                  to={`/khitab/${t.slug}`}
                  className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 hover:border-[#0F5C4D] dark:hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#0F5C4D]/10 dark:bg-emerald-950/40 text-[#0F5C4D] dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#0F5C4D] dark:group-hover:text-emerald-400 transition-colors font-ui mb-2">
                      {t.title_ar}
                    </h3>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-2">
                      {t.meta_description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-[#0F5C4D] dark:text-emerald-400 font-semibold">
                    <span>{t.variants.length} صيغ جاهزة</span>
                    <span className="flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                      <span>فتح النموذج</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8">
              <p className="text-sm text-stone-600 dark:text-stone-400">
                لم نجد نماذج تطابق بحثك داخل هذا القسم.
              </p>
              <button
                onClick={() => setFilterQuery('')}
                className="mt-3 text-xs text-[#0F5C4D] dark:text-emerald-400 font-semibold underline cursor-pointer"
              >
                إظهار كافة نماذج القسم
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
