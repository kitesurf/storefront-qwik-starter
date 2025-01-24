import { $, QwikKeyboardEvent, component$, useContext, useStore, useTask$ } from '@builder.io/qwik';
import { DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import CollectionCard from '~/components/collection-card/CollectionCard';
import Filters from '~/components/facet-filter-controls/Filters';
import FiltersButton from '~/components/filters-button/FiltersButton';
import ProductCard from '~/components/products/ProductCard';
import { APP_STATE } from '~/constants';
import { SearchResponse } from '~/generated/graphql';
import { getCollectionBySlug } from '~/providers/shop/collections/collections';
import {
	searchQueryWithCollectionSlug,
	searchQueryWithTerm,
} from '~/providers/shop/products/products';
import {
	changeUrlParamsWithoutRefresh,
	cleanUpParams,
	enableDisableFacetValues,
	generateDocumentHead,
	groupFacetValues,
} from '~/utils';

export const useCollectionLoader = routeLoader$(async ({ params, request }) => {
	const url = new URL(request.url);
	const lang = url.pathname.split('/')[1] || 'en';
	return await getCollectionBySlug(params.slug, lang);
});

export const useSearchLoader = routeLoader$(async ({ params: p, url, request }) => {
	const params = cleanUpParams(p);
	const activeFacetValueIds = url.searchParams.get('f')?.split('-') || [];
	const requestUrl = new URL(request.url);
	const lang = requestUrl.pathname.split('/')[1] || 'en';
	return activeFacetValueIds.length
		? await searchQueryWithTerm(params.slug, '', activeFacetValueIds, lang)
		: await searchQueryWithCollectionSlug(params.slug, lang);
});

export default component$(() => {
	const { params: p, url } = useLocation();
	const appState = useContext(APP_STATE);
	const params = cleanUpParams(p);
	const activeFacetValueIds = url.searchParams.get('f')?.split('-') || [];

	const collectionSignal = useCollectionLoader();
	const searchSignal = useSearchLoader();

	const state = useStore({
		showMenu: false,
		search: searchSignal.value as SearchResponse,
		facedValues: groupFacetValues(searchSignal.value as SearchResponse, activeFacetValueIds),
		facetValueIds: activeFacetValueIds,
	});

	useTask$(async ({ track }) => {
		track(() => collectionSignal.value.slug);
		params.slug = cleanUpParams(p).slug;
		state.facetValueIds = url.searchParams.get('f')?.split('-') || [];
		state.search = state.facetValueIds.length
			? //   @ts-ignore
				await searchQueryWithTerm(params.slug, '', state.facetValueIds, appState.language)
			: //   @ts-ignore
				await searchQueryWithCollectionSlug(params.slug, appState.language);
		state.facedValues = groupFacetValues(state.search as SearchResponse, state.facetValueIds);
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
		changeUrlParamsWithoutRefresh('', facetValueIds);

		state.search = facetValueIds.length
			? //   @ts-ignore
				await searchQueryWithTerm(params.slug, '', state.facetValueIds, appState.language)
			: //@ts-ignore
				await searchQueryWithCollectionSlug(params.slug, appState.language);
	});

	const onOpenCloseFilter = $((id: string) => {
		state.facedValues = state.facedValues.map((f) => ({
			...f,
			open: f.id === id ? !f.open : f.open,
		}));
	});

	return (
		<div
			class="mx-auto min-h-screen max-w-8xl bg-white px-4 py-12"
			onKeyDown$={(event: QwikKeyboardEvent) => {
				if (event.key === 'Escape') state.showMenu = false;
			}}
		>
			{/* Header Section */}
			<div class="border-b border-gray-200 pb-8">
				<div class="flex items-center justify-between">
					<h1 class="font-helvetica text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl">
						{collectionSignal.value.name}
					</h1>
					{!!state.facedValues.length && (
						<FiltersButton
							onToggleMenu$={$(() => {
								state.showMenu = !state.showMenu;
							})}
						/>
					)}
				</div>
				<Breadcrumbs items={collectionSignal.value.breadcrumbs || []} />
			</div>

			{/* Sub Collections Grid */}
			{!!collectionSignal.value.children?.length && (
				<div class="border-b border-gray-200 py-16">
					<h2 class="font-helvetica text-2xl font-medium text-gray-900">Collections</h2>
					<div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{collectionSignal.value.children.map((child) => (
							<CollectionCard key={child.id} collection={child} />
						))}
					</div>
				</div>
			)}

			{/* Products Grid */}
			<div class="mt-12 lg:grid lg:grid-cols-5 lg:gap-x-8">
				{!!state.facedValues.length && (
					<Filters
						showMenu={state.showMenu}
						facetsWithValues={state.facedValues}
						onToggleMenu$={$(() => {
							state.showMenu = !state.showMenu;
						})}
						onFilterChange$={onFilterChange}
						onOpenCloseFilter$={onOpenCloseFilter}
					/>
				)}

				<div class="mt-6 lg:col-span-4 lg:mt-0">
					<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{state.search.items.map((item) => (
							<ProductCard
								key={item.productId}
								productAsset={item.productAsset}
								productName={item.productName}
								slug={item.slug}
								//@ts-ignore
								priceWithTax={item.priceWithTax}
								currencyCode={item.currencyCode}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ resolveValue, url }) => {
	const collection = resolveValue(useCollectionLoader);
	const image =
		collection.children?.[0]?.featuredAsset?.preview ||
		resolveValue(useSearchLoader).items?.[0]?.productAsset?.preview;
	return generateDocumentHead(url.href, collection.name, undefined, image);
};
