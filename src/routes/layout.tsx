import {
	$,
	Slot,
	component$,
	useContextProvider,
	useOn,
	useStore,
	useVisibleTask$,
} from '@qwik.dev/core';
import { RequestHandler, routeLoader$ } from '@qwik.dev/router';
import { ImageTransformerProps, useImageProvider } from '~/components/image/image';
import Menu from '~/components/menu/Menu';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID, IMAGE_RESOLUTIONS } from '~/constants';
import { Order } from '~/generated/graphql';
import { getAvailableCountriesQuery } from '~/providers/shop/checkout/checkout';
import { getCollections } from '~/providers/shop/collections/collections';
import { getActiveOrderQuery } from '~/providers/shop/orders/order';
import { ActiveCustomer, AppState } from '~/types';
import Cart from '../components/cart/Cart';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';

export const onGet: RequestHandler = async ({ cacheControl, headers, url }) => {
	const pathname = url.pathname;
	const isPrivate = pathname.startsWith('/account') || pathname.startsWith('/checkout');
	if (!isPrivate) {
		cacheControl({
			public: true,
			maxAge: 60,
			sMaxAge: 3600,
			staleWhileRevalidate: 86400,
		});
		headers.set('Cache-Control', 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400');
	}
};

export const useCollectionsLoader = routeLoader$(async ({ sharedMap, url, cookie }) => {
	try {
		const lang =
			sharedMap.get('locale') || url.searchParams.get('lang') || cookie.get('lang')?.value || 'en';
		const collections = await getCollections(lang);
		return Array.isArray(collections) ? collections : [];
	} catch (err) {
		console.error('useCollectionsLoader error:', err);
		return [];
	}
});

export const useAvailableCountriesLoader = routeLoader$(async () => {
	try {
		const countries = await getAvailableCountriesQuery();
		return Array.isArray(countries) ? countries : [];
	} catch (err) {
		console.error('useAvailableCountriesLoader error:', err);
		return [];
	}
});

export const onRequest: RequestHandler = ({
	query,
	locale,
	url,
	cookie,
	sharedMap,
	cacheControl,
	headers,
	method,
}) => {
	const pathname = url.pathname;
	const queryLang = query.get('lang');
	const cookieLang = cookie.get('lang')?.value;
	let activeLang = 'en';

	if (queryLang && ['de', 'en', 'es'].includes(queryLang)) {
		activeLang = queryLang;
	} else if (cookieLang && ['de', 'en', 'es'].includes(cookieLang)) {
		activeLang = cookieLang;
	} else {
		activeLang = 'en';
	}

	locale(activeLang);
	sharedMap.set('locale', activeLang);

	if (method === 'GET') {
		const isPrivate = pathname.startsWith('/account') || pathname.startsWith('/checkout');
		if (!isPrivate) {
			cacheControl({
				public: true,
				maxAge: 60,
				sMaxAge: 3600,
				staleWhileRevalidate: 86400,
			});
			headers.set(
				'Cache-Control',
				'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
			);
		}
	}
};

export default component$(() => {
	const imageTransformer$ = $(({ src, width, height }: ImageTransformerProps): string => {
		return `${src}?w=${width}&h=${height}&format=webp`;
	});

	// Provide your default options
	useImageProvider({
		imageTransformer$,
		resolutions: IMAGE_RESOLUTIONS,
	});

	const collectionsSignal = useCollectionsLoader();
	const availableCountriesSignal = useAvailableCountriesLoader();

	const state = useStore<AppState>({
		showCart: false,
		showMenu: false,
		customer: { id: CUSTOMER_NOT_DEFINED_ID, firstName: '', lastName: '' } as ActiveCustomer,
		activeOrder: {} as Order,
		collections: collectionsSignal.value || [],
		availableCountries: availableCountriesSignal.value || [],
		shippingAddress: {
			id: '',
			city: '',
			company: '',
			countryCode:
				availableCountriesSignal.value && availableCountriesSignal.value.length > 0
					? availableCountriesSignal.value[0].code
					: '',
			fullName: '',
			phoneNumber: '',
			postalCode: '',
			province: '',
			streetLine1: '',
			streetLine2: '',
		},
		addressBook: [],
	});

	useContextProvider(APP_STATE, state);

	useVisibleTask$(async () => {
		state.activeOrder = await getActiveOrderQuery();
	});

	useVisibleTask$(({ track }) => {
		track(() => state.showCart);
		track(() => state.showMenu);

		state.showCart || state.showMenu
			? document.body.classList.add('overflow-hidden')
			: document.body.classList.remove('overflow-hidden');
	});

	useOn(
		'keydown',
		$((event: unknown) => {
			if ((event as KeyboardEvent).key === 'Escape') {
				state.showCart = false;
				state.showMenu = false;
			}
		})
	);

	return (
		<div>
			<Header />
			<Cart />
			<Menu />
			<main class="min-h-screen bg-gray-50">
				<Slot />
			</main>
			<Footer />
		</div>
	);
});
