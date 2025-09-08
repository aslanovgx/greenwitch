// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */

// Vercel konteksti
const VERCEL_ENV = process.env.VERCEL_ENV; // 'production' | 'preview' | 'development'

// URL-ləri yığırıq
const PROD_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

const PREVIEW_URL =
  process.env.NEXT_PUBLIC_PREVIEW_URL ||
  (process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`);

const LOCAL_URL = 'http://localhost:3000';

// Hansı siteUrl?
const siteUrl =
  VERCEL_ENV === 'production'
    ? (PROD_URL || LOCAL_URL)
    : (PREVIEW_URL || PROD_URL || LOCAL_URL);

// Preview/dev-də indeksləməni bağlayaq
const isIndexable = VERCEL_ENV === 'production' && siteUrl && !/localhost|\.vercel\.app$/i.test(siteUrl);

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  // Preview və Development mühitində bütün səhifələri blokla
  robotsTxtOptions: isIndexable
    ? {
        policies: [{ userAgent: '*', allow: '/' }],
        // istəsən sitemap-ları ayrıca göstərə bilərsən
        // additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
      }
    : {
        policies: [{ userAgent: '*', disallow: '/' }],
      },
  exclude: [
    '/admin/*',                  // sənin istəklərin
    ...(isIndexable ? [] : ['*']) // prod deyilsə — hər şeyi exclude et
  ],
  // İstəsən:
  // generateIndexSitemap: true,
  // changefreq: 'daily',
  // priority: 0.7,
};
