import gql from 'graphql-tag';
import { Collection } from '~/generated/graphql';
import { shopSdk } from '~/graphql-wrapper';
import { DEV_API, PROD_API } from '~/constants';

const baseUrl = import.meta.env.DEV ? DEV_API : PROD_API;

export const getCollections = async (lang?: string): Promise<Collection[]> => {
	try {
		const apiUrl = lang ? `${baseUrl}/shop-api?languageCode=${lang}` : undefined;
		const res = await shopSdk.collections(undefined, { apiUrl });
		const items = res?.collections?.items;
		return Array.isArray(items) ? (items as Collection[]) : [];
	} catch (err) {
		console.error('getCollections failed:', err);
		return [];
	}
};

export const getCollectionBySlug = async (
	slug: string,
	lang?: string
): Promise<Collection | undefined> => {
	try {
		const apiUrl = lang ? `${baseUrl}/shop-api?languageCode=${lang}` : undefined;
		const res = await shopSdk.collection({ slug }, { apiUrl });
		return (res?.collection as Collection) || undefined;
	} catch (err) {
		console.error(`getCollectionBySlug failed for ${slug}:`, err);
		return undefined;
	}
};

gql`
	query collections {
		collections {
			items {
				id
				name
				slug
				parent {
					id
					name
				}
				children {
					id
					name
					slug
				}
				featuredAsset {
					id
					preview
				}
			}
		}
	}
`;

gql`
	query collection($slug: String, $id: ID) {
		collection(slug: $slug, id: $id) {
			id
			name
			slug
			breadcrumbs {
				id
				name
				slug
			}
			children {
				id
				name
				slug
				featuredAsset {
					id
					preview
				}
			}
		}
	}
`;
