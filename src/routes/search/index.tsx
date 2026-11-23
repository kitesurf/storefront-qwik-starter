import { $, component$, useStore, useTask$ } from '@qwik.dev/core';
import { DocumentHead, routeLoader$, useLocation } from '@qwik.dev/router';
import { _ } from 'compiled-i18n';
import Filters from '~/components/facet-filter-controls/Filters';
import FiltersButton from '~/components/filters-button/FiltersButton';
import ProductCard from '~/components/products/ProductCard';
import { SearchResponse } from '~/generated/graphql';
import { searchQueryWithTerm } from '~/providers/shop/products/products';
import { FacetWithValues } from '~/types';
import {
	changeUrlParamsWithoutRefresh,
	enableDisableFacetValues,
	generateDocumentHead,
	groupFacetValues,
} from '~/utils';

export const executeQuery = $(
	async (term: string, activeFacetValueIds: string[]) =>
		await searchQueryWithTerm('', term, activeFacetValueIds)
);

export const useSearchLoader = routeLoader$(async ({ query }) => {
	try {
		const term = query.get('q') || '';
		const activeFacetValueIds: string[] = query.get('f')?.split('-') || [];
		const search = await executeQuery(term, activeFacetValueIds);
		return {
			search: search || { totalItems: 0, items: [], facetValues: [], collections: [] },
			query,
		};
	} catch (err) {
		console.error('useSearchLoader error:', err);
		return {
			search: { totalItems: 0, items: [], facetValues: [], collections: [] } as SearchResponse,
			query,
		};
	}
});

export default component$(() => {
	const { url } = useLocation();
	const searchLoader = useSearchLoader();

	const term = url.searchParams.get('q') || '';

	const state = useStore<{
		showMenu: boolean;
		search: SearchResponse;
		facedValues: FacetWithValues[];
		facetValueIds: string[];
	}>({
		showMenu: false,
		search: {} as SearchResponse,
		facedValues: [],
		facetValueIds: [],
	});

	useTask$(async ({ track }) => {
		track(() => searchLoader.value.query);

		const term = searchLoader.value.query.get('q') || '';
		const activeFacetValueIds: string[] = searchLoader.value.query.get('f')?.split('-') || [];

		state.search = await executeQuery(term, activeFacetValueIds);
		state.facedValues = groupFacetValues(state.search, activeFacetValueIds);
		state.facetValueIds = activeFacetValueIds;
	});

	const onFilterChange = $(async (id: string) => {
		const { facedValues, facetValueIds } = enableDisableFacetValues(
			state.facedValues,
			state.facetValueIds.includes(id)
				? state.facetValueIds.filter((f) => f !== id)
				: [...state.facetValueIds, id]
		);
		state.facedValues = facedValues;
		state.facetValueIds = facetValueIds;
		changeUrlParamsWithoutRefresh(term, facetValueIds);

		state.search = await executeQuery(term, state.facetValueIds);
	});

	const onOpenCloseFilter = $((id: string) => {
		state.facedValues = state.facedValues.map((f) => {
			if (f.id === id) {
				f.open = !f.open;
			}
			return f;
		});
	});

	return (
		<div
			class="min-h-screen bg-gradient-to-b from-sky-950 via-slate-900 to-sky-950 text-white relative overflow-hidden pb-16"
			onKeyDown$={(event: KeyboardEvent) => {
				if (event.key === 'Escape') {
					state.showMenu = false;
				}
			}}
		>
			<div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
			<div class="absolute top-1/2 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
				<div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-white/10 gap-4">
					<div>
						<div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-cyan-300 mb-3 shadow-sm">
							<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
							<span>{_`Search Catalog`}</span>
						</div>
						<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
							{term ? `Results for "${term}"` : 'All Products'}
						</h1>
					</div>
					{!!state.facedValues.length && (
						<FiltersButton
							onToggleMenu$={async () => {
								state.showMenu = !state.showMenu;
							}}
						/>
					)}
				</div>

				<div class="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-8">
					{!!state.facedValues.length && (
						<div class="lg:col-span-1">
							<Filters
								showMenu={state.showMenu}
								facetsWithValues={state.facedValues}
								onToggleMenu$={async () => {
									state.showMenu = !state.showMenu;
								}}
								onFilterChange$={onFilterChange}
								onOpenCloseFilter$={onOpenCloseFilter}
							/>
						</div>
					)}
					<div class={state.facedValues.length ? 'lg:col-span-4' : 'lg:col-span-5'}>
						<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
							{(state.search.items || []).map((item) => (
								<ProductCard
									key={item.productId}
									productAsset={item.productAsset}
									productName={item.productName}
									slug={item.slug}
									priceWithTax={item.priceWithTax}
									currencyCode={item.currencyCode}
								/>
							))}
						</div>
						{(state.search.items || []).length === 0 && (
							<div class="text-center py-16 bg-slate-900/40 rounded-2xl border border-white/10 backdrop-blur-sm">
								<p class="text-slate-400 text-lg">{_`No products found.`}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ url }) => {
	const term = url.searchParams.get('q');
	const title = term ? `Search: "${term}" — ALL FOR WIND` : 'Search — ALL FOR WIND';
	return generateDocumentHead(url.href, title);
};
