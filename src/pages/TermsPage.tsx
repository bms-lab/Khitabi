import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CONFIG } from '../config';
import { Scale, CheckCircle2, AlertCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="شروط الاستخدام | خطابي"
        description="شروط وأحكام استخدام موقع خطابي لتوليد الخطابات والنماذج الرسمية."
        canonicalPath="/shurut"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'شروط الاستخدام' }]} />

        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-12 border border-stone-200 dark:border-stone-800 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-semibold text-[#C8A24A] uppercase tracking-wider">
              الاتفاقية والشروط
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-ui mt-1">
              شروط وأحكام الاستخدام
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              يسري هذا الاتفاق على كافة مستخدمي موقع {CONFIG.SITE_NAME}.
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed text-justify">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-ui">
                1. طبيعة الخدمة وإخلاء المسؤولية القانونية
              </h2>
              <p>
                يوفر موقع <strong>{CONFIG.SITE_NAME}</strong> قوالب ونماذج إدارية وتعبيرية استرشادية لمساعدة الأفراد في صياغة مراسلاتهم. لا تعتبر هذه النماذج بمثابة استشارة قانونية مخصصة أو تمثيل قضائي. يتحمل المستخدم المسؤولية الكاملة عن صحة البيانات المدخلة وتوافقها مع حالته وظروفه الخاصة ولوائح الجهة الموجه إليها الخطاب.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-ui">
                2. الاستخدام المسموح به
              </h2>
              <p>
                يُمنح المستخدم ترخيصاً مجانياً وغير حصري لاستخدام وطباعة وتحميل وتعديل أي نموذج متاح على المنصة لأغراضه الشخصية أو التجارية المشروعة. يحظر إعادة نشر المنصة كخدمة منافسة أو استنساخ قاعدة بيانات النماذج بصورة آلية (Web Scraping) دون إذن كتابي مسبق.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-ui">
                3. التعديلات على الموقع
              </h2>
              <p>
                نحتفظ بالحق في تحديث أو تحسين أو إضافة نماذج جديدة أو تعديل واجهة المستخدم في أي وقت لتقديم أفضل تجربة ممكنة لمستخدمينا.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 font-ui">
                4. القانون الواجب التطبيق
              </h2>
              <p>
                تخضع هذه الشروط وتفسر وفقاً للأنظمة واللوائح المعمول بها في التعاملات الإلكترونية وحماية البيانات.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
