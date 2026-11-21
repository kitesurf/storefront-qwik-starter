import { component$, useContext } from '@qwik.dev/core';
import CollectionCard from '~/components/collection-card/CollectionCard';
import HeroShowcase from '~/components/hero-showcase/HeroShowcase';
import { APP_STATE } from '~/constants';

export default component$(() => {
	const collections = useContext(APP_STATE).collections;
	return (
		<div class="bg-slate-950 text-white min-h-screen">
			{/* Wanderlix-Style Cinematic Hero Header */}
			<HeroShowcase />

			{/* Category Grid Section */}
			<section class="py-16 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
				<div class="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-800">
					<div>
						<span class="text-xs font-semibold tracking-widest uppercase text-cyan-400">
							Kollektionen & Equipment
						</span>
						<h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
							Shop by Category
						</h2>
					</div>
					<p class="text-sm text-gray-400 mt-2 md:mt-0 max-w-md">
						Entdecke die neueste Range an Kites, Wings, Boards und Hydrofoils – kompromisslose
						Qualität für dein nächstes Level.
					</p>
				</div>

				<div class="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8">
					{collections.map((collection) =>
						collection.featuredAsset ? (
							<CollectionCard key={collection.id} collection={collection} />
						) : null
					)}
				</div>
			</section>
		</div>
	);
});
