import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getTemplateBySlug, getRelatedTemplates, TEMPLATES } from '../data/templates';
import { CONFIG } from '../config';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumb, buildBreadcrumbSchema } from '../components/Breadcrumb';
import { LetterGenerator } from '../components/LetterGenerator';
import { AdSlot } from '../components/AdSlot';
import {
  FileText,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  Share2,
  Check,
} from 'lucide-react';

export const TemplatePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const template = slug ? getTemplateBySlug(slug) : undefined;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!template) {
    return <Navigate to="/404" replace />;
  }

  const categoryObj = CONFIG.CATEGORIES.find((c) => c.id === template.category);
  const relatedLetters = getRelatedTemplates(template);

  // Share handler
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: template.title_ar,
          text: template.meta_description,
          url: window.location.href,
        });
      } catch {
        // User cancelled or unsupported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Structured Data: FAQPage + BreadcrumbList
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: template.faq_ar.map((item) => ({
      '@type': 'Question',
      name: item.question_ar,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer_ar,
      },
    })),
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: categoryObj ? categoryObj.name_ar : 'التصنيف', url: `/tasnif/${template.category}` },
    { name: template.title_ar, url: `/khitab/${template.slug}` },
  ]);

  const combinedSchemas = [faqSchema, breadcrumbSchema];

  return (
    <>
      <SEOHead
        title={template.seo_title}
        description={template.meta_description}
        canonicalPath={`/khitab/${template.slug}`}
        jsonLd={combinedSchemas}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: categoryObj ? categoryObj.name_ar : 'التصنيف', url: `/tasnif/${template.category}` },
            { label: template.title_ar },
          ]}
        />

        {/* Header Title & Intro Banner */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F5C4D] dark:text-emerald-400 mb-2">
                <span>قسم {categoryObj?.name_ar}</span>
                <span>·</span>
                <span>جاهز للطباعة والتحميل</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-stone-100 font-ui tracking-tight">
                {template.seo_title}
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 max-w-3xl leading-relaxed">
                {template.meta_description}
              </p>
            </div>

            {/* Share / Copy link button */}
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <button
                onClick={handleShare}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="مشاركة هذا النموذج"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'تم نسخ الرابط' : 'مشاركة'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Interactive Generator Tool */}
        <section className="mb-14">
          <LetterGenerator template={template} />
        </section>

        {/* Reserved Ad Slot: Top of Guide */}
        <AdSlot slot="top_guide" />

        {/* Detailed Guide Content (SEO & Education) */}
        <section className="my-12 bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200 dark:border-stone-800 shadow-xs">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100 dark:border-stone-800">
            <div className="w-10 h-10 rounded-xl bg-[#0F5C4D]/10 dark:bg-emerald-950/40 text-[#0F5C4D] dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-ui">
                دليل كتابة {template.title_ar}: الشروط، النصائح، والأخطاء الشائعة
              </h2>
              <p className="text-xs text-stone-700 dark:text-stone-300">
                إرشادات قانونية وإدارية لضمان قبول خطابك رسمياً لدى الجهة المعنية
              </p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-loose whitespace-pre-line text-justify font-ui">
            {template.guide_content_ar}
          </div>
        </section>

        {/* Reserved Ad Slot: Between Guide & FAQ */}
        <AdSlot slot="between_guide_faq" />

        {/* FAQ Section */}
        {template.faq_ar && template.faq_ar.length > 0 && (
          <section className="my-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#C8A24A]/10 dark:bg-amber-950/40 text-[#C8A24A] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-ui">
                  الأسئلة الشائعة حول {template.title_ar}
                </h2>
                <p className="text-xs text-stone-700 dark:text-stone-300">
                  إجابات عن أهم الاستفسارات النظامية والإجرائية
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {template.faq_ar.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-right p-4 sm:p-5 flex items-center justify-between font-bold text-sm text-stone-900 dark:text-stone-100 cursor-pointer"
                    >
                      <span>{faq.question_ar}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-600 transition-transform ${
                          isOpen ? 'rotate-180 text-[#0F5C4D]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3">
                        {faq.answer_ar}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Letters Section */}
        {relatedLetters.length > 0 && (
          <section className="my-12 pt-8 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100 font-ui">
                نماذج خطابات ذات صلة قد تهمك
              </h2>
              <Link
                to={`/tasnif/${template.category}`}
                className="text-xs text-[#0F5C4D] dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
              >
                <span>المزيد من نماذج {categoryObj?.name_ar}</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedLetters.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/khitab/${rel.slug}`}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#0F5C4D] dark:hover:border-emerald-500 transition-all group flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#0F5C4D]/10 dark:bg-emerald-950/40 text-[#0F5C4D] dark:text-emerald-400 flex items-center justify-center mb-2.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-[#0F5C4D] dark:group-hover:text-emerald-400 mb-1">
                      {rel.title_ar}
                    </div>
                    <div className="text-xs text-stone-700 dark:text-stone-300 line-clamp-2">
                      {rel.meta_description}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-[#0F5C4D] dark:text-emerald-400 font-semibold">
                    <span>توليد الخطاب</span>
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};
