import { $, component$, useStore, useTask$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import Filters from '~/components/facet-filter-controls/Filters';
import FiltersButton from '~/components/filters-button/FiltersButton';
import ProductCard from '~/components/products/ProductCard';
import { SearchResponse } from '~/generated/graphql';
import { searchQueryWithTerm } from '~/providers/shop/products/products';
import { FacetWithValues } from '~/types';
import { changeUrlParamsWithoutRefresh, enableDisableFacetValues, groupFacetValues } from '~/utils';

// Constants
const ITEMS_PER_PAGE = 12;

// Types
interface SortOption {
	label: string;
	value: string;
}

interface ShopState {
	showMenu: boolean;
	search: SearchResponse;
	facedValues: FacetWithValues[];
	facetValueIds: string[];
	currentPage: number;
	isLoading: boolean;
	sortBy: string;
	viewMode: 'grid' | 'list';
}

// Sort options
const SORT_OPTIONS: SortOption[] = [
	{ label: 'Newest', value: 'newest' },
	{ label: 'Price: Low to High', value: 'price_asc' },
	{ label: 'Price: High to Low', value: 'price_desc' },
	{ label: 'Name: A-Z', value: 'name_asc' },
	{ label: 'Name: Z-A', value: 'name_desc' },
];

export const executeQuery = $(
	async (term: string, activeFacetValueIds: string[], sortBy: string = 'newest') =>
		await searchQueryWithTerm('', term, activeFacetValueIds, sortBy)
);

export const useSearchLoader = routeLoader$(async ({ query }) => {
	const term = query.get('q') || '';
	const activeFacetValueIds: string[] = query.get('f')?.split('-') || [];
	const sortBy = query.get('sort') || 'newest';
	const search = await executeQuery(term, activeFacetValueIds, sortBy);
	return { search, query };
});

export default component$(() => {
	const { url } = useLocation();
	const searchLoader = useSearchLoader();
	const term = url.searchParams.get('q') || '';

	// Enhanced state management
	const state = useStore<ShopState>({
		showMenu: false,
		search: {} as SearchResponse,
		facedValues: [],
		facetValueIds: [],
		currentPage: 1,
		isLoading: true,
		sortBy: 'newest',
		viewMode: 'grid',
	});

	// Initial load and search updates
	useTask$(async ({ track }) => {
		track(() => searchLoader.value.query);
		state.isLoading = true;

		const term = searchLoader.value.query.get('q') || '';
		const activeFacetValueIds: string[] = searchLoader.value.query.get('f')?.split('-') || [];
		const sortBy = searchLoader.value.query.get('sort') || 'newest';

		try {
			state.search = await executeQuery(term, activeFacetValueIds, sortBy);
			state.facedValues = groupFacetValues(state.search, activeFacetValueIds);
			state.facetValueIds = activeFacetValueIds;
			state.sortBy = sortBy;
		} finally {
			state.isLoading = false;
		}
	});

	// Handle filter changes
	const onFilterChange = $(async (id: string) => {
		state.isLoading = true;
		try {
			const { facedValues, facetValueIds } = enableDisableFacetValues(
				state.facedValues,
				state.facetValueIds.includes(id)
					? state.facetValueIds.filter((f) => f !== id)
					: [...state.facetValueIds, id]
			);
			state.facedValues = facedValues;
			state.facetValueIds = facetValueIds;
			state.currentPage = 1;
			//@ts-ignore
			changeUrlParamsWithoutRefresh(term, facetValueIds, state.sortBy);
			state.search = await executeQuery(term, state.facetValueIds, state.sortBy);
		} finally {
			state.isLoading = false;
		}
	});

	// Handle sort changes
	const onSortChange = $(async (sortValue: string) => {
		state.isLoading = true;
		try {
			state.sortBy = sortValue;
			//@ts-ignore
			changeUrlParamsWithoutRefresh(term, state.facetValueIds, sortValue);
			state.search = await executeQuery(term, state.facetValueIds, sortValue);
		} finally {
			state.isLoading = false;
		}
	});

	// Toggle view mode
	const toggleViewMode = $(() => {
		state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
	});

	// Calculate pagination
	const totalPages = Math.ceil((state.search.items?.length || 0) / ITEMS_PER_PAGE);
	const paginatedItems = state.search.items?.slice(
		(state.currentPage - 1) * ITEMS_PER_PAGE,
		state.currentPage * ITEMS_PER_PAGE
	);

	return (
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			{/* Header Section */}
			<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
				<h2 class="text-3xl sm:text-4xl font-light tracking-tight text-gray-900">
					{term ? `Results for "${term}"` : 'Shop All Products'}
				</h2>

				<div class="flex items-center space-x-4 mt-4 sm:mt-0">
					{/* Sort Dropdown */}
					<select
						value={state.sortBy}
						onChange$={(e) => onSortChange((e.target as HTMLSelectElement).value)}
						class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					>
						{SORT_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>

					{/* View Toggle */}
					<button
						onClick$={toggleViewMode}
						class="p-2 rounded-md hover:bg-gray-100 transition-colors"
					>
						<span class="sr-only">Toggle view</span>
						{state.viewMode === 'grid' ? (
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						) : (
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
								/>
							</svg>
						)}
					</button>

					{/* Filters Button (Mobile) */}
					{!!state.facedValues.length && (
						<FiltersButton
							onToggleMenu$={$(() => {
								state.showMenu = !state.showMenu;
							})}
						/>
					)}
				</div>
			</div>

			{/* Main Content */}
			<div class="mt-6 grid sm:grid-cols-5 gap-x-4">
				{/* Filters Section */}
				{!!state.facedValues.length && (
					<Filters
						showMenu={state.showMenu}
						facetsWithValues={state.facedValues}
						onToggleMenu$={$(() => {
							state.showMenu = !state.showMenu;
						})}
						onFilterChange$={onFilterChange}
						onOpenCloseFilter$={$((id: string) => {
							state.facedValues = state.facedValues.map((f) => ({
								...f,
								open: f.id === id ? !f.open : f.open,
							}));
						})}
					/>
				)}

				{/* Products Grid */}
				<div class="sm:col-span-5 lg:col-span-4">
					{state.isLoading ? (
						<div class="flex justify-center items-center h-64">klfwne</div>
					) : (
						<>
							{/* Products */}
							<div
								class={
									state.viewMode === 'grid'
										? 'grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
										: 'space-y-6'
								}
							>
								{paginatedItems?.map((item) => (
									<ProductCard
										key={item.productId}
										productAsset={item.productAsset}
										productName={item.productName}
										slug={item.slug}
										//@ts-ignore
										priceWithTax={item.priceWithTax}
										currencyCode={item.currencyCode}
										viewMode={state.viewMode}
									/>
								))}
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<div class="flex justify-center mt-8">
									<nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
										{/* Previous Page */}
										<button
											onClick$={() => state.currentPage > 1 && state.currentPage--}
											disabled={state.currentPage === 1}
											class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
										>
											<span class="sr-only">Previous</span>
											<svg
												class="h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
													clip-rule="evenodd"
												/>
											</svg>
										</button>

										{/* Page Numbers */}
										{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
											<button
												key={page}
												onClick$={() => (state.currentPage = page)}
												class={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
													page === state.currentPage
														? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
														: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
												}`}
											>
												{page}
											</button>
										))}

										{/* Next Page */}
										<button
											onClick$={() => state.currentPage < totalPages && state.currentPage++}
											disabled={state.currentPage === totalPages}
											class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
										>
											<span class="sr-only">Next</span>
											<svg
												class="h-5 w-5"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													fill-rule="evenodd"
													d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
													// clipRule="evenodd"
												/>
											</svg>
										</button>
									</nav>
								</div>
							)}

							{/* No Results */}
							{(!state.search.items || state.search.items.length === 0) && (
								<div class="text-center py-12">
									<h3 class="text-xl font-medium text-gray-900 mb-2">No products found</h3>
									<p class="text-gray-500">Try adjusting your search or filter criteria</p>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
});
