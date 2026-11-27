import { manifest } from '@qwik-client-manifest';
import {
	createQwikRouter,
	type PlatformCloudflarePages,
} from '@qwik.dev/router/middleware/cloudflare-pages';
import render from './entry.ssr';

declare global {
	interface QwikCityPlatform extends PlatformCloudflarePages {}
}

const qwikFetch = createQwikRouter({ render, manifest });

const fetch: typeof qwikFetch = async (request, env, ctx) => {
	const url = new URL(request.url);
	const pathname = url.pathname;

	// 1. Static assets or API paths should never be rewritten
	if (
		pathname.startsWith('/build/') ||
		pathname.startsWith('/assets/') ||
		pathname.startsWith('/images/') ||
		pathname === '/favicon.ico' ||
		pathname === '/favicon.svg' ||
		pathname === '/robots.txt' ||
		pathname === '/sitemap.xml' ||
		pathname === '/llms.txt' ||
		pathname === '/llms-full.txt'
	) {
		return qwikFetch(request, env, ctx);
	}

	// 2. Trailing slash normalization for clean language URLs
	// (Ensures /de/collections/foils/ remains cleanly under /de/ without query string redirect)
	if (!pathname.endsWith('/') && !pathname.split('/').pop()?.includes('.')) {
		const redirectUrl = new URL(request.url);
		redirectUrl.pathname = `${pathname}/`;
		return Response.redirect(redirectUrl.toString(), 301);
	}

	// 3. Language prefix rewrite for /de/, /en/, /es/, /it/ and /fr/: e.g. /en/products/rs-v10/ -> /products/rs-v10/?lang=en
	const prefixMatch = pathname.match(/^\/(de|en|es|it|fr)(\/.*)?$/);
	if (prefixMatch) {
		const lang = prefixMatch[1];
		const remaining = prefixMatch[2] || '/';
		const rewrittenUrl = new URL(request.url);
		rewrittenUrl.pathname = remaining;
		rewrittenUrl.searchParams.set('lang', lang);

		const rewrittenRequest = new Request(rewrittenUrl.toString(), request);
		return qwikFetch(rewrittenRequest, env, ctx);
	}

	// 4. Initial visit on root '/' with browser language detection:
	if (pathname === '/') {
		const hasLangQuery = url.searchParams.has('lang');
		const cookieHeader = request.headers.get('cookie') || '';
		const hasLangCookie = /(?:^|;\s*)lang=(de|es|it|fr|en)(?:;|$)/.test(cookieHeader);

		if (!hasLangQuery && !hasLangCookie) {
			const acceptLang = (request.headers.get('accept-language') || '').toLowerCase();
			if (acceptLang.startsWith('de') || acceptLang.includes(',de') || acceptLang.includes(';de')) {
				return Response.redirect(new URL('/de/', request.url).toString(), 302);
			} else if (
				acceptLang.startsWith('es') ||
				acceptLang.includes(',es') ||
				acceptLang.includes(';es')
			) {
				return Response.redirect(new URL('/es/', request.url).toString(), 302);
			} else if (
				acceptLang.startsWith('it') ||
				acceptLang.includes(',it') ||
				acceptLang.includes(';it')
			) {
				return Response.redirect(new URL('/it/', request.url).toString(), 302);
			} else if (
				acceptLang.startsWith('fr') ||
				acceptLang.includes(',fr') ||
				acceptLang.includes(';fr')
			) {
				return Response.redirect(new URL('/fr/', request.url).toString(), 302);
			}
		}
	}

	return qwikFetch(request, env, ctx);
};

export { fetch };
