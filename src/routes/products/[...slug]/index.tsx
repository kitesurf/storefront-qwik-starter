import { component$, useComputed$, useContext, useSignal } from '@qwik.dev/core';
import { DocumentHead, routeLoader$, type RequestHandler } from '@qwik.dev/router';

export const onGet: RequestHandler = async ({ cacheControl, headers, url }) => {
	// Qwik internals (route loaders / q-data) must never be cached — a cached
	// loader would re-hydrate the page with the previously selected language.
	if (url.pathname.includes('q-loader') || url.pathname.includes('q-data')) {
		headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		headers.set('Pragma', 'no-cache');
		return;
	}
	cacheControl({
		public: true,
		maxAge: 60,
		sMaxAge: 3600,
		staleWhileRevalidate: 86400,
	});
	headers.set('Cache-Control', 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400');
};
import { _ } from 'compiled-i18n';
import Alert from '~/components/alert/Alert';
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs';
import CheckIcon from '~/components/icons/CheckIcon';
import HeartIcon from '~/components/icons/HeartIcon';
import { Image } from '~/components/image/image';
import Price from '~/components/products/Price';
import StockLevelLabel from '~/components/stock-level-label/StockLevelLabel';
import { APP_STATE } from '~/constants';
import { Order, OrderLine } from '~/generated/graphql';
import { addItemToOrderMutation } from '~/providers/shop/orders/order';
import { getProductBySlug } from '~/providers/shop/products/products';
import { type ProductVariant } from '~/generated/graphql-shop';
import { cleanUpParams } from '~/utils/formatters';
import { generateDocumentHead } from '~/utils/head.utils';

export const useProductLoader = routeLoader$(async ({ params, sharedMap, url, cookie, status }) => {
	try {
		const lang =
			sharedMap.get('locale') || url.searchParams.get('lang') || cookie.get('lang')?.value || 'en';
		const { slug } = cleanUpParams(params);
		const product = await getProductBySlug(slug, lang);
		if (!product) {
			status(404);
			return null;
		}
		if (product.assets && product.assets.length === 1) {
			product.assets.push({
				...product.assets[0],
				id: 'placeholder_2',
				name: 'placeholder',
				preview: '/asset_placeholder.webp',
			});
		}
		return product;
	} catch (err) {
		console.error('useProductLoader error:', err);
		status(404);
		return null;
	}
});

export default component$(() => {
	const appState = useContext(APP_STATE);
	const productSignal = useProductLoader();
	const product = productSignal.value;
	const currentImageSig = useSignal(product?.assets?.[0]);
	const selectedVariantIdSignal = useSignal(product?.variants?.[0]?.id || '');
	const selectedVariantSignal = useComputed$(() =>
		product?.variants?.find((v) => v.id === selectedVariantIdSignal.value)
	);
	const addItemToOrderErrorSignal = useSignal('');
	const quantitySignal = useComputed$<Record<string, number>>(() => {
		const result: Record<string, number> = {};
		(product?.variants || []).forEach((variant: ProductVariant) => {
			const orderLine = (appState.activeOrder?.lines || []).find(
				(l: OrderLine) =>
					l.productVariant.id === variant.id && l.productVariant.product.id === product?.id
			);
			result[variant.id] = orderLine?.quantity || 0;
		});
		return result;
	});

	if (!product) {
		return (
			<div class="max-w-6xl mx-auto px-4 py-20 text-center">
				<h1 class="text-3xl font-bold text-gray-900 mb-4">{_`Product not found`}</h1>
				<p class="text-gray-600 mb-8">
					{_`The requested product could not be found or is currently unavailable.`}
				</p>
				<a
					href="/"
					class="inline-block bg-sky-700 hover:bg-sky-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
				>
					{_`Home`}
				</a>
			</div>
		);
	}

	return (
		<div>
			{selectedVariantSignal.value?.id && (
				<span class="hidden">{selectedVariantSignal.value?.id}</span>
			)}
			<div class="max-w-6xl mx-auto px-4 py-10">
				<div>
					<h1 class="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
						{product.name}
					</h1>
					<Breadcrumbs
						items={product.collections[product.collections.length - 1]?.breadcrumbs ?? []}
						darkMode={false}
					></Breadcrumbs>
					<div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
						<div class="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
							<span class="rounded-md overflow-hidden">
								<div class="h-[400px] w-full md:w-[400px]">
									{currentImageSig.value && (
										<Image
											layout="fixed"
											class="object-center object-cover rounded-lg mx-auto"
											width="400"
											height="400"
											src={currentImageSig.value.preview + '?w=400&h=400&format=webp'}
											alt={`Image of: ${currentImageSig.value.name}`}
										/>
									)}
								</div>
								{product.assets.length > 1 && (
									<div class="w-full md:w-[400px] my-2 flex flex-wrap gap-3 justify-center">
										{product.assets.map((asset, key) => (
											<Image
												key={key}
												layout="fixed"
												class={{
													'object-center object-cover rounded-lg': true,
													'border-b-8 border-primary-600': currentImageSig.value?.id === asset.id,
												}}
												width="80"
												height="80"
												src={asset.preview + '?w=400&h=400&format=webp'}
												alt={`Image of: ${asset.name}`}
												onClick$={() => {
													currentImageSig.value = asset;
												}}
											/>
										))}
									</div>
								)}
							</span>
						</div>
						<div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
							<div class="">
								<h2 class="sr-only">{_`Description`}</h2>
								<div
									class="text-base text-gray-700"
									dangerouslySetInnerHTML={product.description}
								/>
							</div>
							{1 < product.variants.length && (
								<div class="mt-4">
									<label for="variant-select" class="block text-sm font-medium text-gray-700">
										{_`Select option`}
									</label>
									<select
										id="variant-select"
										aria-label={_`Select option`}
										class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
										value={selectedVariantIdSignal.value}
										onChange$={(_, el) => (selectedVariantIdSignal.value = el.value)}
									>
										{product.variants.map((variant) => (
											<option
												key={variant.id}
												value={variant.id}
												selected={selectedVariantIdSignal.value === variant.id}
											>
												{variant.name}
											</option>
										))}
									</select>
								</div>
							)}
							<div class="mt-10 flex flex-col sm:flex-row sm:items-center">
								<Price
									priceWithTax={selectedVariantSignal.value?.priceWithTax}
									currencyCode={selectedVariantSignal.value?.currencyCode}
									variantSig={selectedVariantSignal}
									forcedClass="text-3xl text-gray-900 mr-4"
								></Price>
								<div class="flex sm:flex-col1 align-baseline">
									<button
										class={{
											'max-w-xs flex-1 transition-colors border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500 sm:w-full': true,
											'bg-primary-600 hover:bg-primary-700':
												quantitySignal.value[selectedVariantIdSignal.value] === 0,
											'bg-green-600 active:bg-green-700 hover:bg-green-700':
												quantitySignal.value[selectedVariantIdSignal.value] >= 1 &&
												quantitySignal.value[selectedVariantIdSignal.value] <= 7,
											'bg-gray-600 cursor-not-allowed':
												quantitySignal.value[selectedVariantIdSignal.value] > 7,
										}}
										onClick$={async () => {
											if (quantitySignal.value[selectedVariantIdSignal.value] <= 7) {
												const addItemToOrder = await addItemToOrderMutation(
													selectedVariantIdSignal.value,
													1
												);
												if (addItemToOrder.__typename !== 'Order') {
													addItemToOrderErrorSignal.value = addItemToOrder.errorCode;
												} else {
													appState.activeOrder = addItemToOrder as Order;
												}
											}
										}}
									>
										{quantitySignal.value[selectedVariantIdSignal.value] ? (
											<span class="flex items-center">
												<CheckIcon />
												{_`${quantitySignal.value[selectedVariantIdSignal.value]} in cart`}
											</span>
										) : (
											_`Add to cart`
										)}
									</button>
									<button
										type="button"
										class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
									>
										<HeartIcon />
										<span class="sr-only">{_`Add to favorites`}</span>
									</button>
								</div>
							</div>
							<div class="mt-2 flex items-center space-x-2">
								<span class="text-gray-500">{selectedVariantSignal.value?.sku}</span>
								<StockLevelLabel stockLevel={selectedVariantSignal.value?.stockLevel} />
							</div>
							{!!addItemToOrderErrorSignal.value && (
								<div class="mt-4">
									<Alert message={addItemToOrderErrorSignal.value} />
								</div>
							)}

							<section class="mt-12 pt-12 border-t text-xs">
								<h2 class="text-gray-600 font-bold mb-2">{_`Shipping & Returns`}</h2>
								<div class="text-gray-500 space-y-1">
									<p>
										{_`Standard shipping: 3 - 5 working days. Express shipping: 1 - 3 working days.`}
									</p>
									<p>
										{_`Shipping costs depend on delivery address and will be calculated during checkout.`}
									</p>
									<p>
										{_`Returns are subject to terms. Please see the`}{' '}
										<span class="underline">{_`returns page`}</span> {_`for further information`}.
									</p>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ resolveValue, url }) => {
	const product = resolveValue(useProductLoader);
	if (!product) {
		return generateDocumentHead(url.href, 'Produkt — ALL FOR WIND');
	}
	return generateDocumentHead(
		url.href,
		product.name,
		product.description,
		product.featuredAsset?.preview
	);
};
