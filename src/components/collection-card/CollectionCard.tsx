import { component$ } from '@qwik.dev/core';
import { Collection } from '~/generated/graphql';
import { Image } from '../image/image';

interface IProps {
	collection: Collection;
}

export default component$(({ collection }: IProps) => {
	return (
		<a
			href={`/collections/${collection.slug}`}
			key={collection.id}
			class="group relative block w-full max-w-[340px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500/50 shadow-xl hover:shadow-cyan-500/10 transition-all duration-500 hover:-translate-y-1"
		>
			<div class="relative w-full h-[280px] overflow-hidden bg-slate-950 flex items-center justify-center p-4">
				<Image
					layout="constrained"
					width="320"
					height="260"
					class="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
					src={collection.featuredAsset?.preview}
					alt={`Image of: ${collection.name}`}
				/>
				<div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
			</div>
			<div class="p-5 relative z-10 flex items-center justify-between border-t border-slate-800/80 bg-slate-900/90 backdrop-blur-sm">
				<div>
					<span class="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
						Kategorie
					</span>
					<h3 class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
						{collection.name}
					</h3>
				</div>
				<span class="w-9 h-9 rounded-full bg-white/5 group-hover:bg-cyan-500 group-hover:text-slate-950 text-white flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2.5"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</span>
			</div>
		</a>
	);
});
