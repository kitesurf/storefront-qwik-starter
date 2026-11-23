import { $, component$, getLocale, useStore, useTask$ } from '@qwik.dev/core';
import { DocumentHead, routeLoader$, useLocation, type RequestHandler } from '@qwik.dev/router';

export const onGet: RequestHandler = async ({ cacheControl, headers }) => {
	cacheControl({
		public: true,
		maxAge: 60,
		sMaxAge: 3600,
		staleWhileRevalidate: 86400,
	});
	headers.set('Cache-Control', 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400');
};
import { _ } from 'compiled-i18n';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import CollectionCard from '~/components/collection-card/CollectionCard';
import Filters from '~/components/facet-filter-controls/Filters';
import FiltersButton from '~/components/filters-button/FiltersButton';
import ProductCard from '~/components/products/ProductCard';
import { SearchResponse } from '~/generated/graphql';
import { getCollectionBySlug } from '~/providers/shop/collections/collections';
import {
	searchQueryWithCollectionSlug,
	searchQueryWithTerm,
} from '~/providers/shop/products/products';
import { FacetWithValues } from '~/types';
import {
	changeUrlParamsWithoutRefresh,
	cleanUpParams,
	enableDisableFacetValues,
	generateDocumentHead,
	groupFacetValues,
} from '~/utils';

export const useCollectionLoader = routeLoader$(async ({ params: p, sharedMap, url, cookie }) => {
	try {
		const lang =
			sharedMap.get('locale') || url.searchParams.get('lang') || cookie.get('lang')?.value || 'en';
		const params = cleanUpParams(p);
		return (await getCollectionBySlug(params.slug, lang)) || null;
	} catch (err) {
		console.error('useCollectionLoader error:', err);
		return null;
	}
});

export const useSearchLoader = routeLoader$(async ({ params: p, url, cookie, sharedMap }) => {
	try {
		const lang =
			sharedMap.get('locale') || url.searchParams.get('lang') || cookie.get('lang')?.value || 'en';
		const params = cleanUpParams(p);
		const activeFacetValueIds: string[] = url.searchParams.get('f')?.split('-') || [];
		const res = activeFacetValueIds.length
			? await searchQueryWithTerm(params.slug, '', activeFacetValueIds, lang)
			: await searchQueryWithCollectionSlug(params.slug, lang);
		return res || { totalItems: 0, items: [], facetValues: [] };
	} catch (err) {
		console.error('useSearchLoader error:', err);
		return { totalItems: 0, items: [], facetValues: [] };
	}
});

export default component$(() => {
	const { params: p, url } = useLocation();
	const params = cleanUpParams(p);
	const activeFacetValueIds: string[] = url.searchParams.get('f')?.split('-') || [];

	const collectionSignal = useCollectionLoader();
	const searchSignal = useSearchLoader();

	const initialSearch = (searchSignal.value || {
		totalItems: 0,
		items: [],
		facetValues: [],
	}) as SearchResponse;

	const state = useStore<{
		showMenu: boolean;
		search: SearchResponse;
		facedValues: FacetWithValues[];
		facetValueIds: string[];
	}>({
		showMenu: false,
		search: initialSearch,
		facedValues: groupFacetValues(initialSearch, activeFacetValueIds),
		facetValueIds: activeFacetValueIds,
	});

	useTask$(async ({ track }) => {
		track(() => collectionSignal.value?.slug);
		const activeLocale = (getLocale('de') || 'de').split('-')[0].split('_')[0];
		const lang = url.searchParams.get('lang') || activeLocale || 'de';
		params.slug = cleanUpParams(p).slug;
		state.facetValueIds = url.searchParams.get('f')?.split('-') || [];
		state.search = state.facetValueIds.length
			? await searchQueryWithTerm(params.slug, '', state.facetValueIds, lang)
			: await searchQueryWithCollectionSlug(params.slug, lang);
		state.facedValues = groupFacetValues(state.search as SearchResponse, state.facetValueIds);
	});

	const onFilterChange = $(async (id: string) => {
		const activeLocale = (getLocale('de') || 'de').split('-')[0].split('_')[0];
		const lang = url.searchParams.get('lang') || activeLocale || 'de';
		const { facedValues, facetValueIds } = enableDisableFacetValues(
			state.facedValues,
			state.facetValueIds.includes(id)
				? state.facetValueIds.filter((f) => f !== id)
				: [...state.facetValueIds, id]
		);
		state.facedValues = facedValues;
		state.facetValueIds = facetValueIds;
		changeUrlParamsWithoutRefresh('', facetValueIds);

		state.search = facetValueIds.length
			? await searchQueryWithTerm(params.slug, '', state.facetValueIds, lang)
			: await searchQueryWithCollectionSlug(params.slug, lang);
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
			{/* Ambient background glow accents */}
			<div class="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
			<div class="absolute top-1/2 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
				{/* Category Header */}
				<div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-6 border-b border-white/10 gap-4">
					<div>
						<div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-cyan-300 mb-3 shadow-sm">
							<span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
							<span>{_`Eleveight Performance Collection`}</span>
						</div>
						<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
							{collectionSignal.value?.name}
						</h1>
					</div>
					<div>
						{!!state.facedValues.length && (
							<FiltersButton
								onToggleMenu$={async () => {
									state.showMenu = !state.showMenu;
								}}
							/>
						)}
					</div>
				</div>

				{/* Breadcrumbs */}
				<div class="mb-6">
					<Breadcrumbs items={collectionSignal.value?.breadcrumbs || []} darkMode={true} />
				</div>

				{/* Sub-Collections */}
				{!!collectionSignal.value?.children?.length && (
					<div class="py-6 border-b border-white/10 mb-10">
						<h2 class="text-xl font-bold text-white mb-6 flex items-center space-x-2">
							<span class="w-2 h-2 rounded-full bg-cyan-400" />
							<span>{_`Sub-Collections`}</span>
						</h2>
						<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{collectionSignal.value.children.map((child) => (
								<CollectionCard key={child.id} collection={child} />
							))}
						</div>
					</div>
				)}

				{/* Products Grid & Sidebar Filters */}
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
							{(state.search?.items || []).map((item) => (
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
						{(!state.search?.items || state.search.items.length === 0) && (
							<div class="text-center py-16 bg-slate-900/40 rounded-2xl border border-white/10 backdrop-blur-sm">
								<p class="text-slate-400 text-lg">{_`No products found in this category.`}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ resolveValue, url }) => {
	const collection = resolveValue(useCollectionLoader);
	let image = collection?.children?.[0]?.featuredAsset?.preview || undefined;
	if (!image) {
		const search = resolveValue(useSearchLoader);
		image = search?.items?.[0]?.productAsset?.preview || undefined;
	}
	const title = collection?.name ? `${collection.name} — ALL FOR WIND` : undefined;
	return generateDocumentHead(url.href, title, undefined, image);
};
