// import { component$ } from '@builder.io/qwik';
// import { Image } from '@unpic/qwik';
// import { LocalizedLink } from '~/components/LocalizedLink';
// import Price from './Price';

// interface ProductCardProps {
// 	productAsset: any;
// 	productName: string;
// 	slug: string;
// 	priceWithTax: number;
// 	currencyCode: string;
// 	subtitle?: string;
// 	badge?: string;
// 	colors?: number;
// }

// export default component$<ProductCardProps>(
// 	({ productAsset, productName, slug, priceWithTax, currencyCode, subtitle, badge }) => {
// 		return (
// 			<LocalizedLink href={`/products/${slug}`} class="group block w-full">
// 				<div class="relative aspect-square w-full overflow-hidden bg-[#f6f6f6]">
// 					<Image
// 						// layout=""
// 						width={1000}
// 						height={1000}
// 						src={`${productAsset?.preview}?w=2000&h=2000&format=auto`}
// 						alt={productName}
// 						class="h-full w-full transition-transform duration-500 group-hover:scale-105"
// 						loading="lazy"
// 					/>
// 					{badge && (
// 						<span class="absolute left-4 top-4 bg-orange-600 px-2 py-1 text-sm font-medium text-white">
// 							{badge}
// 						</span>
// 					)}
// 				</div>

// 				<div class="mt-4 space-y-1">
// 					{badge && <p class="text-sm font-medium text-orange-600">{badge}</p>}
// 					<h3 class="text-base font-medium text-gray-900">{productName}</h3>
// 					{subtitle && <p class="text-base text-gray-500">{subtitle}</p>}
// 					{/* <p class="text-base text-gray-500">{colors} Colour</p> */}
// 					<Price
// 						priceWithTax={priceWithTax}
// 						currencyCode={currencyCode}
// 						forcedClass="text-base font-medium text-gray-900"
// 					/>
// 				</div>
// 			</LocalizedLink>
// 		);
// 	}
// );


import { component$ } from '@builder.io/qwik';
import { LocalizedLink } from '~/components/LocalizedLink';
import Price from './Price';

interface ProductCardProps {
	productAsset: any;
	productName: string;
	slug: string;
	priceWithTax: number;
	currencyCode: string;
	subtitle?: string;
	badge?: string;
	colors?: number;
}

/**
 * Custom Cloudflare image optimization loader
 */
interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  fit?: string;
  f?: string;
}

export const cloudflareImageLoader = (url: string, options: ImageOptions = {}): string => {
  if (!url) return '';

  try {
    const urlObj = new URL(url);

    // Build the transformation parameters
    const params = [];
    if (options.width) params.push(`width=${options.width}`);
    if (options.height) params.push(`height=${options.height}`);
    params.push(`quality=${options.quality || 80}`);
    params.push(`fit=${options.fit || 'cover'}`);
    params.push(`f=${options.f || 'auto'}`);

    // Construct the final URL with Cloudflare image resizing
    const domain = `${urlObj.protocol}//${urlObj.hostname}`;
    const pathname = urlObj.pathname;

    return `${domain}/cdn-cgi/image/${params.join(',')}${pathname}`;
  } catch (e) {
    console.error('Error transforming image URL:', e);
    return url || '';
  }
};

export default component$<ProductCardProps>(
	({ productAsset, productName, slug, priceWithTax, currencyCode, subtitle, badge }) => {
		if (!productAsset?.preview) return null;
		
		// Generate URLs for different screen sizes
		const imageUrl = productAsset.preview;
		const mobileSrc = cloudflareImageLoader(imageUrl, { width: 480, height: 480 });
		const tabletSrc = cloudflareImageLoader(imageUrl, { width: 768, height: 768 });
		const desktopSrc = cloudflareImageLoader(imageUrl, { width: 1000, height: 1000 });
		
		return (
			<LocalizedLink href={`/products/${slug}`} class="group block w-full">
				<div class="relative aspect-square w-full overflow-hidden bg-[#f6f6f6]">
					{/* Responsive image with srcset */}
					<img 
						src={mobileSrc}
						srcset={`${mobileSrc} 480w, ${tabletSrc} 768w, ${desktopSrc} 1000w`}
						sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
						alt={productName}
						width={480}
						height={480}
						class="h-full w-full transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
						decoding="async"
					/>
					{badge && (
						<span class="absolute left-4 top-4 bg-orange-600 px-2 py-1 text-sm font-medium text-white">
							{badge}
						</span>
					)}
				</div>

				<div class="mt-4 space-y-1">
					{badge && <p class="text-sm font-medium text-orange-600">{badge}</p>}
					<h3 class="text-base font-medium text-gray-900">{productName}</h3>
					{subtitle && <p class="text-base text-gray-500">{subtitle}</p>}
					{/* <p class="text-base text-gray-500">{colors} Colour</p> */}
					<Price
						priceWithTax={priceWithTax}
						currencyCode={currencyCode}
						forcedClass="text-base font-medium text-gray-900"
					/>
				</div>
			</LocalizedLink>
		);
	}
);