import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CONFIG } from '../src/config';
import { TEMPLATES } from '../src/data/templates';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

interface RouteInfo {
  path: string;
  title: string;
  description: string;
  h1: string;
  contentHtml: string;
  jsonLd?: object | object[];
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function runSSG() {
  console.log('🚀 Starting Khitabi Static Site Generation (SSG)...');

  const templateHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templateHtmlPath)) {
    console.error('❌ dist/index.html not found! Run "vite build" first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(templateHtmlPath, 'utf-8');

  const routes: RouteInfo[] = [];

  // 1. Home Route
  const homeTemplatesList = TEMPLATES.map(
    (t) => `<li><a href="/khitab/${t.slug}"><strong>${escapeHtml(t.title_ar)}</strong></a>: ${escapeHtml(t.meta_description)}</li>`
  ).join('\n');

  routes.push({
    path: '/',
    title: `خطابي — ${CONFIG.SITE_TAGLINE}`,
    description: CONFIG.SITE_DESCRIPTION,
    h1: 'اكتب خطابك الرسمي في دقيقة واحدة — مجاناً وبدون تسجيل',
    contentHtml: `
      <header class="ssg-hero">
        <h1>اكتب خطابك الرسمي في دقيقة واحدة — مجاناً وبدون تسجيل</h1>
        <p>${escapeHtml(CONFIG.SITE_DESCRIPTION)}</p>
      </header>
      <section class="ssg-categories">
        <h2>أقسام النماذج الرسمية</h2>
        <ul>
          ${CONFIG.CATEGORIES.map((c) => `<li><a href="/tasnif/${c.id}"><strong>${escapeHtml(c.name_ar)}</strong></a>: ${escapeHtml(c.description_ar)}</li>`).join('\n')}
        </ul>
      </section>
      <section class="ssg-directory">
        <h2>دليل جميع النماذج الرسمية (30 نموذجاً)</h2>
        <ul>${homeTemplatesList}</ul>
      </section>
    `,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: CONFIG.SITE_NAME,
      url: CONFIG.SITE_URL,
      description: CONFIG.SITE_DESCRIPTION,
    },
  });

  // 2. Categories Routes
  CONFIG.CATEGORIES.forEach((cat) => {
    const catTemplates = TEMPLATES.filter((t) => t.category === cat.id);
    const catList = catTemplates
      .map(
        (t) =>
          `<li><a href="/khitab/${t.slug}"><h3>${escapeHtml(t.title_ar)}</h3></a><p>${escapeHtml(t.meta_description)}</p></li>`
      )
      .join('\n');

    routes.push({
      path: `/tasnif/${cat.id}`,
      title: `نماذج وصيغ خطابات ${cat.name_ar} الرسمية الجاهزة | ${CONFIG.SITE_NAME}`,
      description: `تصفح جميع نماذج خطابات ${cat.name_ar} الجاهزة للتحميل والطباعة مجاناً بصيغة Word و PDF مع المعاينة المباشرة.`,
      h1: `نماذج وصيغ خطابات ${cat.name_ar}`,
      contentHtml: `
        <article>
          <h1>نماذج وصيغ خطابات ${escapeHtml(cat.name_ar)}</h1>
          <p>${escapeHtml(cat.description_ar)}</p>
          <section>
            <h2>قائمة الخطابات المتاحة في قسم ${escapeHtml(cat.name_ar)}</h2>
            <ul>${catList}</ul>
          </section>
        </article>
      `,
    });
  });

  // 3. Template Routes (All 30 templates)
  TEMPLATES.forEach((tmpl) => {
    const cat = CONFIG.CATEGORIES.find((c) => c.id === tmpl.category);
    const defaultBodySample = tmpl.variants[0]?.body || '';

    const faqsHtml = tmpl.faq_ar
      .map(
        (f) => `
        <div class="faq-item">
          <h3>${escapeHtml(f.question_ar)}</h3>
          <p>${escapeHtml(f.answer_ar)}</p>
        </div>`
      )
      .join('\n');

    routes.push({
      path: `/khitab/${tmpl.slug}`,
      title: `${tmpl.seo_title} | ${CONFIG.SITE_NAME}`,
      description: tmpl.meta_description,
      h1: tmpl.seo_title,
      contentHtml: `
        <article>
          <header>
            <nav aria-label="مسار التنقل">
              <a href="/">الرئيسية</a> &gt;
              <a href="/tasnif/${tmpl.category}">${escapeHtml(cat?.name_ar || '')}</a> &gt;
              <span>${escapeHtml(tmpl.title_ar)}</span>
            </nav>
            <h1>${escapeHtml(tmpl.seo_title)}</h1>
            <p>${escapeHtml(tmpl.meta_description)}</p>
          </header>

          <section class="sample-variant">
            <h2>صيغة ونموذج ${escapeHtml(tmpl.title_ar)} الرسمي</h2>
            <div class="letter-text" style="white-space: pre-line;">${escapeHtml(defaultBodySample)}</div>
          </section>

          <section class="guide">
            <h2>دليل كتابة ${escapeHtml(tmpl.title_ar)}: الشروط، النصائح، والأخطاء الشائعة</h2>
            <div style="white-space: pre-line;">${escapeHtml(tmpl.guide_content_ar)}</div>
          </section>

          <section class="faqs">
            <h2>الأسئلة الشائعة حول ${escapeHtml(tmpl.title_ar)}</h2>
            ${faqsHtml}
          </section>
        </article>
      `,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: tmpl.faq_ar.map((f) => ({
          '@type': 'Question',
          name: f.question_ar,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer_ar,
          },
        })),
      },
    });
  });

  // 4. Static Pages: About, Privacy, Terms, Contact
  routes.push({
    path: '/man-nahnu',
    title: `من نحن | ${CONFIG.SITE_NAME}`,
    description: 'تعرف على منصة خطابي ورسالتنا في توفير نماذج وخطابات رسمية معتمدة ومجانية لكافة المستخدمين.',
    h1: `من نحن — منصة ${CONFIG.SITE_NAME}`,
    contentHtml: `
      <article>
        <h1>من نحن — منصة ${CONFIG.SITE_NAME}</h1>
        <p>${escapeHtml(CONFIG.SITE_TAGLINE)}</p>
        <p>أداة عربية مجانية لتوليد الخطابات والنماذج الرسمية الجاهزة للطباعة والتحميل بصيغة Word و PDF بدون تسجيل.</p>
      </article>
    `,
  });

  routes.push({
    path: '/siyasat-al-khususiya',
    title: `سياسة الخصوصية وسرية المعلومات | ${CONFIG.SITE_NAME}`,
    description: 'سياسة الخصوصية لمنصة خطابي: نلتزم بحماية بياناتك تماماً؛ لا يتم حفظ أو جمع أي معلومات شخصية على خوادمنا.',
    h1: 'سياسة الخصوصية وسرية المعلومات',
    contentHtml: `
      <article>
        <h1>سياسة الخصوصية وسرية المعلومات</h1>
        <p>تؤكد منصة خطابي أن جميع البيانات التي تدخلها في نماذج الخطابات تعالج محلياً 100% داخل متصفحك ولا يتم إرسالها لأي خادم إطلاقاً.</p>
      </article>
    `,
  });

  routes.push({
    path: '/shurut',
    title: `شروط الاستخدام | ${CONFIG.SITE_NAME}`,
    description: 'شروط وأحكام استخدام موقع خطابي لتوليد الخطابات والنماذج الرسمية.',
    h1: 'شروط وأحكام الاستخدام',
    contentHtml: `
      <article>
        <h1>شروط وأحكام الاستخدام</h1>
        <p>يوفر موقع خطابي قوالب ونماذج إدارية وتعبيرية استرشادية لمساعدة الأفراد في صياغة مراسلاتهم الرسمية.</p>
      </article>
    `,
  });

  routes.push({
    path: '/ittasil-bina',
    title: `اتصل بنا | ${CONFIG.SITE_NAME}`,
    description: 'تواصل مع فريق منصة خطابي للاقتراحات أو لطلب نماذج خطابات جديدة.',
    h1: 'اتصل بنا',
    contentHtml: `
      <article>
        <h1>اتصل بنا</h1>
        <p>يسعدنا تواصلكم واقتراحاتكم عبر البريد الإلكتروني: ${CONFIG.CONTACT_EMAIL}</p>
      </article>
    `,
  });

  // Pre-render each route to its own static HTML file
  for (const route of routes) {
    let html = baseHtml;

    // Replace Title
    html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

    // Replace Meta Description
    html = html.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(route.description)}" />`
    );

    // Replace Canonical URL
    const canonicalUrl = `${CONFIG.SITE_URL}${route.path === '/' ? '' : route.path}`;
    html = html.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );

    // Replace OpenGraph Title & Description & URL
    html = html.replace(
      /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(route.title)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(route.description)}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );

    // Inject JSON-LD Schema if present
    if (route.jsonLd) {
      const jsonLdTag = `<script type="application/ld+json">${JSON.stringify(route.jsonLd)}</script>`;
      html = html.replace('</head>', `  ${jsonLdTag}\n  </head>`);
    }

    // Embed pre-rendered SEO content inside root div so crawlers and bots see the full semantic content
    const rootPlaceholder = '<div id="root"></div>';
    const prerenderedRoot = `<div id="root"><noscript>${route.contentHtml}</noscript></div>`;
    if (html.includes(rootPlaceholder)) {
      html = html.replace(rootPlaceholder, prerenderedRoot);
    }

    // Determine target file path
    let targetFilePath = '';
    if (route.path === '/') {
      targetFilePath = path.join(DIST_DIR, 'index.html');
    } else {
      const routeClean = route.path.replace(/^\//, '');
      const folderPath = path.join(DIST_DIR, routeClean);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      targetFilePath = path.join(folderPath, 'index.html');
    }

    fs.writeFileSync(targetFilePath, html, 'utf-8');
    console.log(`  ✓ Generated: ${route.path} -> ${path.relative(DIST_DIR, targetFilePath)}`);
  }

  // 5. Generate 404.html
  const notFoundHtml = baseHtml
    .replace(/<title>.*?<\/title>/i, `<title>الصفحة غير موجودة (404) | ${CONFIG.SITE_NAME}</title>`)
    .replace(
      '<div id="root"></div>',
      '<div id="root"><h1>الصفحة غير موجودة 404</h1><p>عذراً، الصفحة المطلوبة غير متوفرة. <a href="/">العودة للرئيسية</a></p></div>'
    );
  fs.writeFileSync(path.join(DIST_DIR, '404.html'), notFoundHtml, 'utf-8');
  console.log('  ✓ Generated: /404.html');

  // 6. Generate sitemap.xml
  const today = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${CONFIG.SITE_URL}${r.path === '/' ? '' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${r.path === '/' ? '1.0' : r.path.startsWith('/khitab/') ? '0.9' : '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml.trim(), 'utf-8');
  console.log(`  ✓ Generated: sitemap.xml with ${routes.length} pages`);

  // 7. Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${CONFIG.SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt.trim(), 'utf-8');
  console.log('  ✓ Generated: robots.txt');

  console.log(`✨ SSG successfully completed! Generated ${routes.length} static pre-rendered routes.`);
}

runSSG().catch((err) => {
  console.error('Fatal SSG Error:', err);
  process.exit(1);
});
