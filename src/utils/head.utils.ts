import { DEFAULT_METADATA_IMAGE, DEFAULT_METADATA_URL, METADATA_BY_LOCALE } from '~/constants';

export type SupportedLocale = 'de' | 'en' | 'es';

export const getLocaleFromUrl = (urlInput?: string | URL): SupportedLocale => {
	if (!urlInput) return 'en';
	try {
		const parsed =
			typeof urlInput === 'string' ? new URL(urlInput, 'https://allforwind.com') : urlInput;
		const langParam = parsed.searchParams.get('lang')?.toLowerCase();
		if (langParam === 'es' || langParam === 'en' || langParam === 'de') {
			return langParam as SupportedLocale;
		}
		const pathMatch = parsed.pathname.match(/^\/(de|en|es)(\/|$)/i);
		if (pathMatch) {
			return pathMatch[1].toLowerCase() as SupportedLocale;
		}
	} catch {
		// ignore
	}
	if (typeof urlInput === 'string') {
		if (urlInput.includes('lang=de') || urlInput.includes('/de/') || urlInput.endsWith('/de')) {
			return 'de';
		}
		if (urlInput.includes('lang=es') || urlInput.includes('/es/') || urlInput.endsWith('/es')) {
			return 'es';
		}
		if (urlInput.includes('lang=en') || urlInput.includes('/en/') || urlInput.endsWith('/en')) {
			return 'en';
		}
	}
	return 'en';
};

const resolveImageUrl = (img?: string) => {
	if (!img) return undefined;
	if (img.includes('vendure.allforwind.com') || img.includes('demo.vendure.io')) {
		return `${img}?w=800&h=800&format=webp`;
	}
	return img;
};

export const generateDocumentHead = (
	url: string = DEFAULT_METADATA_URL,
	title?: string,
	description?: string,
	image: string = DEFAULT_METADATA_IMAGE,
	localeInput?: string
) => {
	const detectedLocale: SupportedLocale = (localeInput as SupportedLocale) || getLocaleFromUrl(url);
	const defaultMeta = METADATA_BY_LOCALE[detectedLocale] || METADATA_BY_LOCALE.de;

	const finalTitle = title || defaultMeta.title;
	const finalDescription = description || defaultMeta.description;
	const finalImageUrl = resolveImageUrl(image);
	const isDefaultSocialImage = !image || image.includes('social-image');

	const STANDARD_METATAGS: Array<{ name: string; content?: string }> = [
		{ name: 'description', content: finalDescription },
	];

	const OG_METATAGS: Array<{ property: string; content?: string }> = [
		{ property: 'og:type', content: 'website' },
		{ property: 'og:url', content: url },
		{ property: 'og:title', content: finalTitle },
		{
			property: 'og:description',
			content: finalDescription,
		},
		{
			property: 'og:locale',
			content: defaultMeta.ogLocale,
		},
		{
			property: 'og:image',
			content: finalImageUrl,
		},
		{
			property: 'og:image:width',
			content: isDefaultSocialImage ? '1200' : '800',
		},
		{
			property: 'og:image:height',
			content: isDefaultSocialImage ? '630' : '800',
		},
		{
			property: 'og:image:type',
			content: isDefaultSocialImage ? 'image/jpeg' : 'image/webp',
		},
	];

	const TWITTER_METATAGS: Array<{ property: string; content?: string }> = [
		{ property: 'twitter:card', content: 'summary_large_image' },
		{ property: 'twitter:url', content: url },
		{ property: 'twitter:title', content: finalTitle },
		{
			property: 'twitter:description',
			content: finalDescription,
		},
		{
			property: 'twitter:image',
			content: finalImageUrl,
		},
	];

	return {
		title: finalTitle,
		meta: [...STANDARD_METATAGS, ...OG_METATAGS, ...TWITTER_METATAGS],
	};
};
