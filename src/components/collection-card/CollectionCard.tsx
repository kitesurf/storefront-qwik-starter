import { component$ } from '@builder.io/qwik';
import { LocalizedLink } from '~/components/LocalizedLink';
import { Collection } from '~/generated/graphql';

interface CollectionCardProps {
  collection: Collection;
}

/**
 * Custom Cloudflare image optimization loader for use with responsive images
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

export default component$<CollectionCardProps>(({ collection }) => {
  if (!collection || !collection.featuredAsset?.preview) return null;

  // @ts-ignore - Get the base image URL
  const imageUrl = collection.featuredAsset?.preview || '';
  const imageAlt = collection.name || `Collection image for ${collection.slug}`;
  
  // Generate URLs for different screen sizes
  const mobileSrc = cloudflareImageLoader(imageUrl, { width: 480, height: 480 });
  const tabletSrc = cloudflareImageLoader(imageUrl, { width: 768, height: 768 });
  const desktopSrc = cloudflareImageLoader(imageUrl, { width: 1024, height: 1024 });
  
  return (
    <LocalizedLink href={`/collections/${collection.slug}`} key={collection.id} class="block">
      <div class="group relative mx-auto w-full max-w-full sm:max-w-[480px] md:max-w-[600px] lg:max-w-[300px]">
        <div class="relative aspect-square w-full overflow-hidden">
          {/* Using standard img tag with srcset for maximum compatibility */}
          <img 
            src={mobileSrc}
            srcset={`${mobileSrc} 480w, ${tabletSrc} 768w, ${desktopSrc} 1024w`}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 300px"
            alt={imageAlt}
            width={300}
            height={300}
            class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
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
                aria-hidden="true"
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