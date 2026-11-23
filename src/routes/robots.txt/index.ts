import type { RequestHandler } from '@qwik.dev/router';

export const onGet: RequestHandler = ({ send }) => {
	const robots = `User-agent: *
Allow: /
Disallow: /account/
Disallow: /checkout/

# LLMs.txt
Allow: /llms.txt
Allow: /llms-full.txt

Sitemap: https://allforwind.com/sitemap.xml
`;
	send(
		new Response(robots, {
			status: 200,
			headers: {
				'Content-Type': 'text/plain; charset=utf-8',
				'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400',
			},
		})
	);
};
