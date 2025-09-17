// next-sitemap.config.js
const VERCEL_ENV = process.env.VERCEL_ENV;
const isProd = VERCEL_ENV === 'production';

const PROD_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);

if (isProd && (!PROD_URL || /\.vercel\.app|localhost/.test(PROD_URL))) {
  throw new Error('Prod build üçün NEXT_PUBLIC_BASE_URL = https://saat.az verilməlidir.');
}

const PREVIEW_URL =
  process.env.NEXT_PUBLIC_PREVIEW_URL ||
  (process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`);

const LOCAL_URL = 'http://localhost:3000';

const siteUrl = isProd ? (PROD_URL || LOCAL_URL) : (PREVIEW_URL || PROD_URL || LOCAL_URL);

const isIndexable =
  isProd && typeof siteUrl === 'string' && /^https?:\/\/(?!.*\.vercel\.app)(?!.*localhost)/i.test(siteUrl);

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  outDir: 'public',
  sitemapSize: 7000,
  trailingSlash: false,
  robotsTxtOptions: isIndexable
    ? { host: siteUrl, sitemap: `${siteUrl}/sitemap.xml`, policies: [{ userAgent: '*', allow: '/' }] }
    : { host: siteUrl, sitemap: `${siteUrl}/sitemap.xml`, policies: [{ userAgent: '*', disallow: '/' }] },
  exclude: ['/admin/*', ...(isIndexable ? [] : ['*'])],
};
