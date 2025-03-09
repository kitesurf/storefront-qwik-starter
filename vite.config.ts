import { qwikCity } from '@builder.io/qwik-city/vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(async (config) => {
	return {
		// Your existing configuration
		ssr: { target: 'webworker' },
		build: {
			sourcemap: config.mode === 'development',
		},
		plugins: [qwikCity(), qwikVite(), tsconfigPaths()],

		// New server configuration additions
		server: {
			host: true, // Allow external access
			headers: {
				'Access-Control-Allow-Origin': '*', // Bypass CORS
			},
			// Optional proxy for external images
			proxy: {
				'/external-images': {
					target: 'https://allforwind.com',
					changeOrigin: true,
					secure: false,
					ws: true,
					configure: (proxy, _options) => {
						proxy.on('error', (err, _req, _res) => {
							console.log('proxy error', err);
						});
						proxy.on('proxyReq', (proxyReq, req, _res) => {
							console.log('Sending Request to the Target:', req.method, req.url);
						});
						proxy.on('proxyRes', (proxyRes, req, _res) => {
							console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
						});
					},
					rewrite: (path) => path.replace(/^\/src/, ''),
				},
			},
		},
		// Your existing preview config
		preview: {
			headers: {
				'Cache-Control': 'public, max-age=600',
			},
		},
	};
});
