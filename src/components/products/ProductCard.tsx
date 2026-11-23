import { component$ } from '@qwik.dev/core';
import { Image } from '../image/image';
import Price from './Price';

export default component$(
	({ productAsset, productName, slug, priceWithTax, currencyCode }: any) => {
		return (
			<a
				class="group relative flex flex-col w-full rounded-2xl overflow-hidden bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 shadow-lg hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all duration-300 hover:-translate-y-1 p-3.5 backdrop-blur-sm"
				href={`/products/${slug}/`}
			>
				{/* Product Image Area */}
				<div class="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-950/60 flex items-center justify-center p-3">
					<Image
						layout="constrained"
						class="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
						width="300"
						height="375"
						src={productAsset?.preview + '?w=400&h=500&format=webp'}
						alt={`Image of: ${productName}`}
					/>
					<div class="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
				</div>

				{/* Product Information */}
				<div class="mt-3.5 flex flex-col flex-grow justify-between">
					<h3 class="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
						{productName}
					</h3>
					<div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
						<Price
							priceWithTax={priceWithTax}
							currencyCode={currencyCode}
							forcedClass="text-base sm:text-lg font-extrabold text-cyan-300 tracking-tight"
						/>
						<span class="w-8 h-8 rounded-full bg-white/5 group-hover:bg-cyan-500 text-white group-hover:text-slate-950 flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-0.5">
							<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</span>
					</div>
				</div>
			</a>
		);
	}
);
