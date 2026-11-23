import gql from 'graphql-tag';
import { Product, SearchInput, SearchResponse } from '~/generated/graphql';
import { shopSdk } from '~/graphql-wrapper';
import { DEV_API, PROD_API } from '~/constants';

const baseUrl = import.meta.env.DEV ? DEV_API : PROD_API;

export const search = async (searchInput: SearchInput, lang?: string): Promise<SearchResponse> => {
	try {
		const apiUrl = lang ? `${baseUrl}/shop-api?languageCode=${lang}` : undefined;
		const res = await shopSdk.search(
			{ input: { groupByProduct: true, ...searchInput } },
			{ apiUrl }
		);
		return (
			(res?.search as SearchResponse) || {
				totalItems: 0,
				items: [],
				facetValues: [],
				collections: [],
			}
		);
	} catch (err) {
		console.error('search failed:', err);
		return { totalItems: 0, items: [], facetValues: [], collections: [] };
	}
};

export const searchQueryWithCollectionSlug = async (collectionSlug: string, lang?: string) =>
	search({ collectionSlug }, lang);

export const searchQueryWithTerm = async (
	collectionSlug: string,
	term: string,
	facetValueIds: string[],
	lang?: string
) => search({ collectionSlug, term, facetValueFilters: [{ or: facetValueIds }] }, lang);

export const getProductBySlug = async (
	slug: string,
	lang?: string
): Promise<Product | undefined> => {
	try {
		const apiUrl = lang ? `${baseUrl}/shop-api?languageCode=${lang}` : undefined;
		const res = await shopSdk.product({ slug }, { apiUrl });
		return (res?.product as Product) || undefined;
	} catch (err) {
		console.error(`getProductBySlug failed for ${slug}:`, err);
		return undefined;
	}
};

export const detailedProductFragment = gql`
	fragment DetailedProduct on Product {
		id
		name
		description
		collections {
			id
			slug
			name
			breadcrumbs {
				id
				name
				slug
			}
		}
		facetValues {
			facet {
				id
				code
				name
			}
			id
			code
			name
		}
		featuredAsset {
			id
			preview
		}
		assets {
			id
			preview
		}
		variants {
			id
			name
			priceWithTax
			currencyCode
			sku
			stockLevel
			featuredAsset {
				id
				preview
			}
		}
	}
`;

gql`
	query product($slug: String, $id: ID) {
		product(slug: $slug, id: $id) {
			...DetailedProduct
		}
	}
`;

export const listedProductFragment = gql`
	fragment ListedProduct on SearchResult {
		productId
		productName
		slug
		productAsset {
			id
			preview
		}
		currencyCode
		priceWithTax {
			... on PriceRange {
				min
				max
			}
			... on SinglePrice {
				value
			}
		}
	}
`;

gql`
	query search($input: SearchInput!) {
		search(input: $input) {
			totalItems
			items {
				...ListedProduct
			}
			facetValues {
				count
				facetValue {
					id
					name
					facet {
						id
						name
					}
				}
			}
		}
	}
	${listedProductFragment}
`;
