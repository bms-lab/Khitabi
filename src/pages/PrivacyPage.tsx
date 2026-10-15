import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CONFIG } from '../config';
import { Lock, ShieldCheck, EyeOff, Cookie } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="سياسة الخصوصية | خطابي"
        description="سياسة الخصوصية لمنصة خطابي: نلتزم بحماية بياناتك؛ لا يتم حفظ أو جمع أي معلومات شخصية على خوادمنا."
        canonicalPath="/siyasat-al-khususiya"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'سياسة الخصوصية' }]} />

        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-12 border border-stone-200 dark:border-stone-800 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-semibold text-[#C8A24A] uppercase tracking-wider">
              حماية البيانات
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-ui mt-1">
              سياسة الخصوصية وسرية المعلومات
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              آخر تحديث: أكتوبر 2026
            </p>
          </div>

          {/* Privacy Core Guarantee Banner */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#0F5C4D] dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#0F5C4D] dark:text-emerald-300 text-sm">
                ضمان المعالجة المحلية (100% Client-Side Processing)
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed mt-1">
                تؤكد منصة خطابي أن جميع البيانات التي تدخلها في نماذج الخطابات (بما في ذلك الأسماء، أرقام الهوية، تفاصيل الرواتب، العناوين، والشعارات المرفوعة) لا تغادر متصفحك أو جهازك مطلقاً، ولا يتم إرسالها أو تخزينها على أي خادم سحابي خارجي.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed text-justify">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-ui">
                1. البيانات التي تدخلها في النماذج
              </h2>
              <p>
                تُعالج البيانات محلياً فقط داخل كود JavaScript في متصفحك لغرض توليد المعاينة المباشرة وتصدير ملفات Word (.docx) و PDF. إذا قمت بإغلاق المتصفح أو مسح ذاكرة التخزين المؤقت، فلن يبقى للبيانات أي أثر. كما نستخدم ميزة التخزين المحلي الآمن (localStorage) في متصفحك لحفظ مسودتك مؤقتاً حتى لا تضيع بياناتك عند تحديث الصفحة دون قصد.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-ui">
                2. ملفات تعريف الارتباط (Cookies) وشبكات الإعلانات
              </h2>
              <p>
                لا نستخدم ملفات تعريف الارتباط لتتبع هويتك الشخصية. ومع ذلك، قد نقوم مستقبلاً بعرض إعلانات عبر شبكات طرف ثالث معتمدة مثل Google AdSense لتمويل تكاليف استضافة وتشغيل المنصة مجاناً. قد تستخدم هذه الشبكات ملفات تعريف الارتباط لعرض إعلانات ملائمة بناءً على زياراتك السابقة لهذا الموقع أو لمواقع أخرى على الإنترنت. يمكنك في أي وقت إدارة أو إيقاف تخصيص الإعلانات عبر إعدادات إعلانات Google.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-ui">
                3. التعديلات على سياسة الخصوصية
              </h2>
              <p>
                نحتفظ بالحق في تحديث سياسة الخصوصية عند إضافة ميزات جديدة إلى المنصة. وسيتم نشر أي تحديث في هذه الصفحة مع بيان تاريخ التحديث في أعلاها.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-ui">
                4. التواصل معنا
              </h2>
              <p>
                إذا كان لديك أي استفسار أو اقتراح بخصوص سياسة الخصوصية أو سرية بياناتك، يمكنك التواصل معنا عبر البريد الإلكتروني: {CONFIG.CONTACT_EMAIL}.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
