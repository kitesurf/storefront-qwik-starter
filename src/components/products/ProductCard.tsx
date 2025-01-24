import { component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';
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

export default component$<ProductCardProps>(
	({ productAsset, productName, slug, priceWithTax, currencyCode, subtitle, badge }) => {
		return (
			<LocalizedLink href={`/products/${slug}`} class="group block w-full">
				<div class="relative aspect-square w-full overflow-hidden bg-[#f6f6f6]">
					<Image
						layout=""
						width={1000}
						height={1000}
						src={`${productAsset?.preview}?w=2000&h=2000&format=webp`}
						alt={productName}
						class="h-full w-full transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
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
