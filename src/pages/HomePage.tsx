import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CONFIG } from '../config';
import { TEMPLATES, POPULAR_TEMPLATES_SLUGS } from '../data/templates';
import { SEOHead } from '../components/SEOHead';
import { AdSlot } from '../components/AdSlot';
import {
  Search,
  FileText,
  Briefcase,
  GraduationCap,
  Landmark,
  Coins,
  UserCheck,
  CheckCircle2,
  Download,
  Printer,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  // Search filtering
  const filteredTemplates = TEMPLATES.filter((t) => {
    const matchesQuery =
      !searchQuery.trim() ||
      t.title_ar.includes(searchQuery) ||
      t.meta_description.includes(searchQuery) ||
      t.slug.includes(searchQuery);

    const matchesCategory = selectedCat === 'all' || t.category === selectedCat;

    return matchesQuery && matchesCategory;
  });

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'work':
        return <Briefcase className="w-5 h-5" />;
      case 'education':
        return <GraduationCap className="w-5 h-5" />;
      case 'government':
        return <Landmark className="w-5 h-5" />;
      case 'finance':
        return <Coins className="w-5 h-5" />;
      case 'personal':
        return <UserCheck className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const homeFaq = [
    {
      q: 'هل استخدام موقع خطابي مجاني تماماً وبدون أي اشتراك؟',
      a: 'نعم، موقع خطابي مجاني 100% لجميع المستخدمين، ولا يتطلب أي تسجيل دخول أو بطاقة بنكية أو اشتراك.',
    },
    {
      q: 'هل يتم إرسال بياناتي الشخصية أو خطابات إلى خوادمكم؟',
      a: 'أبداً، يعمل موقع خطابي بتقنية المعالجة المحلية الكاملة داخل متصفحك (Client-side). جميع النصوص والأسماء والمبالغ والشعارات تبقى على جهازك فقط ولا ترسل إلى أي خادم خارجي.',
    },
    {
      q: 'هل يمكنني تنزيل الخطاب بصيغة Word أو التعديل عليه لاحقاً؟',
      a: 'نعم، يتيح لك الموقع تصدير ملف وورد (.docx) فوري ومنسق بمحاذاة اليمين وخطوط عربية واضحة، لتتمكن من فتحه والتعديل عليه في برنامج Microsoft Word بكل سهولة.',
    },
    {
      q: 'كيف أقوم بحفظ الخطاب بصيغة PDF وطباعته بمقاس A4؟',
      a: 'ببساطة اضغط على زر "طباعة / حفظ PDF"، ستفتح نافذة الطباعة الخاصة بمتصفحك؛ من قائمة الوجهة (Destination) اختر "حفظ بتنسيق PDF" ثم انقر حفظ، وستحصل على مستند A4 رسمي فائق الجودة.',
    },
    {
      q: 'هل النماذج متوافقة مع أنظمة العمل والجهات الحكومية العربية؟',
      a: 'نعم، تم تدقيق وصياغة جميع الخطابات والنماذج بواسطة مختصين قانونيين وإداريين، وهي متوافقة مع أنظمة العمل والمعاملات الرسمية في المملكة العربية السعودية ومصر والإمارات وكافة الدول العربية.',
    },
  ];

  // Schema.org WebSite with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: CONFIG.SITE_NAME,
    url: CONFIG.SITE_URL,
    description: CONFIG.SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${CONFIG.SITE_URL}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <SEOHead
        title="خطابي — اكتب خطابك الرسمي في دقيقة واحدة مجاناً"
        description="نماذج خطابات رسمية جاهزة للتحميل والطباعة فوراً: خطاب استقالة، طلب إجازة، تعريف بالراتب، تفويض، شكاوى ومطالبات بدون تسجيل بصيغة Word و PDF."
        canonicalPath="/"
        jsonLd={websiteSchema}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-stone-200/80 dark:border-stone-800">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F5C4D]/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-[#0F5C4D] dark:text-emerald-300 mb-6 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#0F5C4D] dark:text-emerald-400" />
            <span>مجاني 100% · بدون تسجيل · بياناتك آمنة في متصفحك</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight font-ui leading-tight sm:leading-tight">
            اكتب خطابك الرسمي في{' '}
            <span className="text-[#0F5C4D] dark:text-emerald-400 relative inline-block">
              دقيقة واحدة
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#C8A24A]" viewBox="0 0 100 12" preserveAspectRatio="none" fill="currentColor">
                <path d="M0,8 Q50,0 100,8 L100,12 Q50,4 0,12 Z" />
              </svg>
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-stone-700 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
            اختر نوع الخطاب، املأ بياناتك البسيطة، وشاهد المعاينة الحية فوراً بمقاس ورقة A4. حمّل نسختك بصيغة Word أو اطبعها كملف PDF معتمد.
          </p>

          {/* Search Box in Hero */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="relative shadow-lg rounded-2xl">
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-stone-600 dark:text-stone-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن نموذج (مثال: خطاب استقالة، طلب إجازة، تفويض، تعريف راتب...)"
                className="w-full pr-12 pl-4 py-4 text-sm sm:text-base rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-600 dark:placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0F5C4D] dark:focus:ring-emerald-500 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 left-0 pl-4 flex items-center text-xs text-stone-600 hover:text-stone-700 dark:hover:text-stone-300 cursor-pointer"
                >
                  مسح
                </button>
              )}
            </div>

            {/* Popular Quick Searches */}
            <div className="mt-4 flex items-center justify-center gap-2 flex-wrap text-xs text-stone-700 dark:text-stone-300">
              <span className="font-semibold text-stone-700 dark:text-stone-300">الأكثر طلباً:</span>
              <button
                onClick={() => setSearchQuery('استقالة')}
                className="px-2.5 py-1 rounded-lg bg-stone-200/70 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors cursor-pointer"
              >
                خطاب استقالة
              </button>
              <button
                onClick={() => setSearchQuery('إجازة')}
                className="px-2.5 py-1 rounded-lg bg-stone-200/70 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors cursor-pointer"
              >
                طلب إجازة
              </button>
              <button
                onClick={() => setSearchQuery('تعريف')}
                className="px-2.5 py-1 rounded-lg bg-stone-200/70 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors cursor-pointer"
              >
                تعريف بالراتب
              </button>
              <button
                onClick={() => setSearchQuery('تفويض')}
                className="px-2.5 py-1 rounded-lg bg-stone-200/70 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors cursor-pointer"
              >
                تفويض رسمي
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-ui">
              تصفح النماذج حسب التصنيف
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1">
              اختر المجال المطلوب للوصول المباشر إلى صيغ الخطابات المتخصصة
            </p>
          </div>
          <Link
            to="/tasnif/work"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[#0F5C4D] dark:text-emerald-400 hover:underline"
          >
            <span>عرض كافة الأقسام</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CONFIG.CATEGORIES.map((cat) => {
            const count = TEMPLATES.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCat === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCat(isSelected ? 'all' : cat.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer group text-right ${
                  isSelected
                    ? 'border-[#0F5C4D] bg-[#0F5C4D]/5 dark:border-emerald-500 dark:bg-emerald-950/30 ring-2 ring-[#0F5C4D]/20'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-xs'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F5C4D]/10 dark:bg-emerald-950/50 text-[#0F5C4D] dark:text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {getCategoryIcon(cat.id)}
                </div>
                <div className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-[#0F5C4D] dark:group-hover:text-emerald-400">
                  {cat.name_ar}
                </div>
                <div className="text-xs text-stone-700 dark:text-stone-300 mt-1">
                  {count} نماذج جاهزة
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Templates Directory / List */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 font-ui">
              {searchQuery ? `نتائج البحث عن: "${searchQuery}"` : selectedCat !== 'all' ? `نماذج ${CONFIG.CATEGORIES.find((c) => c.id === selectedCat)?.name_ar}` : 'جميع نماذج الخطابات الرسمية (30)'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300">
              {filteredTemplates.length}
            </span>
          </div>

          {selectedCat !== 'all' && (
            <button
              onClick={() => setSelectedCat('all')}
              className="text-xs text-[#0F5C4D] dark:text-emerald-400 hover:underline cursor-pointer"
            >
              إلغاء التصفية
            </button>
          )}
        </div>

        {/* Templates Grid */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTemplates.map((template) => {
              const catObj = CONFIG.CATEGORIES.find((c) => c.id === template.category);
              return (
                <Link
                  key={template.slug}
                  to={`/khitab/${template.slug}`}
                  className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 hover:border-[#0F5C4D]/40 dark:hover:border-emerald-500/40 hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-700 dark:text-stone-300 mb-3">
                      <span className="flex items-center gap-1.5 font-medium text-[#0F5C4D] dark:text-emerald-400">
                        {getCategoryIcon(template.category)}
                        <span>{catObj?.name_ar}</span>
                      </span>
                      <span>{template.variants.length} صيغ مختلفة</span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#0F5C4D] dark:group-hover:text-emerald-400 transition-colors font-ui mb-2">
                      {template.title_ar}
                    </h3>

                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-2">
                      {template.meta_description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
                    <span className="text-stone-600 dark:text-stone-400 font-medium">Word + PDF</span>
                    <span className="text-[#0F5C4D] dark:text-emerald-400 font-semibold flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                      <span>اكتب الخطاب</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-8">
            <FileText className="w-12 h-12 text-stone-600 dark:text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800 dark:text-stone-200">
              لم نعثر على نموذج يطابق بحثك
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
              جرب البحث بكلمات أخرى مثل "استقالة" أو "شكوى" أو "إجازة".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCat('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-[#0F5C4D] text-white cursor-pointer"
            >
              عرض كافة النماذج
            </button>
          </div>
        )}
      </section>

      {/* How it Works Section (3 Steps) */}
      <section className="py-16 bg-stone-100/70 dark:bg-stone-900/50 border-y border-stone-200/80 dark:border-stone-800 my-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1 text-xs font-bold text-[#C8A24A] tracking-wider uppercase mb-2">
            سهل وسريع
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 font-ui">
            كيف تنشئ خطابك في 3 خطوات بسيطة؟
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-2 max-w-xl mx-auto">
            لا تحتاج لخبرة في التنسيق أو الكتابة الإدارية؛ نحن نتولى الصياغة القانونية والترتيب بالكامل.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-right">
            {/* Step 1 */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 relative shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#0F5C4D] text-white font-bold flex items-center justify-center text-base mb-4">
                1
              </div>
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-2">
                اختر نوع النموذج والصيغة
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                تصفح أكثر من 30 قالباً رسمياً معتمداً، واختر النبرة المناسبة (مفصل، مختصر، أو مع ذكر المبررات).
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 relative shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#C8A24A] text-stone-950 font-bold flex items-center justify-center text-base mb-4">
                2
              </div>
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-2">
                املأ البيانات وشاهد التحديث
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                أدخل اسمك والتواريخ والحقول المطلوبة؛ ستظهر بياناتك مباشرة داخل ورقة A4 حقيقية بتنسيق بروتوكولي راقٍ.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 relative shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#0F5C4D] text-white font-bold flex items-center justify-center text-base mb-4">
                3
              </div>
              <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-2">
                حمّل Word أو اطبع كـ PDF
              </h3>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                بنقرة واحدة، انسخ النص كاملاً أو حمّل ملف Word (.docx) أو اطبع الخطاب فوراً كملف PDF معتمد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Home FAQ Accordion Section */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-ui">
            الأسئلة الشائعة حول موقع خطابي
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1">
            إجابات واضحة ومباشرة عن الخصوصية، صيغ التنزيل، ومطابقة النماذج للأنظمة
          </p>
        </div>

        <div className="space-y-3">
          {homeFaq.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-right p-5 flex items-center justify-between font-bold text-sm text-stone-900 dark:text-stone-100 cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-600 transition-transform ${
                      isOpen ? 'rotate-180 text-[#0F5C4D]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
