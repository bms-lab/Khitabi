import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb } from '../components/Breadcrumb';
import { CONFIG } from '../config';
import { ShieldCheck, Heart, Sparkles, Award, FileText, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="من نحن | خطابي"
        description="تعرف على منصة خطابي، رؤيتنا ورسالتنا في توفير نماذج وخطابات رسمية معتمدة ومجانية لجميع المستخدمين في الوطن العربي."
        canonicalPath="/man-nahnu"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'من نحن' }]} />

        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-12 border border-stone-200 dark:border-stone-800 shadow-xs space-y-8">
          <div>
            <span className="text-xs font-semibold text-[#C8A24A] uppercase tracking-wider">
              عن المنصة
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-ui mt-1">
              من نحن — منصة {CONFIG.SITE_NAME}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
              {CONFIG.SITE_TAGLINE}.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed text-justify">
            <p>
              انطلقت فكرة <strong>{CONFIG.SITE_NAME}</strong> من ملاحظة حاجة ملايين الموظفين والطلاب وأصحاب الأعمال في العالم العربي إلى صيغ ونماذج خطابات رسمية وقانونية سليمة، دون الحاجة للبحث المضني في المنتديات أو دفع مبالغ لمكاتب الخدمات العامة أو التعامل مع ملفات وورد مشوهة التنسيق.
            </p>
            <p>
              صممنا خطابي ليكون أداة فائقة البساطة، سريعة، وتحترم خصوصية المستخدم بصورة مطلقة. يمكنك كتابة خطاب استقالة، طلب إجازة، خطاب تعريف بالراتب، تفويض رسمي، أو شكوى إدارية خلال أقل من دقيقة، مع معاينة حية ومباشرة بمقاس ورقة A4 وتنزيل فوري بصيغة Word (.docx) أو طباعة مباشرة بتنسيق PDF.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700">
              <ShieldCheck className="w-6 h-6 text-[#0F5C4D] dark:text-emerald-400 mb-2" />
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm mb-1">الخصوصية أولاً</div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                لا نطلب تسجيلاً أو بريداً أو كلمات مرور. بياناتك تعالج محلياً في جهازك ولا تسجل في أي قاعدة بيانات.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700">
              <Award className="w-6 h-6 text-[#C8A24A] mb-2" />
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm mb-1">صياغة قانونية متزنة</div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                نماذجنا مصاغة بلغة عربية فصحى وقورة ومطابقة لأنظمة العمل واللوائح الإدارية المعمول بها.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-700">
              <Sparkles className="w-6 h-6 text-[#0F5C4D] dark:text-emerald-400 mb-2" />
              <div className="font-bold text-stone-900 dark:text-stone-100 text-sm mb-1">مجاني للجميع</div>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                خدمة مجانية متاحة للجميع، هدفها تيسير المعاملات وتوفير الوقت والجهد على الأفراد والشركات.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
