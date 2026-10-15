import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../config';
import { TEMPLATES_MAP, POPULAR_TEMPLATES_SLUGS } from '../data/templates';
import { ShieldCheck, Heart, Sparkles, Lock, Printer, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 pt-12 pb-8 text-stone-600 dark:text-stone-400 font-ui text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust & Privacy Reassurance Banner */}
        <div className="bg-white dark:bg-stone-800/80 rounded-2xl p-6 mb-12 border border-stone-200/80 dark:border-stone-700 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-right">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0F5C4D]/10 dark:bg-emerald-950/50 flex items-center justify-center text-[#0F5C4D] dark:text-emerald-400 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">خصوصية تامة 100%</div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">بياناتك تعالج في متصفحك فقط ولا ترسل لأي خادم إطلاقاً.</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C8A24A]/10 dark:bg-amber-950/40 flex items-center justify-center text-[#C8A24A] shrink-0">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">تنزيل وورد Word و PDF</div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">خطابات منسقة بمحاذاة اليمين وخطوط عربية أصيلة.</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0F5C4D]/10 dark:bg-emerald-950/50 flex items-center justify-center text-[#0F5C4D] dark:text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm">مجاني وبدون تسجيل</div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">لا حاجة لإنشاء حساب أو إدخال بريدك الإلكتروني.</div>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0F5C4D] flex items-center justify-center text-white">
                <span className="font-bold text-sm">خ</span>
              </div>
              <span className="text-xl font-bold text-[#0F5C4D] dark:text-emerald-400 font-ui">
                {CONFIG.SITE_NAME}
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {CONFIG.SITE_TAGLINE}. منصة عربية مفتوحة ومجانية لصياغة وتوليد الخطابات والنماذج الرسمية والقانونية الجاهزة للطباعة والتحميل الفوري.
            </p>
          </div>

          {/* Categories Links */}
          <div>
            <div className="font-bold text-stone-900 dark:text-stone-100 text-sm mb-4">
              أقسام النماذج
            </div>
            <ul className="space-y-2 text-xs">
              {CONFIG.CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/tasnif/${cat.id}`}
                    className="hover:text-[#0F5C4D] dark:hover:text-emerald-400 transition-colors"
                  >
                    نماذج {cat.name_ar}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top 10 Most Popular Letters */}
          <div>
            <div className="font-bold text-stone-900 dark:text-stone-100 text-sm mb-4">
              النماذج الأكثر طلباً
            </div>
            <ul className="space-y-2 text-xs">
              {POPULAR_TEMPLATES_SLUGS.slice(0, 7).map((slug) => {
                const t = TEMPLATES_MAP[slug];
                if (!t) return null;
                return (
                  <li key={slug}>
                    <Link
                      to={`/khitab/${slug}`}
                      className="hover:text-[#0F5C4D] dark:hover:text-emerald-400 transition-colors"
                    >
                      {t.title_ar}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal and Support */}
          <div>
            <div className="font-bold text-stone-900 dark:text-stone-100 text-sm mb-4">
              عن المنصة والمساعدة
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/man-nahnu" className="hover:text-[#0F5C4D] dark:hover:text-emerald-400 transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/siyasat-al-khususiya" className="hover:text-[#0F5C4D] dark:hover:text-emerald-400 transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/shurut" className="hover:text-[#0F5C4D] dark:hover:text-emerald-400 transition-colors">
                  شروط الاستخدام
                </Link>
              </li>
              <li>
                <Link to="/ittasil-bina" className="hover:text-[#0F5C4D] dark:hover:text-emerald-400 transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 dark:text-stone-400 gap-4">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {CONFIG.SITE_NAME} — أداة مجانية للجميع
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>صُنع بإتقان للغة العربية</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
