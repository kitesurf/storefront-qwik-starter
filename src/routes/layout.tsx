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
import { guessLocale } from 'compiled-i18n';
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

export const onGet: RequestHandler = async ({ cacheControl }) => {
	cacheControl({ staleWhileRevalidate: 60 * 60 * 24 * 7, maxAge: 5 });
};

export const useCollectionsLoader = routeLoader$(async ({ query, cookie }) => {
	const lang = query.get('lang') || cookie.get('lang')?.value || 'de';
	return await getCollections(lang);
});

export const useAvailableCountriesLoader = routeLoader$(async () => {
	return await getAvailableCountriesQuery();
});

export const onRequest: RequestHandler = ({ request, query, locale, url, redirect, cookie }) => {
	const pathname = url.pathname;
	const match = pathname.match(/^\/(de|en|es)(\/.*)?$/);
	if (match) {
		const lang = match[1];
		const remaining = match[2] || '/';
		const searchParams = new URLSearchParams(url.search);
		searchParams.set('lang', lang);
		const qs = searchParams.toString();
		throw redirect(302, `${remaining}${qs ? `?${qs}` : ''}`);
	}
	const queryLang = query.get('lang');
	if (queryLang && ['de', 'en', 'es'].includes(queryLang)) {
		cookie.set('lang', queryLang, { path: '/', maxAge: [365, 'days'], httpOnly: false });
	}
	const cookieLang = cookie.get('lang')?.value;
	const lang = queryLang || cookieLang || request.headers.get('accept-language');
	const guessedLocale = guessLocale(lang);
	locale(guessedLocale);
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
			<main class="pb-12 bg-gray-50">
				<Slot />
			</main>
			<Footer />
		</div>
	);
});
