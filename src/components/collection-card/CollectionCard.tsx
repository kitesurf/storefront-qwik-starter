import { component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';
import { LocalizedLink } from '~/components/LocalizedLink';
import { Collection } from '~/generated/graphql';

interface CollectionCardProps {
	collection: Collection;
}
// Create a new file: src/lib/cloudflare-image.js (or ts)

/**
 * Custom Cloudflare image optimization loader for use with @unpic/qwik
 * @param {string} url - The original image URL
 * @param {Object} options - Image options including width and height
 * @returns {string} - The transformed Cloudflare URL
 */
interface ImageOptions {
	width?: number;
	height?: number;
}

export const cloudflareImageLoader = (url: string, options: ImageOptions = {}): string => {
	if (!url) return url;

	try {
		const urlObj = new URL(url);

		// Build the transformation parameters
		const params = [];
		if (options.width) params.push(`width=${options.width}`);
		if (options.height) params.push(`height=${options.height}`);
		params.push('format=auto');
		params.push('quality=80');
		params.push('fit=cover');

		// Construct the final URL with Cloudflare image resizing
		const domain = `${urlObj.protocol}//${urlObj.hostname}`;
		const pathname = urlObj.pathname;

		return `${domain}/cdn-cgi/image/${params.join(',')}${pathname}`;
	} catch (e) {
		console.error('Error transforming image URL:', e);
		return url;
	}
};

export default component$<CollectionCardProps>(({ collection }) => {
	if (!collection) return null;

	return (
		<LocalizedLink href={`/collections/${collection.slug}`} key={collection.id} class="block">
			<div class="group relative mx-auto max-w-[300px]">
				<div class="relative aspect-square w-full overflow-hidden">
					{/* <Image
						layout="fixed"
						width={300}
						height={300}
						//@ts-ignore
						src={collection.featuredAsset?.preview}
						alt={collection.name}
						class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
					/> */}
					<Image
						// layout="fixed"
						width={300}
						height={300}
						//@ts-ignore
						src={cloudflareImageLoader(collection.featuredAsset?.preview, { width: 300, height: 300 })} 
						alt={collection.name}
						class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
					/>

					{/* Overlay container for title and arrow */}
					<div class="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3">
						<div class="flex items-center justify-between text-white">
							<h3 class="text-lg font-bold">{collection.name}</h3>
							<svg
								class="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width={2}
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</LocalizedLink>
	);
});
