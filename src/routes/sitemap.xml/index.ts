import type { RequestHandler } from '@qwik.dev/router';

export const onGet: RequestHandler = ({ send }) => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://allforwind.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/de/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/es/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/it/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/fr/"/>
  </url>
  <url>
    <loc>https://allforwind.com/de/</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/de/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/es/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/it/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/fr/"/>
  </url>
  <url>
    <loc>https://allforwind.com/es/</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/de/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/es/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/it/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/fr/"/>
  </url>
  <url>
    <loc>https://allforwind.com/it/</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/de/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/es/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/it/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/fr/"/>
  </url>
  <url>
    <loc>https://allforwind.com/fr/</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/de/"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/es/"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/it/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/fr/"/>
  </url>
  <url>
    <loc>https://allforwind.com/collections/foils</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/collections/foils"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/collections/foils"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/de/collections/foils"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/es/collections/foils"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/it/collections/foils"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/fr/collections/foils"/>
  </url>
  <url>
    <loc>https://allforwind.com/de/collections/foils</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/es/collections/foils</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/it/collections/foils</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/fr/collections/foils</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/collections/foil-packages</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/collections/foil-packages"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/collections/foil-packages"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/de/collections/foil-packages"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/es/collections/foil-packages"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/it/collections/foil-packages"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/fr/collections/foil-packages"/>
  </url>
  <url>
    <loc>https://allforwind.com/de/collections/foil-packages</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/es/collections/foil-packages</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/it/collections/foil-packages</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/fr/collections/foil-packages</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/collections/kitesurfing</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/collections/kitesurfing"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/collections/kitesurfing"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/de/collections/kitesurfing"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/es/collections/kitesurfing"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/it/collections/kitesurfing"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/fr/collections/kitesurfing"/>
  </url>
  <url>
    <loc>https://allforwind.com/de/collections/kitesurfing</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/es/collections/kitesurfing</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/it/collections/kitesurfing</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/fr/collections/kitesurfing</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/collections/wing-foiling</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/collections/wing-foiling"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/collections/wing-foiling"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/de/collections/wing-foiling"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/es/collections/wing-foiling"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/it/collections/wing-foiling"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/fr/collections/wing-foiling"/>
  </url>
  <url>
    <loc>https://allforwind.com/de/collections/wing-foiling</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/es/collections/wing-foiling</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/it/collections/wing-foiling</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/fr/collections/wing-foiling</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/about"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/about"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/about?lang=de"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/about?lang=es"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/about?lang=it"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/about?lang=fr"/>
  </url>
  <url>
    <loc>https://allforwind.com/shipping</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/shipping"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/shipping"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/shipping?lang=de"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/shipping?lang=es"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/shipping?lang=it"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/shipping?lang=fr"/>
  </url>
  <url>
    <loc>https://allforwind.com/returns</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/returns"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/returns"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/returns?lang=de"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/returns?lang=es"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/returns?lang=it"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/returns?lang=fr"/>
  </url>
  <url>
    <loc>https://allforwind.com/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/contact"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/contact"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/contact?lang=de"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/contact?lang=es"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/contact?lang=it"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/contact?lang=fr"/>
  </url>
  <url>
    <loc>https://allforwind.com/faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/faq"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/faq"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/faq?lang=de"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/faq?lang=es"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/faq?lang=it"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/faq?lang=fr"/>
  </url>
  <url>
    <loc>https://allforwind.com/blog</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://allforwind.com/blog"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/blog"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/blog?lang=de"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/blog?lang=es"/>
    <xhtml:link rel="alternate" hreflang="it" href="https://allforwind.com/blog?lang=it"/>
    <xhtml:link rel="alternate" hreflang="fr" href="https://allforwind.com/blog?lang=fr"/>
  </url>
  <url>
    <loc>https://allforwind.com/imprint</loc>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>https://allforwind.com/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>https://allforwind.com/terms</loc>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
</urlset>`;
	send(
		new Response(sitemap, {
			status: 200,
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
			},
		})
	);
};
