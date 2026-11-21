import { cloudflarePagesAdapter } from '@qwik.dev/router/adapters/cloudflare-pages/vite';
import { extendConfig } from '@qwik.dev/router/vite';
import baseConfig from '../../vite.config';

/**
 * compiled-i18n imports the virtual '@i18n/__data' module, which only resolves
 * through its vite plugin. The legacy `ssr.noExternal` option does not apply to
 * the custom `ssg` environment under Vite 8, so bundle compiled-i18n there
 * explicitly or SSG route loading fails at runtime.
 */
function compiledI18nSsgBundle() {
	return {
		name: 'compiled-i18n-ssg-bundle',
		configEnvironment(name: string, env: { resolve?: { noExternal?: unknown[] } }) {
			if (name === 'ssg') {
				env.resolve ??= {};
				env.resolve.noExternal = [...(env.resolve.noExternal ?? []), 'compiled-i18n'];
			}
		},
	};
}

export default extendConfig(baseConfig, () => {
	return {
		build: {
			ssr: true,
			rollupOptions: {
				input: ['src/entry.cloudflare-pages.tsx', '@qwik-city-plan'],
			},
		},
		plugins: [cloudflarePagesAdapter(), compiledI18nSsgBundle()],
	};
});
