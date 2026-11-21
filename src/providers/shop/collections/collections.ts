import gql from 'graphql-tag';
import { Collection } from '~/generated/graphql';
import { shopSdk } from '~/graphql-wrapper';
import { DEV_API, PROD_API } from '~/constants';

const baseUrl = import.meta.env.DEV ? DEV_API : PROD_API;

export const getCollections = async (lang?: string) => {
	const apiUrl = lang ? `${baseUrl}/shop-api?languageCode=${lang}` : undefined;
	return await shopSdk
		.collections(undefined, { apiUrl })
		.then((res) => res?.collections.items as Collection[]);
};

export const getCollectionBySlug = async (slug: string, lang?: string) => {
	const apiUrl = lang ? `${baseUrl}/shop-api?languageCode=${lang}` : undefined;
	return await shopSdk.collection({ slug }, { apiUrl }).then((res) => res.collection as Collection);
};

gql`
	query collections {
		collections {
			items {
				id
				name
				slug
				parent {
					name
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
