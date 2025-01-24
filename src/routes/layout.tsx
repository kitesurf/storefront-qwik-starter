import { component$, Slot } from '@builder.io/qwik';
import { RequestHandler } from '@builder.io/qwik-city';

const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'it', 'es'] as const;
type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const getBrowserLanguage = (acceptLanguage: string | null): SupportedLanguage => {
	if (!acceptLanguage) return 'en';

	const languages = acceptLanguage
		.split(',')
		.map((lang) => lang.split(';')[0].trim().toLowerCase())
		.map((lang) => lang.split('-')[0]);

	const matchedLang = languages.find((lang) =>
		SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage)
	) as SupportedLanguage;

	return matchedLang || 'en';
};

export const onRequest: RequestHandler = ({ request, redirect }) => {
	const url = new URL(request.url);
	const pathSegments = url.pathname.split('/').filter(Boolean);

	if (pathSegments.length === 0) {
		const browserLang = getBrowserLanguage(request.headers.get('accept-language'));
		throw redirect(301, `/${browserLang}`);
	}
};

export default component$(() => {
	return (
		<div>
			<Slot />
		</div>
	);
});
