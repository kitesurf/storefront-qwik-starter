import { $, component$, useContext, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { useLocation } from '@qwik.dev/router';
import { getLocale } from '@qwik.dev/core';
import { _ } from 'compiled-i18n';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID } from '~/constants';
import { logoutMutation } from '~/providers/shop/account/account';
import { getActiveCustomerQuery } from '~/providers/shop/customer/customer';
import LogoutIcon from '../icons/LogoutIcon';
import MenuIcon from '../icons/MenuIcon';
import ShoppingBagIcon from '../icons/ShoppingBagIcon';
import UserIcon from '../icons/UserIcon';
import SearchBar from '../search-bar/SearchBar';

const CATEGORY_ORDER = ['kitesurfing', 'wing-foiling', 'foils', 'accessories-bags'];

const CATEGORY_NAMES: Record<string, Record<string, string>> = {
	kitesurfing: {
		de: 'Kite',
		en: 'Kite',
		es: 'Kite',
		it: 'Kite',
		fr: 'Kite',
	},
	'wing-foiling': {
		de: 'Wing / Parawing',
		en: 'Wing / Parawing',
		es: 'Wing / Parawing',
		it: 'Wing / Parawing',
		fr: 'Wing / Parawing',
	},
	foils: {
		de: 'Foils',
		en: 'Foils',
		es: 'Foils',
		it: 'Foils',
		fr: 'Foils',
	},
	'accessories-bags': {
		de: 'Extras',
		en: 'Extras',
		es: 'Extras',
		it: 'Extras',
		fr: 'Extras',
	},
};

const SPARE_PARTS_NAME: Record<string, string> = {
	de: 'Ersatzteile',
	en: 'Spare Parts',
	es: 'Repuestos',
	it: 'Ricambi',
	fr: 'Pièces détachées',
};

