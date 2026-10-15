import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CONFIG } from '../config';
import { Mail, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="اتصل بنا | خطابي"
        description="تواصل مع فريق منصة خطابي للاقتراحات أو لطلب نماذج خطابات جديدة."
        canonicalPath="/ittasil-bina"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'اتصل بنا' }]} />

        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-12 border border-stone-200 dark:border-stone-800 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-semibold text-[#C8A24A] uppercase tracking-wider">
              خدمة المستخدمين والملاحظات
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-ui mt-1">
              يسعدنا تواصلك معنا
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              لديك اقتراح لتحسين الموقع، أو ترغب في إضافة صيغة خطاب رسمي جديدة؟ فريق خطابي يرحب برسائلكم وملاحظاتكم دائماً.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100 dark:border-stone-800">
            {/* Direct Mail Card */}
            <div className="p-6 rounded-2xl bg-[#0F5C4D]/5 dark:bg-emerald-950/20 border border-[#0F5C4D]/20 dark:border-emerald-800 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0F5C4D] text-white flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-1">
                  البريد الإلكتروني المباشر
                </h3>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  يمكنك مراسلتنا مباشرة على بريد الدعم الفني وسنرد عليك في أقرب وقت:
                </p>
                <div className="font-mono text-sm font-semibold text-[#0F5C4D] dark:text-emerald-400 select-all py-1">
                  {CONFIG.CONTACT_EMAIL}
                </div>
              </div>

              <a
                href={`mailto:${CONFIG.CONTACT_EMAIL}?subject=رسالة من مستخدم منصة خطابي`}
                className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F5C4D] text-white text-xs font-semibold hover:bg-[#0c4a3e] transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>إرسال بريد إلكتروني الآن</span>
              </a>
            </div>

            {/* Suggestions & Response Time */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900 dark:text-stone-100">
                <Clock className="w-5 h-5 text-[#C8A24A]" />
                <span>سرعة الاستجابة</span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                نراجع كافة الرسائل الواردة بانتظام، ونهتم بإضافة النماذج المقترحة الأكثر طلباً إلى المنصة في التحديثات الدورية.
              </p>

              <div className="pt-4 border-t border-stone-200/60 dark:border-stone-700 space-y-2">
                <div className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                  ما يمكنك مراسلتنا بشأنه:
                </div>
                <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-1.5 list-disc list-inside">
                  <li>طلب صيغة خطاب لم تجدها في الموقع</li>
                  <li>اقتراح تحسين في واجهة المستخدم أو المعاينة</li>
                  <li>الإبلاغ عن خطأ لغوي أو صياغة نظامية</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
