import { LetterTemplate } from '../../types/template';
import { khitabIstiqala } from './khitab-istiqala';
import { talabIjaza } from './talab-ijaza';
import { talabIjazaMaradiya } from './talab-ijaza-maradiya';
import { khitabTaarifBilRatib } from './khitab-taarif-bil-ratib';
import { talabTawdhif } from './talab-tawdhif';
import { talabNaql } from './talab-naql';
import { khitabShakwa } from './khitab-shakwa';
import { khitabShukr } from './khitab-shukr';
import { khitabTawsiya } from './khitab-tawsiya';
import { tafwid } from './tafwid';
import { iqrarWaTaahud } from './iqrar-wa-taahud';
import { khitabItidhar } from './khitab-itidhar';
import { talabZiyadatRatib } from './talab-ziyadat-ratib';
import { talabTadrib } from './talab-tadrib';
import { khitabInzar } from './khitab-inzar';
import { khitabInhaKhidma } from './khitab-inha-khidma';
import { shahadatKhibra } from './shahadat-khibra';
import { khitabArdWadhifi } from './khitab-ard-wadhifi';
import { talabSulfa } from './talab-sulfa';
import { talabIstirdadMablagh } from './talab-istirdad-mablagh';
import { khitabMutalabaMaliya } from './khitab-mutalaba-maliya';
import { talabMusaada } from './talab-musaada';
import { talabTamdidMohla } from './talab-tamdid-mohla';
import { talabGhiyabMadrasi } from './talab-ghiyab-madrasi';
import { talabIltihaqBiJamia } from './talab-iltihaq-bi-jamia';
import { khitabIlaJihaHukumiya } from './khitab-ila-jiha-hukumiya';
import { talabIlghaIshtirak } from './talab-ilgha-ishtirak';
import { ikhlaTaraf } from './ikhla-taraf';
import { khitabTahniaa } from './khitab-tahniaa';
import { talabMawidIjtima } from './talab-mawid-ijtima';

export const TEMPLATES: LetterTemplate[] = [
  khitabIstiqala,
  talabIjaza,
  talabIjazaMaradiya,
  khitabTaarifBilRatib,
  talabTawdhif,
  talabNaql,
  khitabShakwa,
  khitabShukr,
  khitabTawsiya,
  tafwid,
  iqrarWaTaahud,
  khitabItidhar,
  talabZiyadatRatib,
  talabTadrib,
  khitabInzar,
  khitabInhaKhidma,
  shahadatKhibra,
  khitabArdWadhifi,
  talabSulfa,
  talabIstirdadMablagh,
  khitabMutalabaMaliya,
  talabMusaada,
  talabTamdidMohla,
  talabGhiyabMadrasi,
  talabIltihaqBiJamia,
  khitabIlaJihaHukumiya,
  talabIlghaIshtirak,
  ikhlaTaraf,
  khitabTahniaa,
  talabMawidIjtima,
];

export const TEMPLATES_MAP: Record<string, LetterTemplate> = TEMPLATES.reduce((acc, t) => {
  acc[t.slug] = t;
  return acc;
}, {} as Record<string, LetterTemplate>);

export function getTemplateBySlug(slug: string): LetterTemplate | undefined {
  return TEMPLATES_MAP[slug];
}

export function getTemplatesByCategory(category: string): LetterTemplate[] {
  return TEMPLATES.filter((t) => t.category === category);
}

export function getRelatedTemplates(template: LetterTemplate): LetterTemplate[] {
  return template.related
    .map((slug) => TEMPLATES_MAP[slug])
    .filter((t): t is LetterTemplate => Boolean(t));
}

export const POPULAR_TEMPLATES_SLUGS = [
  'khitab-istiqala',
  'talab-ijaza',
  'khitab-taarif-bil-ratib',
  'tafwid',
  'shahadat-khibra',
  'talab-tawdhif',
  'khitab-shakwa',
  'talab-ziyadat-ratib',
  'iqrar-wa-taahud',
  'talab-sulfa',
];
