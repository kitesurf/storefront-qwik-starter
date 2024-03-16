import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig } from 'vite';
import { builderDevTools } from '@builder.io/dev-tools/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(async () => {
	return {
		ssr: { target: 'webworker' },
		plugins: [qwikCity(), qwikVite(), tsconfigPaths(), builderDevTools()],
		preview: {
			headers: {
				'Cache-Control': 'public, max-age=600',
			},
		},
	};
});
