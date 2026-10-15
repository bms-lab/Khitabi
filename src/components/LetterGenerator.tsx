import React, { useState, useEffect, useRef } from 'react';
import { LetterTemplate, LetterVariant } from '../types/template';
import { CONFIG, CountryId } from '../config';
import { getFullDateString, convertToArabicIndicDigits } from '../utils/date';
import { saveFormState, loadFormState, clearFormState } from '../utils/storage';
import { exportToDocx } from '../utils/docxExport';
import {
  Copy,
  Download,
  Printer,
  RotateCcw,
  Check,
  Building,
  Image as ImageIcon,
  Calendar,
  Globe,
  Sliders,
  Eye,
  FileCheck,
  Trash2,
  HelpCircle,
  Share2,
} from 'lucide-react';

interface LetterGeneratorProps {
  template: LetterTemplate;
}

export const LetterGenerator: React.FC<LetterGeneratorProps> = ({ template }) => {
  // Selected variant
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    template.variants[0]?.id || ''
  );

  // Country selection
  const [selectedCountry, setSelectedCountry] = useState<CountryId>('sa');

  // Calendar preference: 'hijri' | 'gregorian' | 'both'
  const [calendarType, setCalendarType] = useState<'hijri' | 'gregorian' | 'both'>('hijri');

  // Arabic digits preference (١٢٣)
  const [useArabicDigits, setUseArabicDigits] = useState<boolean>(false);

  // Letterhead options
  const [showLetterhead, setShowLetterhead] = useState<boolean>(false);
  const [orgName, setOrgName] = useState<string>('');
  const [logoDataUrl, setLogoDataUrl] = useState<string>('');

  // Editable headers
  const [recipient, setRecipient] = useState<string>(template.defaultRecipient_ar || 'سعادة المسؤول المحترم');
  const [subject, setSubject] = useState<string>(template.defaultSubject_ar || `الموضوع: ${template.title_ar}`);
  const [salutation, setSalutation] = useState<string>('السلام عليكم ورحمة الله وبركاته، تحية طيبة وبعد:');
  const [closing, setClosing] = useState<string>('وتقبلوا فائق الاحترام والتقدير،،،');

  // Dynamic template fields values
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    template.fields.forEach((f) => {
      initial[f.id] = f.defaultValue || '';
    });
    return initial;
  });

  // Sender / Signer block
  const [senderName, setSenderName] = useState<string>('');
  const [senderTitle, setSenderTitle] = useState<string>('');
  const [senderContact, setSenderContact] = useState<string>('');

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [isExportingDocx, setIsExportingDocx] = useState<boolean>(false);
  const [activeTabMobile, setActiveTabMobile] = useState<'edit' | 'preview'>('edit');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved draft on mount
  useEffect(() => {
    const saved = loadFormState(template.slug);
    if (saved) {
      if (saved.recipient) setRecipient(saved.recipient);
      if (saved.subject) setSubject(saved.subject);
      if (saved.salutation) setSalutation(saved.salutation);
      if (saved.closing) setClosing(saved.closing);
      if (saved.senderName) setSenderName(saved.senderName);
      if (saved.senderTitle) setSenderTitle(saved.senderTitle);
      if (saved.senderContact) setSenderContact(saved.senderContact);
      if (saved.orgName) setOrgName(saved.orgName);
      if (saved.logoDataUrl) setLogoDataUrl(saved.logoDataUrl);
      if (saved.selectedCountry) setSelectedCountry(saved.selectedCountry as CountryId);
      if (saved.calendarType) setCalendarType(saved.calendarType as any);
      if (saved.selectedVariantId) setSelectedVariantId(saved.selectedVariantId);

      // Load fields
      const loadedFields: Record<string, string> = {};
      template.fields.forEach((f) => {
        if (saved[`field_${f.id}`] !== undefined) {
          loadedFields[f.id] = saved[`field_${f.id}`];
        }
      });
      if (Object.keys(loadedFields).length > 0) {
        setFieldValues((prev) => ({ ...prev, ...loadedFields }));
      }
    }
  }, [template.slug]);

  // Adjust defaults when country changes
  const handleCountryChange = (countryId: CountryId) => {
    setSelectedCountry(countryId);
    const c = CONFIG.COUNTRIES.find((item) => item.id === countryId);
    if (c) {
      setCalendarType(c.defaultCalendar as any);
      if (!recipient.includes(c.salutationSuffix)) {
        // Subtle formula update if desired
      }
    }
  };

  // Auto-save drafts
  useEffect(() => {
    const stateToSave: Record<string, string> = {
      recipient,
      subject,
      salutation,
      closing,
      senderName,
      senderTitle,
      senderContact,
      orgName,
      logoDataUrl,
      selectedCountry,
      calendarType,
      selectedVariantId,
    };
    Object.entries(fieldValues).forEach(([k, v]) => {
      stateToSave[`field_${k}`] = v;
    });
    saveFormState(template.slug, stateToSave);
  }, [
    recipient,
    subject,
    salutation,
    closing,
    senderName,
    senderTitle,
    senderContact,
    orgName,
    logoDataUrl,
    selectedCountry,
    calendarType,
    selectedVariantId,
    fieldValues,
    template.slug,
  ]);

  // Keep senderName in sync if there's a field for employee_name or applicant_name
  const handleFieldChange = (fieldId: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [fieldId]: value }));
    if (
      !senderName ||
      senderName === fieldValues['employee_name'] ||
      senderName === fieldValues['applicant_name'] ||
      senderName === fieldValues['complainant_name'] ||
      senderName === fieldValues['authorizer_name'] ||
      senderName === fieldValues['declarant_name'] ||
      senderName === fieldValues['student_name']
    ) {
      if (
        fieldId === 'employee_name' ||
        fieldId === 'applicant_name' ||
        fieldId === 'complainant_name' ||
        fieldId === 'authorizer_name' ||
        fieldId === 'declarant_name' ||
        fieldId === 'student_name'
      ) {
        setSenderName(value);
      }
    }
    if (fieldId === 'job_title') {
      setSenderTitle(value);
    }
  };

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('حجم الصورة كبير جداً، يرجى اختيار صورة أقل من 2 ميغابايت');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoDataUrl(event.target?.result as string);
        setShowLetterhead(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Compute live letter text based on current variant and placeholders
  const currentVariant =
    template.variants.find((v) => v.id === selectedVariantId) || template.variants[0];

  const renderProcessedBody = () => {
    if (!currentVariant) return '';
    let text = currentVariant.body;

    template.fields.forEach((field) => {
      const val = fieldValues[field.id];
      const placeholderRegex = new RegExp(`\\{${field.id}\\}`, 'g');
      if (val && val.trim()) {
        const processedVal = useArabicDigits ? convertToArabicIndicDigits(val) : val;
        text = text.replace(placeholderRegex, processedVal);
      } else {
        // Highlight missing or unreplaced placeholder with clear label
        text = text.replace(placeholderRegex, `[ ${field.label_ar} ]`);
      }
    });

    // Also replace subject or recipient if they exist in variant
    text = text.replace(/\{recipient\}/g, recipient);
    text = text.replace(/\{subject\}/g, subject);

    return text;
  };

  const processedBody = renderProcessedBody();
  const dateFormatted = getFullDateString(calendarType, new Date(), useArabicDigits);

  // Copy Full Text
  const handleCopyText = async () => {
    const fullText = [
      orgName ? `${orgName}\n` : '',
      `التاريخ: ${dateFormatted}`,
      recipient,
      salutation,
      subject ? `\n${subject}\n` : '',
      processedBody,
      `\n${closing}\n`,
      senderTitle || 'مقدم الطلب:',
      senderName,
      senderContact,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = fullText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Word (.docx) Export
  const handleDownloadDocx = async () => {
    setIsExportingDocx(true);
    try {
      const paragraphs = processedBody.split('\n\n').filter((p) => p.trim().length > 0);
      await exportToDocx({
        title: template.title_ar,
        recipient,
        salutation,
        subject,
        paragraphs,
        closing,
        dateStr: dateFormatted,
        senderName: senderName || 'الموقع أدناه',
        senderTitle: senderTitle || 'مقدم الطلب',
        senderContact: senderContact || '',
        orgName: showLetterhead ? orgName : undefined,
        logoDataUrl: showLetterhead ? logoDataUrl : undefined,
      });
    } catch (err) {
      console.error('Failed to export docx', err);
      alert('حدث خطأ أثناء تصدير ملف الوورد، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsExportingDocx(false);
    }
  };

  // PDF / Print
  const handlePrint = () => {
    window.print();
  };

  // Reset form
  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في مسح كافة الحقول والبدء من جديد؟')) {
      clearFormState(template.slug);
      const emptyFields: Record<string, string> = {};
      template.fields.forEach((f) => {
        emptyFields[f.id] = f.defaultValue || '';
      });
      setFieldValues(emptyFields);
      setRecipient(template.defaultRecipient_ar || 'سعادة المسؤول المحترم');
      setSubject(template.defaultSubject_ar || `الموضوع: ${template.title_ar}`);
      setSenderName('');
      setSenderTitle('');
      setSenderContact('');
      setOrgName('');
      setLogoDataUrl('');
      setShowLetterhead(false);
    }
  };

  return (
    <div className="w-full">
      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex items-center p-1 bg-stone-200/70 dark:bg-stone-800 rounded-xl mb-6">
        <button
          onClick={() => setActiveTabMobile('edit')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTabMobile === 'edit'
              ? 'bg-white dark:bg-stone-900 text-[#0F5C4D] dark:text-emerald-400 shadow-xs'
              : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>تعبئة البيانات</span>
        </button>
        <button
          onClick={() => setActiveTabMobile('preview')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTabMobile === 'preview'
              ? 'bg-white dark:bg-stone-900 text-[#0F5C4D] dark:text-emerald-400 shadow-xs'
              : 'text-stone-600 dark:text-stone-400'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>معاينة الخطاب A4</span>
        </button>
      </div>

      {/* Main Grid: Form on one side, Live Preview on the other */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Form Controls (lg:col-span-5 or 6) */}
        <div className={`lg:col-span-6 space-y-6 ${activeTabMobile === 'preview' ? 'hidden lg:block' : 'block'}`}>
          {/* Variant Selector Card */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs">
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8A24A]"></span>
              اختر صيغة الخطاب المناسبة:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {template.variants.map((v) => {
                const isSelected = v.id === selectedVariantId;
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantId(v.id)}
                    className={`p-3 rounded-xl text-right border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0F5C4D] bg-[#0F5C4D]/5 dark:border-emerald-500 dark:bg-emerald-950/30 text-[#0F5C4D] dark:text-emerald-300 font-bold shadow-xs'
                        : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="text-sm font-semibold flex items-center justify-between">
                      <span>{v.name_ar}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#0F5C4D] dark:text-emerald-400" />}
                    </div>
                    {v.description_ar && (
                      <div className="text-xs font-normal text-stone-600 dark:text-stone-400 mt-1 line-clamp-1">
                        {v.description_ar}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Localization & Country Settings */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <div className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0F5C4D] dark:text-emerald-400" />
                تخصيص الصيغة والدولة:
              </span>
              <span className="text-[11px] font-normal text-stone-600 dark:text-stone-400">
                يعدّل التاريخ وصيغ المخاطبة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Country Selector */}
              <div>
                <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                  الدولة الموجه إليها الخطاب
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value as CountryId)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                >
                  {CONFIG.COUNTRIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name_ar}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calendar Type */}
              <div>
                <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                  صيغة التاريخ
                </label>
                <select
                  value={calendarType}
                  onChange={(e) => setCalendarType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                >
                  <option value="hijri">تاريخ هجري (أم القرى)</option>
                  <option value="gregorian">تاريخ ميلادي</option>
                  <option value="both">كلاهما (هجري وميلادي)</option>
                </select>
              </div>
            </div>

            {/* Arabic-Indic Digits Switcher */}
            <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-100 dark:border-stone-800">
              <span className="text-stone-600 dark:text-stone-400">
                استخدام الأرقام المشرقية (١، ٢، ٣)
              </span>
              <button
                type="button"
                onClick={() => setUseArabicDigits(!useArabicDigits)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  useArabicDigits ? 'bg-[#0F5C4D]' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    useArabicDigits ? '-translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Letterhead & Logo Upload (Optional) */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-2 cursor-pointer">
                <Building className="w-4 h-4 text-[#0F5C4D] dark:text-emerald-400" />
                إضافة ترويسة أو شعار منشأة (اختياري)
              </label>
              <button
                type="button"
                onClick={() => setShowLetterhead(!showLetterhead)}
                className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  showLetterhead
                    ? 'bg-[#0F5C4D]/10 text-[#0F5C4D] dark:text-emerald-400'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                }`}
              >
                {showLetterhead ? 'مُفعّل' : 'تفعيل الترويسة'}
              </button>
            </div>

            {showLetterhead && (
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-3 animate-in fade-in duration-200">
                <div>
                  <label className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 mb-1">
                    اسم الشركة أو الجهة المصدرة
                  </label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="مثال: شركة التطوير الوطنية المحدودة"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>{logoDataUrl ? 'تغيير الشعار' : 'رفع الشعار (لوجو)'}</span>
                  </button>

                  {logoDataUrl && (
                    <button
                      type="button"
                      onClick={() => setLogoDataUrl('')}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg cursor-pointer"
                      title="حذف الشعار"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <span className="text-[11px] text-stone-600 dark:text-stone-400">
                    يحفظ في المتصفح فقط
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Form Fields Card */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <div className="text-sm font-bold text-stone-900 dark:text-stone-100 pb-2 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <span>بيانات الخطاب الأساسية</span>
              <span className="text-xs font-normal text-stone-600 dark:text-stone-400">
                املأ الحقول لتحديث المعاينة مباشرة
              </span>
            </div>

            {/* Recipient & Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  المرسل إليه (الموجه له الخطاب) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                  placeholder="سعادة المدير العام المحترم"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                  موضوع الخطاب
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                  placeholder="الموضوع: ..."
                />
              </div>
            </div>

            {/* Dynamic Template Fields */}
            {template.fields.map((field) => {
              const val = fieldValues[field.id] || '';
              return (
                <div key={field.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300">
                      {field.label_ar} {field.required && <span className="text-rose-500">*</span>}
                    </label>
                    {field.hint_ar && (
                      <span className="text-[10px] text-stone-600 dark:text-stone-400">
                        {field.hint_ar}
                      </span>
                    )}
                  </div>

                  {field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={val}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder_ar}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D] leading-relaxed"
                    />
                  ) : field.type === 'select' && field.options_ar ? (
                    <select
                      value={val}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                    >
                      <option value="">{field.placeholder_ar}</option>
                      {field.options_ar.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                      value={val}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder_ar}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                    />
                  )}
                </div>
              );
            })}

            {/* Signer Block Details */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-3">
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block">
                توقيع وبيانات مقدم الخطاب:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-stone-600 dark:text-stone-400 mb-1">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="اسمك الكامل"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 dark:text-stone-400 mb-1">
                    المسمى / الصفة
                  </label>
                  <input
                    type="text"
                    value={senderTitle}
                    onChange={(e) => setSenderTitle(e.target.value)}
                    placeholder="مقدم الطلب / المسمى"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 dark:text-stone-400 mb-1">
                    وسيلة التواصل
                  </label>
                  <input
                    type="text"
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    placeholder="رقم الهاتف أو البريد"
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-1 focus:ring-[#0F5C4D]"
                  />
                </div>
              </div>
            </div>

            {/* Form Footer Action */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleReset}
                className="text-stone-600 dark:text-stone-400 hover:text-rose-500 dark:hover:text-rose-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة تعيين ومسح الحقول</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTabMobile('preview')}
                className="lg:hidden text-[#0F5C4D] dark:text-emerald-400 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>معاينة الخطاب</span>
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Live A4 Paper Preview + Action Buttons (lg:col-span-6) */}
        <div className={`lg:col-span-6 space-y-4 ${activeTabMobile === 'edit' ? 'hidden lg:block' : 'block'}`}>
          {/* Action Toolbar */}
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-wrap items-center justify-between gap-3 sticky top-22 z-30">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                معاينة مباشرة (A4)
              </span>
            </div>

            {/* Action Buttons: Copy, Word, Print / PDF */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Copy Text */}
              <button
                onClick={handleCopyText}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="نسخ النص كاملاً للحافظة"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-600" />}
                <span>{copied ? 'تم النسخ!' : 'نسخ النص'}</span>
              </button>

              {/* Download Word (.docx) */}
              <button
                onClick={handleDownloadDocx}
                disabled={isExportingDocx}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#0F5C4D] hover:bg-[#0c4a3e] text-white flex items-center gap-1.5 shadow-sm shadow-[#0F5C4D]/20 transition-all cursor-pointer disabled:opacity-50"
                title="تحميل ملف وورد جاهز ومفتوح للتعديل"
              >
                <Download className="w-4 h-4" />
                <span>{isExportingDocx ? 'جارٍ التحميل...' : 'تحميل Word'}</span>
              </button>

              {/* Print / Save PDF */}
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#C8A24A] hover:bg-[#b08d3a] text-stone-950 flex items-center gap-1.5 shadow-sm shadow-[#C8A24A]/20 transition-all cursor-pointer"
                title="طباعة الخطاب مباشرة أو حفظه بصيغة PDF"
              >
                <Printer className="w-4 h-4" />
                <span>طباعة / حفظ PDF</span>
              </button>
            </div>
          </div>

          {/* Hint for PDF Print */}
          <div className="text-[11px] text-stone-600 dark:text-stone-400 bg-stone-100/70 dark:bg-stone-900/60 rounded-xl px-4 py-2 flex items-center justify-between border border-stone-200/60 dark:border-stone-800">
            <span>💡 نصيحة: لحفظ الخطاب بصيغة PDF، اضغط زر الطباعة ثم اختر الوجهة <strong>"حفظ بتنسيق PDF"</strong>.</span>
          </div>

          {/* A4 Realistic Paper Container */}
          <div className="overflow-x-auto pb-4">
            <div
              id="printable-letter"
              className="paper-sheet mx-auto w-full max-w-[210mm] min-h-[297mm] bg-white text-stone-900 p-8 sm:p-14 rounded-xl border border-stone-200/90 font-paper leading-loose text-base relative shadow-md"
              style={{ direction: 'rtl' }}
            >
              {/* Optional Organization Letterhead */}
              {showLetterhead && (
                <div className="border-b-2 border-stone-800 pb-5 mb-8 flex items-center justify-between">
                  <div className="text-right">
                    {orgName && <div className="text-lg font-bold text-stone-900 font-ui">{orgName}</div>}
                    <div className="text-xs text-stone-600 font-ui mt-0.5">خطاب رسمي معتمد</div>
                  </div>
                  {logoDataUrl && (
                    <div className="h-14 max-w-[140px] flex items-center justify-end">
                      <img src={logoDataUrl} alt="شعار المنشأة" className="max-h-14 object-contain" />
                    </div>
                  )}
                </div>
              )}

              {/* Date Block */}
              <div className="flex justify-between items-center text-xs text-stone-600 mb-8 font-ui">
                <div></div>
                <div className="text-left font-medium">
                  التاريخ: <span className="font-semibold text-stone-900">{dateFormatted}</span>
                </div>
              </div>

              {/* Recipient */}
              <div className="text-base sm:text-lg font-bold text-stone-900 mb-3 font-paper">
                {recipient}
              </div>

              {/* Salutation */}
              <div className="text-sm sm:text-base text-stone-800 mb-6 font-paper">
                {salutation}
              </div>

              {/* Subject Line */}
              {subject && (
                <div className="text-center my-6">
                  <span className="inline-block text-base sm:text-lg font-bold text-stone-900 border-b-2 border-stone-800 pb-1 font-paper">
                    {subject}
                  </span>
                </div>
              )}

              {/* Main Body with Paragraphs */}
              <div className="text-stone-900 space-y-4 text-sm sm:text-base text-justify leading-relaxed font-paper whitespace-pre-line">
                {processedBody}
              </div>

              {/* Closing */}
              <div className="text-center my-8 text-sm sm:text-base font-bold text-stone-800 font-paper">
                {closing}
              </div>

              {/* Signatures and Signer Line (Traditional bottom-left in Arabic) */}
              <div className="mt-12 pt-4 flex flex-col items-start gap-1 text-sm font-paper">
                <div className="text-xs text-stone-600 font-ui">
                  {senderTitle || 'مقدم الطلب:'}
                </div>
                <div className="text-base font-bold text-stone-900">
                  {senderName || '...........................................'}
                </div>
                {senderContact && (
                  <div className="text-xs text-stone-600 font-ui mt-0.5">
                    وسيلة التواصل: {senderContact}
                  </div>
                )}
                <div className="mt-4 text-xs text-stone-600 font-ui">
                  التوقيع: ...........................................
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
