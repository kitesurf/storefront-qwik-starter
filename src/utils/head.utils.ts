import {
	DEFAULT_METADATA_DESCRIPTION,
	DEFAULT_METADATA_IMAGE,
	DEFAULT_METADATA_TITLE,
	DEFAULT_METADATA_URL,
} from '~/constants';

const resolveImageUrl = (img?: string) => {
	if (!img) return undefined;
	if (img.includes('vendure.allforwind.com') || img.includes('demo.vendure.io')) {
		return `${img}?w=800&h=800&format=webp`;
	}
	return img;
};

export const generateDocumentHead = (
	url = DEFAULT_METADATA_URL,
	title = DEFAULT_METADATA_TITLE,
	description = DEFAULT_METADATA_DESCRIPTION,
	image = DEFAULT_METADATA_IMAGE
) => {
	const finalImageUrl = resolveImageUrl(image);
	const isDefaultSocialImage = !image || image.includes('social-image');

	const OG_METATAGS: Array<{ property: string; content?: string }> = [
		{ property: 'og:type', content: 'website' },
		{ property: 'og:url', content: url },
		{ property: 'og:title', content: title },
		{
			property: 'og:description',
			content: description,
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
		{ property: 'twitter:title', content: title },
		{
			property: 'twitter:description',
			content: description,
		},
		{
			property: 'twitter:image',
			content: finalImageUrl,
		},
	];
	return { title, meta: [...OG_METATAGS, ...TWITTER_METATAGS] };
};
