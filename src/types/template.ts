import { CategoryId } from '../config';

export type FieldType = 'text' | 'textarea' | 'date' | 'select' | 'number';

export interface TemplateField {
  id: string;
  label_ar: string;
  type: FieldType;
  required: boolean;
  placeholder_ar: string;
  options_ar?: string[];
  defaultValue?: string;
  hint_ar?: string;
}

export interface LetterVariant {
  id: string;
  name_ar: string;
  description_ar?: string;
  body: string;
}

export interface FAQItem {
  question_ar: string;
  answer_ar: string;
}

export interface LetterTemplate {
  slug: string;
  title_ar: string;
  category: CategoryId;
  seo_title: string;
  meta_description: string;
  defaultRecipient_ar?: string;
  defaultSubject_ar?: string;
  fields: TemplateField[];
  variants: LetterVariant[];
  guide_content_ar: string;
  faq_ar: FAQItem[];
  related: string[];
}
