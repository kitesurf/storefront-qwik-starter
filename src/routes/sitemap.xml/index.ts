import type { RequestHandler } from '@qwik.dev/router';

export const onGet: RequestHandler = ({ send }) => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://allforwind.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="de" href="https://allforwind.com/?lang=de"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://allforwind.com/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="es" href="https://allforwind.com/?lang=es"/>
  </url>
  <url>
    <loc>https://allforwind.com/collections/foils</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/collections/foil-packages</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/collections/kitesurfing</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://allforwind.com/collections/wing-foiling</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
	send(
		new Response(sitemap, {
			status: 200,
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 'public, max-age=86400',
			},
		})
	);
};
