/**
 * Configuration for Khitabi (خطابي)
 * All site-wide settings, metadata, and monetization toggles.
 */

export const CONFIG = {
  SITE_NAME: 'خطابي',
  SITE_NAME_EN: 'Khitabi',
  SITE_TAGLINE: 'اكتب خطابك الرسمي في دقيقة واحدة — مجاناً وبدون تسجيل',
  SITE_DESCRIPTION: 'أداة عربية مجانية لتوليد الخطابات والنماذج الرسمية (استقالة، إجازة، تعريف بالراتب، تفويض، شكاوى) جاهزة للطباعة والتنزيل بصيغة Word و PDF.',
  SITE_URL: 'https://khitabi.com',
  CONTACT_EMAIL: 'contact@khitabi.com',
  
  // Monetization flags (Zero ads displayed when ADS_ENABLED is false)
  ADS_ENABLED: false,
  ADSENSE_CLIENT: 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with your AdSense client ID when ready
  
  // Supported countries and their localized defaults
  COUNTRIES: [
    { id: 'sa', name_ar: 'المملكة العربية السعودية', defaultCalendar: 'hijri', defaultCity: 'الرياض', salutationSuffix: 'حفظه الله ورعاه' },
    { id: 'ae', name_ar: 'الإمارات العربية المتحدة', defaultCalendar: 'gregorian', defaultCity: 'أبوظبي', salutationSuffix: 'المحترم' },
    { id: 'eg', name_ar: 'جمهورية مصر العربية', defaultCalendar: 'gregorian', defaultCity: 'القاهرة', salutationSuffix: 'الموقر' },
    { id: 'kw', name_ar: 'دولة الكويت', defaultCalendar: 'gregorian', defaultCity: 'الكويت', salutationSuffix: 'المحترم' },
    { id: 'qa', name_ar: 'دولة قطر', defaultCalendar: 'gregorian', defaultCity: 'الدوحة', salutationSuffix: 'الموقر' },
    { id: 'jo', name_ar: 'المملكة الأردنية الهاشمية', defaultCalendar: 'gregorian', defaultCity: 'عمان', salutationSuffix: 'المحترم' },
    { id: 'ma', name_ar: 'المملكة المغربية', defaultCalendar: 'gregorian', defaultCity: 'الرباط', salutationSuffix: 'المحترم' },
    { id: 'general', name_ar: 'عام / دولة أخرى', defaultCalendar: 'gregorian', defaultCity: 'المدينة', salutationSuffix: 'المحترم' },
  ] as const,

  CATEGORIES: [
    {
      id: 'work',
      name_ar: 'العمل والوظيفة',
      icon: 'Briefcase',
      description_ar: 'نماذج خطابات الموارد البشرية، الاستقالة، طلب الإجازات، التعريف بالراتب، وشهادات الخبرة وفق معايير أنظمة العمل.',
    },
    {
      id: 'education',
      name_ar: 'التعليم والتدريب',
      icon: 'GraduationCap',
      description_ar: 'صيغ ونماذج للجامعات، المدارس، التدريب التعاوني، التوصيات الأكاديمية وطلبات الغياب المبرر.',
    },
    {
      id: 'government',
      name_ar: 'المعاملات الحكومية',
      icon: 'Landmark',
      description_ar: 'صيغ المعاريض والخطابات الموجهة للوزارات، الدوائر الحكومية، المحاكم، والتفويضات الرسمية المعتمدة.',
    },
    {
      id: 'finance',
      name_ar: 'المالية والمطالبات',
      icon: 'Coins',
      description_ar: 'نماذج المطالبات المالية، طلبات السلف، استرداد المبالغ، والكمبيالات والإقرارات المالية.',
    },
    {
      id: 'personal',
      name_ar: 'الطلبات الشخصية',
      icon: 'UserCheck',
      description_ar: 'خطابات الشكاوى، الاعتذار، التهنئة الرسمية، طلب المساعدات الإنسانية والالتماسات الشخصية.',
    },
  ] as const,
};

export type CategoryId = typeof CONFIG.CATEGORIES[number]['id'];
export type CountryId = typeof CONFIG.COUNTRIES[number]['id'];
