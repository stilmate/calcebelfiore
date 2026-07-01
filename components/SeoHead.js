import Head from 'next/head';
import { CONFIG } from '../lib/config';

export default function SeoHead({ title, description, keywords, ogImage, canonical, product }) {
  const t     = title       || CONFIG.seo.defaultTitle;
  const desc  = description || CONFIG.seo.description;
  const keys  = keywords    || CONFIG.seo.keywords;
  const img   = ogImage     || CONFIG.seo.ogImage;
  const url   = canonical   || CONFIG.seo.canonical;

  // Schema.org JSON-LD — Google lo legge e mostra info ricche nei risultati
  const schemaOrg = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.longDesc || product.desc,
    "image": product.img,
    "brand": { "@type": "Brand", "name": CONFIG.company.name },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": CONFIG.company.name },
    },
  } : {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": CONFIG.company.name,
    "description": CONFIG.seo.description,
    "url": CONFIG.seo.canonical,
    "telephone": CONFIG.contacts.phone,
    "email": CONFIG.contacts.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CONFIG.seo.schema.address,
      "addressLocality": "Martirano",
      "addressRegion": "CZ",
      "postalCode": "88040",
      "addressCountry": "IT",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": CONFIG.seo.schema.geo.lat,
      "longitude": CONFIG.seo.schema.geo.lng,
    },
    "openingHours": ["Mo-Fr 07:30-17:00", "Sa 07:30-12:00"],
    "sameAs": [`https://www.google.com/maps?q=${CONFIG.company.name}`],
  };

  return (
    <Head>
      <title>{t}</title>
      <meta name="description"        content={desc}/>
      <meta name="keywords"           content={keys}/>
      <meta name="robots"             content="index, follow"/>
      <meta name="author"             content={CONFIG.company.name}/>
      <meta name="viewport"           content="width=device-width, initial-scale=1"/>
      <link rel="canonical"           href={url}/>

      {/* Open Graph — anteprima su WhatsApp, Facebook, LinkedIn */}
      <meta property="og:type"        content={product ? "product" : "website"}/>
      <meta property="og:title"       content={t}/>
      <meta property="og:description" content={desc}/>
      <meta property="og:image"       content={img}/>
      <meta property="og:url"         content={url}/>
      <meta property="og:site_name"   content={CONFIG.seo.siteName}/>
      <meta property="og:locale"      content="it_IT"/>

      {/* Twitter Card */}
      <meta name="twitter:card"       content="summary_large_image"/>
      <meta name="twitter:title"      content={t}/>
      <meta name="twitter:description"content={desc}/>
      <meta name="twitter:image"      content={img}/>

      {/* Schema.org strutturato — Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
    </Head>
  );
}
