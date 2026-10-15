import { LetterTemplate } from '../../types/template';

export const khitabArdWadhifi: LetterTemplate = {
  slug: 'khitab-ard-wadhifi',
  title_ar: 'خطاب عرض وظيفي (Job Offer)',
  category: 'work',
  seo_title: 'نموذج خطاب عرض وظيفي رسمي جاهز للشركات والمؤسسات مجاناً',
  meta_description: 'صيغة خطاب عرض عمل ووظيفة رسمي يتضمن المسمى والراتب والبدلات وفترة التجربة وموعد المباشرة، قابل للتحميل بصيغة Word و PDF.',
  defaultRecipient_ar: 'إلى الأستاذ / الأستاذة المكرم / المكرمة',
  defaultSubject_ar: 'الموضوع: عرض وظيفي لشغل منصب ({job_title})',
  fields: [
    { id: 'candidate_name', label_ar: 'اسم المرشح', type: 'text', required: true, placeholder_ar: 'سعد بن عبد الرحمن الراجحي' },
    { id: 'job_title', label_ar: 'المسمى الوظيفي المعروض', type: 'text', required: true, placeholder_ar: 'رئيس قسم المبيعات' },
    { id: 'company_name', label_ar: 'اسم المنشأة أو الشركة', type: 'text', required: true, placeholder_ar: 'شركة الأفق اللوجستية' },
    { id: 'work_location', label_ar: 'مقر العمل (المدينة)', type: 'text', required: true, placeholder_ar: 'مدينة الرياض' },
    { id: 'basic_salary', label_ar: 'الراتب الأساسي الشهري', type: 'number', required: true, placeholder_ar: '15000' },
    { id: 'housing_allowance', label_ar: 'بدل السكن', type: 'number', required: true, placeholder_ar: '3750' },
    { id: 'transport_allowance', label_ar: 'بدل النقل', type: 'number', required: true, placeholder_ar: '1500' },
    { id: 'probation_period', label_ar: 'فترة التجربة', type: 'text', required: true, placeholder_ar: '90 يوماً قابلة للتمديد لـ 180 يوماً' },
    { id: 'expected_start_date', label_ar: 'تاريخ المباشرة المتوقع', type: 'date', required: true, placeholder_ar: '2026-11-01' },
    { id: 'offer_validity_days', label_ar: 'صلاحية العرض (أيام)', type: 'number', required: true, placeholder_ar: '7' },
  ],
  variants: [
    {
      id: 'detailed',
      name_ar: 'عرض وظيفي رسمي متكامل',
      description_ar: 'صيغة احترافية توضح كافة البنود المالية والتعاقدية وآلية القبول والتوقيع.',
      body: `يسر إدارة ({company_name}) أن تتقدم إليكم بهذا العرض الوظيفي للانضمام إلى فريق عملنا المتميز، وذلك بعد اجتيازكم المقابلات الشخصية وتقييم الكفاءة بنجاح، وفقاً للشروط والامتيازات التالية:

1. المسمى الوظيفي: ({job_title})
2. مقر العمل: ({work_location})
3. الامتيازات المالية الشهرية:
   - الراتب الأساسي: ({basic_salary})
   - بدل السكن الشهري: ({housing_allowance})
   - بدل النقل الشهري: ({transport_allowance})
   - إجمالي الراتب الشهري: ({basic_salary} + {housing_allowance} + {transport_allowance})
4. المزايا الإضافية: تأمين طبي للموظف وأسرته حسب وثيقة التأمين المعتمدة، وإجازة سنوية مدفوعة الأجر مدتها 30 يوماً.
5. فترة التجربة: خضوع العقد لفترة تجربة مدتها ({probation_period}) وفقاً لنظام العمل.
6. تاريخ مباشرة العمل: ({expected_start_date}).

يسري هذا العرض لمدة ({offer_validity_days}) أيام عمل من تاريخ صدوره. يرجى التكرم بتوقيع وإعادة نسخة العرض في حال الموافقة للبدء في إجراءات إصدار العقد الرسمي.

نتطلع بشغف للعمل معكم والترحيب بكم ضمن أسرة شركتنا.`
    },
    {
      id: 'brief',
      name_ar: 'عرض وظيفي مختصر',
      description_ar: 'خطاب عرض عمل سريع وموجز.',
      body: `يسعدنا تقديم هذا العرض لشغل منصب ({job_title}) في ({company_name}).

الراتب الإجمالي المتفق عليه يشمل الأساسي ({basic_salary}) والبدلات، على أن تباشر العمل في ({expected_start_date}) مع فترة تجربة ({probation_period}).

نرجو التوقيع بالقبول خلال ({offer_validity_days}) أيام. مع أطيب التحيات.`
    }
  ],
  guide_content_ar: `خطاب العرض الوظيفي (Job Offer) هو الوثيقة الرسمية الأولى التي تصيغ تفاهمات التوظيف بعد انتهاء المقابلات، وهو بمثابة وعد تعاقدي تمهيدي يسبق توقيع العقد النهائي الموثق لدى الجهات الرسمية (مثل منصة قوى في السعودية).

أهمية مراجعة العرض الوظيفي بعناية:
- التدقيق في تفاصيل البدلات (سكن، نقل، حوافز ومكافآت بونص) وليس الراتب الإجمالي فقط.
- التأكد من تاريخ المباشرة ومدة صلاحية العرض حتى لا يفقد المرشح حقه فيه.
- فحص شروط فترة التجربة والتأمين الطبي والإجازات السنوية.`,
  faq_ar: [
    {
      question_ar: 'هل العرض الوظيفي الموقع ملزم قانوناً للطرفين؟',
      answer_ar: 'نعم، يعتبر العرض الوظيفي الموقع من الطرفين إيجاباً وقبولاً ملزماً مبدئياً وفق القواعد العامة للالتزام والعقود.'
    },
    {
      question_ar: 'هل يمكن التفاوض على بنود العرض الوظيفي؟',
      answer_ar: 'نعم، من المعتاد والمقبول مهنياً التفاوض بلباقة على الراتب أو تاريخ المباشرة أو بعض المزايا قبل التوقيع النهائي.'
    }
  ],
  related: ['talab-tawdhif', 'khitab-taarif-bil-ratib', 'shahadat-khibra', 'talab-ziyadat-ratib']
};
