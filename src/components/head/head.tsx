import { component$ } from '@qwik.dev/core';
import { useDocumentHead, useLocation } from '@qwik.dev/router';
import { generateDocumentHead } from '~/utils/head.utils';

export const Head = component$(() => {
	const documentHead = useDocumentHead();
	const loc = useLocation();
	const fallbackHead = generateDocumentHead(loc.url.href);
	const head = documentHead.meta.length > 0 ? documentHead : { ...documentHead, ...fallbackHead };

	const hasDescription = head.meta.some((m: any) => m && m.name === 'description' && !!m.content);

	return (
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta name="theme-color" content="#1D4ED8" />
			<title>{head.title || fallbackHead.title}</title>

			<link rel="manifest" href="/manifest.json" />
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<link rel="icon" type="image/x-icon" href="/favicon.ico" />
			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
			<link rel="preconnect" href="https://demo.vendure.io" />
			<link rel="canonical" href={loc.url.toString()} />

			{/* International SEO / Hreflang Tags */}
			{loc.url.pathname === '/' ? (
				<>
					<link rel="alternate" hreflang="de" href="https://allforwind.com/?lang=de" />
					<link rel="alternate" hreflang="en" href="https://allforwind.com/?lang=en" />
					<link rel="alternate" hreflang="es" href="https://allforwind.com/?lang=es" />
					<link rel="alternate" hreflang="x-default" href="https://allforwind.com/" />
				</>
			) : (
				<>
					<link
						rel="alternate"
						hreflang="de"
						href={`https://allforwind.com${loc.url.pathname}?lang=de`}
					/>
					<link
						rel="alternate"
						hreflang="en"
						href={`https://allforwind.com${loc.url.pathname}?lang=en`}
					/>
					<link
						rel="alternate"
						hreflang="es"
						href={`https://allforwind.com${loc.url.pathname}?lang=es`}
					/>
					<link
						rel="alternate"
						hreflang="x-default"
						href={`https://allforwind.com${loc.url.pathname}`}
					/>
				</>
			)}

			{!hasDescription && (
				<meta
					name="description"
					content={
						head.meta.find((m: any) => m?.property === 'og:description')?.content ||
						fallbackHead.meta.find((m: any) => m?.name === 'description')?.content
					}
				/>
			)}

			{head.meta.map((m, key) => (
				<meta key={key} {...m} />
			))}

			{head.links.map((l, key) => (
				<link key={key} {...l} />
			))}

			{head.styles.map(({ key, style, ...props }) => (
				<style key={key} {...props} dangerouslySetInnerHTML={style} />
			))}

			{head.scripts?.map(({ key, script, ...props }) => (
				<script key={key} {...props} dangerouslySetInnerHTML={script} />
			))}
		</head>
	);
});
