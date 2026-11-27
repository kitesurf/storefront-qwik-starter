import { qwikVite } from '@qwik.dev/core/optimizer';
import { qwikRouter } from '@qwik.dev/router/vite';
import { i18nPlugin } from 'compiled-i18n/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import fs from 'node:fs';

/**
 * qwikRouter (rc.5) writes an auto-generated (empty) sitemap.xml into the
 * client output directory. On Cloudflare Pages static files win over
 * functions, so it would shadow our custom /sitemap.xml route with its
 * hreflang entries — remove it after the build.
 */
function removeAutoSitemap() {
	return {
		name: 'remove-auto-sitemap',
		closeBundle() {
			try {
				fs.rmSync('dist/sitemap.xml', { force: true });
			} catch {
				// ignore
			}
		},
	};
}

export default defineConfig(async (config) => {
	return {
		// Enable to analyze via source-map-explorer
		ssr: {
			target: 'webworker',
			// compiled-i18n imports the virtual '@i18n/__data' module; it must be
			// bundled into the SSR output or SSG fails at runtime.
			noExternal: ['compiled-i18n'],
		},
		build: {
			sourcemap: config.mode === 'development',
		},
		plugins: [
			qwikRouter(),
			qwikVite(),
			tsconfigPaths(),
			i18nPlugin({
				locales: ['en', 'de', 'es', 'it', 'fr'],
			}),
			removeAutoSitemap(),
		],
		preview: {
			headers: {
				'Cache-Control': 'public, max-age=600',
			},
		},
	};
});