export default component$(() => {
	const appState = useContext(APP_STATE);
	const location = useLocation();
	const activeLocale = (getLocale('en') || 'en').split('-')[0].split('_')[0];
	const isLangOpen = useSignal(false);
	const rawPath = location.url.pathname;
	// Cloudflare Pages internally rewrites /fr/x to /x?lang=fr — leaking that
	// lang param into switcher links would produce /fr/x?lang=de mismatches.
	const searchParams = new URLSearchParams(location.url.search);
	searchParams.delete('lang');
	const cleanSearch = searchParams.toString() ? `?${searchParams.toString()}` : '';
	// Normalized trailing slash so Cloudflare Pages never responds with a 301.
	// preventdefault:click + window.location.assign force a
	// hard browser navigation: the Qwik SPA router would otherwise fetch
	// q-data.json, which 404s behind the products [...slug] catch-all and
	// desyncs the loaders from the page content.
	const clean = rawPath.replace(/^\/(de|en|es|it|fr)(\/|$)/, '/');
	const normalizedPath = clean === '/' ? '/' : clean.endsWith('/') ? clean : `${clean}/`;
	const deHref = `/de${normalizedPath}${cleanSearch}`;
	const enHref = `/en${normalizedPath}${cleanSearch}`;
	const esHref = `/es${normalizedPath}${cleanSearch}`;
	const itHref = `/it${normalizedPath}${cleanSearch}`;
	const frHref = `/fr${normalizedPath}${cleanSearch}`;

	const LANGUAGES = [
		{ code: 'de', label: 'Deutsch', short: 'DE', href: deHref },
		{ code: 'en', label: 'English', short: 'EN', href: enHref },
		{ code: 'es', label: 'Español', short: 'ES', href: esHref },
		{ code: 'it', label: 'Italiano', short: 'IT', href: itHref },
		{ code: 'fr', label: 'Français', short: 'FR', href: frHref },
	];

	const rawCollections = useContext(APP_STATE).collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const collections = [...rawCollections].sort((a, b) => {
		const indexA = CATEGORY_ORDER.indexOf(a.slug);
		const indexB = CATEGORY_ORDER.indexOf(b.slug);
		return (indexA === -1 ? 99 : indexA) - (indexB === -1 ? 99 : indexB);
	});

	const totalQuantity =
		appState.activeOrder?.state !== 'PaymentAuthorized'
			? appState.activeOrder?.totalQuantity || 0
			: 0;

	useVisibleTask$(async () => {
		if (appState.customer.id === CUSTOMER_NOT_DEFINED_ID) {
			const activeCustomer = await getActiveCustomerQuery();
			if (activeCustomer) {
				appState.customer = {
					title: activeCustomer.title ?? '',
					firstName: activeCustomer.firstName,
					id: activeCustomer.id,
					lastName: activeCustomer.lastName,
					emailAddress: activeCustomer.emailAddress,
					phoneNumber: activeCustomer.phoneNumber ?? '',
				};
			}
		}
	});

	const logout = $(async () => {
		await logoutMutation();
		window.location.href = '/';
	});

	return (
		<div class="bg-sky-950/95 backdrop-blur-md border-b border-white/15 shadow-lg sticky top-0 z-40">
			<header>
				<div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 md:gap-4 w-full min-w-0">
					<div class="flex items-center gap-3 lg:gap-8 shrink-0 min-w-0">
						<button
							class="block lg:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/20 shrink-0"
							onClick$={() => (appState.showMenu = !appState.showMenu)}
							aria-label={_`Open Menu`}
						>
							<span class="sr-only">{_`Menu`}</span>
							<MenuIcon />
						</button>

						<a
							href={`/?lang=${activeLocale}`}
							class="flex items-center gap-2 sm:gap-2.5 group shrink-0"
						>
							<svg
								viewBox="0 0 64 64"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								class="w-10 h-10 shrink-0 transition-transform duration-300 group-hover:scale-105"
							>
								<path
									d="M8 30C16 12 40 8 56 16C46 20 34 26 26 38C20 32 14 30 8 30Z"
									fill="url(#afw_g1)"
								/>
								<path
									d="M12 46C22 46 28 34 40 34C47 34 52 38 56 42C50 48 42 52 32 52C22 52 16 49 12 46Z"
									fill="#67e8f9"
									fill-opacity="0.9"
								/>
								<path
									d="M18 36C28 24 42 20 55 23"
									stroke="#ffffff"
									stroke-width="2.5"
									stroke-linecap="round"
								/>
								<defs>
									<linearGradient
										id="afw_g1"
										x1="8"
										y1="10"
										x2="56"
										y2="38"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#67e8f9" />
										<stop offset="1" stop-color="#38bdf8" />
									</linearGradient>
								</defs>
							</svg>
							<div class="leading-none">
								<div class="text-xs font-bold tracking-[0.2em] text-cyan-300 uppercase">
									ALL FOR
								</div>
								<div class="text-xl font-black tracking-wider text-white uppercase italic -mt-0.5">
									WIND
								</div>
							</div>
						</a>

						<nav class="hidden lg:flex items-center space-x-3 xl:space-x-5 shrink-0">
							{collections.map((collection) => {
								const displayName =
									CATEGORY_NAMES[collection.slug]?.[activeLocale] || collection.name;
								const children = [...(collection.children || [])] as any[];
								if (collection.slug === 'accessories-bags') {
									children.push({
										id: 'spare-parts-nav',
										name: SPARE_PARTS_NAME[activeLocale] || 'Spare Parts',
										slug: 'accessories-bags',
									});
								}
								return (
									<div class="relative group/nav py-2" key={collection.id}>
										<a
											class="text-sm md:text-base font-bold text-white/90 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
											href={`/collections/${collection.slug}`}
										>
											<span>{displayName}</span>
											{children.length > 0 && (
												<svg
													class="w-3.5 h-3.5 text-white/50 group-hover/nav:text-cyan-300 group-hover/nav:rotate-180 transition-transform duration-200"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M19 9l-7 7-7-7"
													/>
												</svg>
											)}
										</a>
										{children.length > 0 && (
											<div class="absolute left-0 top-full pt-1 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200 pointer-events-none group-hover/nav:pointer-events-auto z-50">
												<div class="bg-sky-950/95 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl py-2 min-w-[220px] flex flex-col">
													<a
														href={`/collections/${collection.slug}`}
														class="px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:bg-white/10 transition-colors border-b border-white/10"
													>
														{displayName}
													</a>
													{children.map((sub: any) => (
														<a
															key={sub.id}
															href={`/collections/${sub.slug}`}
															class="px-4 py-2.5 text-sm font-medium text-white/90 hover:text-cyan-300 hover:bg-white/10 transition-colors flex items-center justify-between"
														>
															<span>{sub.name}</span>
															<span class="text-xs text-white/30">→</span>
														</a>
													))}
												</div>
											</div>
										)}
									</div>
								);
							})}
						</nav>
					</div>

					<div class="flex-1 max-w-xs md:max-w-sm lg:max-w-md hidden md:block min-w-0 mx-2 lg:mx-4">
						<SearchBar />
					</div>

					<div class="flex items-center space-x-2 sm:space-x-3 shrink-0">
						{/* Language Switcher Dropdown */}
						<div class="relative group/lang py-1 shrink-0">
							<button
								type="button"
								onClick$={() => (isLangOpen.value = !isLangOpen.value)}
								class="flex flex-col items-start px-2 sm:px-2.5 py-1 rounded-lg hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer text-left border border-white/10 hover:border-white/25 focus:outline-none"
								aria-label={_`Change language`}
							>
								<span class="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-white/60 leading-tight">
									{_`Language`}
								</span>
								<span class="flex items-center gap-1 text-xs sm:text-sm font-bold text-white leading-tight mt-0.5">
									<span>{activeLocale.toUpperCase()}</span>
									<svg
										class={[
											'w-3.5 h-3.5 text-white/70 transition-transform duration-200',
											isLangOpen.value
												? 'rotate-180 text-cyan-300'
												: 'group-hover/lang:rotate-180 group-hover/lang:text-cyan-300',
										]}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2.5"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</span>
							</button>

							{/* Backdrop for click outside */}
							{isLangOpen.value && (
								<div
									class="fixed inset-0 z-40 bg-transparent"
									onClick$={() => (isLangOpen.value = false)}
								/>
							)}

							{/* Floating Dropdown */}
							<div
								class={[
									'absolute right-0 top-full pt-1.5 transition-all duration-200 z-50',
									isLangOpen.value
										? 'opacity-100 visible pointer-events-auto'
										: 'opacity-0 invisible pointer-events-none group-hover/lang:opacity-100 group-hover/lang:visible group-hover/lang:pointer-events-auto',
								]}
							>
								<div class="bg-sky-950/95 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl py-1.5 min-w-[155px] flex flex-col overflow-hidden">
									<div class="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400/80 border-b border-white/10">
										{_`Language`}
									</div>
									{LANGUAGES.map((lang) => (
										<button
											key={lang.code}
											type="button"
											onClick$={() => {
												isLangOpen.value = false;
												document.cookie = `lang=${lang.code}; path=/; max-age=31536000; SameSite=Lax`;
												window.location.assign(lang.href);
											}}
											class={[
												'px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer text-left w-full',
												activeLocale === lang.code
													? 'bg-cyan-400/20 text-cyan-300 font-bold'
													: 'text-white/85 hover:bg-white/10 hover:text-white',
											]}
										>
											<span class="flex items-center gap-2.5">
												<span class="w-6 text-[11px] font-bold tracking-wider text-cyan-400">
													{lang.short}
												</span>
												<span>{lang.label}</span>
											</span>
											{activeLocale === lang.code && (
												<svg
													class="w-3.5 h-3.5 text-cyan-400"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2.5"
														d="M5 13l4 4L19 7"
													/>
												</svg>
											)}
										</button>
									))}
								</div>
							</div>
						</div>

						<a
							href={appState.customer.id !== CUSTOMER_NOT_DEFINED_ID ? '/account' : '/sign-in'}
							aria-label={
								appState.customer.id !== CUSTOMER_NOT_DEFINED_ID ? _`My Account` : _`Sign In`
							}
							class="min-h-[44px] min-w-[44px] flex items-center justify-center space-x-1.5 text-sm font-medium text-white/90 hover:text-cyan-300 transition-colors shrink-0"
						>
							<UserIcon />
							<span class="hidden xl:inline">
								{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID ? _`My Account` : _`Sign In`}
							</span>
						</a>

						{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID && (
							<button
								onClick$={logout}
								class="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/80 hover:text-white text-sm shrink-0"
							>
								<div class="flex items-center cursor-pointer">
									<span class="mr-1 hidden xl:inline">{_`Logout`}</span>
									<LogoutIcon />
								</div>
							</button>
						)}

						<button
							name="Cart"
							aria-label={`${totalQuantity} items in cart`}
							class="relative w-11 h-11 min-h-[44px] min-w-[44px] bg-white/15 hover:bg-white/25 border border-white/25 rounded-full text-white p-2 flex items-center justify-center transition-all shrink-0"
							onClick$={() => (appState.showCart = !appState.showCart)}
						>
							<ShoppingBagIcon />
							{totalQuantity ? (
								<div class="absolute rounded-full -top-1.5 -right-1.5 bg-cyan-400 text-slate-950 font-bold text-xs w-5 h-5 flex items-center justify-center">
									{totalQuantity}
								</div>
							) : (
								''
							)}
						</button>
					</div>
				</div>
			</header>
		</div>
	);
});
