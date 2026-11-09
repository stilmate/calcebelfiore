import { CONFIG, PRODUCTS, PAVING } from '../lib/config';

function Sitemap() { return null; }

export async function getServerSideProps({ res }) {
  const base = CONFIG.seo.canonical;
  const pages = ['', '/prodotti', `/${PAVING.slug}`, ...PRODUCTS.map(p=>`/prodotti/${p.slug}`)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p=>`  <url>
    <loc>${base}${p}</loc>
    <changefreq>${p===''?'weekly':'monthly'}</changefreq>
    <priority>${p===''?'1.0':p==='/prodotti'?'0.9':'0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
  res.setHeader('Content-Type','text/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
}
export default Sitemap;
