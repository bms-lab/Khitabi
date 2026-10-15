# Khitabi — خطابي

> **Outil web gratuit de génération de lettres et formulaires administratifs officiels en arabe (Word & PDF).**

Khitabi permet de rédiger des lettres administratives formelles (démission, demande de congé, attestation de salaire, procuration, réclamation, etc.) en moins d'une minute, avec aperçu A4 en direct, calendrier grégorien/hégirien, et export immédiat en `.docx` et PDF.

---

## 🌟 Fonctionnalités Clés

- **100% Statique & Côté Client** : Aucune base de données, aucun compte utilisateur, aucun backend. Les données saisies restent exclusivement dans le navigateur de l'utilisateur (confidentialité totale).
- **30 Modèles de Lettres Officiels** : Rédigés en arabe moderne standard (فصحى), conformes aux codes du travail et règlements administratifs (Arabie Saoudite, Émirats, Égypte, Maroc, etc.).
- **Aperçu Papier A4 Réaliste** : Feuille A4 en direct avec typographie arabe noble (*Amiri*), prise en compte des en-têtes et logos personnalisés.
- **Exports Multiples** :
  - Téléchargement Word (`.docx`) avec prise en charge complète du texte bidirectionnel (RTL).
  - Impression directe & sauvegarde PDF via la boîte de dialogue standard du navigateur.
  - Copie du texte en un clic.
- **Calendrier Double** : Grégorien et Hégirien (Umm al-Qura) avec conversion facultative en chiffres arabo-orientaux (١، ٢، ٣).
- **SEO & SSG** : Toutes les routes sont pré-rendues statiquement lors du build pour une indexation Google optimale.

---

## 🛠️ Installation et Démarrage Local

### Prérequis
- Node.js (version 18 ou supérieure recommandée)
- npm ou pnpm

### 1. Cloner ou extraire le projet
```bash
git clone <url-du-depot>
cd khitabi
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
L'application sera accessible sur [http://localhost:3000](http://localhost:3000).

---

## 📦 Compilation & Déploiement

### Compiler le projet (avec génération statique SSG)
```bash
npm run build
```
Cette commande exécute d'abord le build Vite puis lance automatiquement le script SSG (`scripts/generate-ssg.ts`). Elle génère dans le dossier `dist/` :
- Un fichier `index.html` dédié pour chaque lettre (`/khitab/<slug>/index.html`)
- Un fichier `index.html` pour chaque catégorie (`/tasnif/<categorie>/index.html`)
- Le fichier `sitemap.xml` complet
- Le fichier `robots.txt`

### Tester le build en local
```bash
npm run preview
```

---

## 🚀 Déploiement sur Vercel

Le projet est configuré pour un déploiement Vercel immédiat grâce au fichier `vercel.json` inclus.

1. Connectez votre compte Vercel à votre dépôt GitHub/GitLab.
2. Créez un **New Project** et sélectionnez ce dépôt.
3. Paramètres de build par défaut :
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
4. Cliquez sur **Deploy**. Toutes les routes et fichiers statiques seront servis automatiquement avec URL propres (`cleanUrls`).

---

## ⚙️ Configuration du Site

Toutes les options générales se trouvent dans le fichier `src/config.ts` :

```typescript
export const CONFIG = {
  SITE_NAME: 'خطابي',
  SITE_NAME_EN: 'Khitabi',
  SITE_TAGLINE: 'اكتب خطابك الرسمي في دقيقة واحدة — مجاناً وبدون تسجيل',
  SITE_URL: 'https://khitabi.com',       // Remplacez par votre domaine de production
  CONTACT_EMAIL: 'contact@khitabi.com', // Votre adresse de contact

  // Monétisation AdSense
  ADS_ENABLED: false,                   // Mettez à true pour activer les bannières
  ADSENSE_CLIENT: 'ca-pub-XXXXXXXXXXXX', // Votre identifiant éditeur Google AdSense
};
```

---

## 💰 Activer Google AdSense

1. Obtenez l'approbation de votre domaine sur [Google AdSense](https://www.google.com/adsense/).
2. Ouvrez le fichier `public/ads.txt` et ajoutez votre ligne éditeur :
   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
3. Dans `src/config.ts` :
   - Passez `ADS_ENABLED: true`
   - Renseignez `ADSENSE_CLIENT: 'ca-pub-XXXXXXXXXXXXXXXX'`
4. Recompilez avec `npm run build` et redéployez. Les conteneurs d'annonces réservés (en haut du guide et avant la FAQ) s'afficheront sans jamais gêner l'aperçu de la lettre ni les boutons de téléchargement.

---

## ➕ Comment ajouter un nouveau modèle de lettre ?

L'architecture est modulaire : **ajouter une nouvelle lettre nécessite simplement de créer un seul fichier** dans `src/data/templates/` puis de l'importer dans `src/data/templates/index.ts`.

### Étape 1 : Créer le fichier `src/data/templates/<slug>.ts`
Exemple : `src/data/templates/talab-taajil.ts`

```typescript
import { LetterTemplate } from '../../types/template';

export const talabTaajil: LetterTemplate = {
  slug: 'talab-taajil',
  title_ar: 'طلب تأجيل موعد',
  category: 'work', // 'work' | 'education' | 'government' | 'finance' | 'personal'
  seo_title: 'نموذج طلب تأجيل موعد رسمي جاهز مجاناً',
  meta_description: 'صيغة طلب تأجيل موعد رسمي أو جلسة عمل لظرف طارئ قابلة للتعديل والتحميل Word و PDF.',
  defaultRecipient_ar: 'سعادة المدير المحترم',
  defaultSubject_ar: 'الموضوع: طلب تأجيل موعد اجتماع',
  fields: [
    { id: 'name', label_ar: 'الاسم الكامل', type: 'text', required: true, placeholder_ar: 'أحمد السعد' },
    { id: 'date', label_ar: 'الموعد البديل المقترح', type: 'date', required: true, placeholder_ar: '2026-11-01' },
    { id: 'reason', label_ar: 'سبب التأجيل', type: 'textarea', required: true, placeholder_ar: 'نظراً لعارض صحي طارئ...' },
  ],
  variants: [
    {
      id: 'detailed',
      name_ar: 'رسمي مفصل',
      body: 'السلام عليكم ورحمة الله وبركاته، أرجو التكرم بالموافقة على تأجيل الموعد إلى ({date}) بسبب: ({reason}). شاكراً حسن تفهمكم.',
    },
  ],
  guide_content_ar: 'إرشادات كتابة طلب التأجيل ونصائح لقبوله...',
  faq_ar: [
    { question_ar: 'متى يجب إرسال طلب التأجيل؟', answer_ar: 'قبل الموعد بـ 24 ساعة على الأقل.' },
  ],
  related: ['talab-mawid-ijtima', 'khitab-itidhar'],
};
```

### Étape 2 : L'enregistrer dans `src/data/templates/index.ts`
Importez simplement votre fichier et ajoutez-le au tableau `TEMPLATES` :
```typescript
import { talabTaajil } from './talab-taajil';

export const TEMPLATES: LetterTemplate[] = [
  // ...
  talabTaajil,
];
```

C'est tout ! Le nouveau modèle sera automatiquement intégré :
- À la recherche globale et la page d'accueil
- À sa page de catégorie correspondante
- À la génération statique HTML (`/khitab/talab-taajil/index.html`)
- Au `sitemap.xml` et aux schémas JSON-LD Schema.org.

---

## 📄 Licence
Code source libre et gratuit pour tout usage personnel ou commercial.
