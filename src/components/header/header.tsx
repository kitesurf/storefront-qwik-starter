import { $, component$, useContext, useVisibleTask$ } from '@qwik.dev/core';
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

export default component$(() => {
	const appState = useContext(APP_STATE);
	const location = useLocation();
	const activeLocale = (getLocale('en') || 'en').split('-')[0].split('_')[0];
	const rawPath = location.url.pathname;
	const search = location.url.search || '';
	// Normalized trailing slash so Cloudflare Pages never responds with a 301.
	// preventdefault:click + window.location.href force a
	// hard browser navigation: the Qwik SPA router would otherwise fetch
	// q-data.json, which 404s behind the products [...slug] catch-all and
	// desyncs the loaders from the page content.
	const clean = rawPath.replace(/^\/(de|es|it|fr)(\/|$)/, '/');
	const normalizedPath = clean === '/' ? '/' : clean.endsWith('/') ? clean : `${clean}/`;
	const deHref = `/de${normalizedPath}${search}`;
	const esHref = `/es${normalizedPath}${search}`;
	const itHref = `/it${normalizedPath}${search}`;
	const frHref = `/fr${normalizedPath}${search}`;
	const enHref = `${normalizedPath}${search}`;

	const collections = useContext(APP_STATE).collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

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
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
					<div class="flex items-center gap-4 lg:gap-8">
						<button
							class="block sm:hidden text-white p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 active:bg-white/20"
							onClick$={() => (appState.showMenu = !appState.showMenu)}
							aria-label={_`Open Menu`}
						>
							<span class="sr-only">{_`Menu`}</span>
							<MenuIcon />
						</button>

						<a href={`/?lang=${activeLocale}`} class="flex items-center gap-2.5 group">
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

						<nav class="hidden sm:flex items-center space-x-6">
							{collections.map((collection) => (
								<div class="relative group/nav py-2" key={collection.id}>
									<a
										class="text-sm md:text-base font-bold text-white/90 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
										href={`/collections/${collection.slug}`}
									>
										<span>{collection.name}</span>
										{collection.children && collection.children.length > 0 && (
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
									{collection.children && collection.children.length > 0 && (
										<div class="absolute left-0 top-full pt-1 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200 pointer-events-none group-hover/nav:pointer-events-auto z-50">
											<div class="bg-sky-950/95 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl py-2 min-w-[220px] flex flex-col">
												<a
													href={`/collections/${collection.slug}`}
													class="px-4 py-2 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:bg-white/10 transition-colors border-b border-white/10"
												>
													{collection.name}
												</a>
												{collection.children.map((sub: any) => (
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
							))}
						</nav>
					</div>

					<div class="flex-1 max-w-md hidden md:block">
						<SearchBar />
					</div>

					<div class="flex items-center space-x-3 sm:space-x-4">
						{/* Language Switcher */}
						<div class="hidden sm:flex items-center space-x-1 bg-white/10 rounded-full p-1 border border-white/15 text-xs font-semibold text-white">
							<a
								href={deHref}
								preventdefault:click
								onClick$={() => {
									document.cookie = 'lang=de; path=/; max-age=31536000; SameSite=Lax';
									window.location.href = deHref;
								}}
								class={[
									'min-w-[44px] min-h-[44px] flex items-center justify-center px-3 py-2 rounded-full transition-all',
									activeLocale === 'de'
										? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
										: 'hover:bg-white/20 text-white/80',
								]}
							>
								DE
							</a>
							<span class="text-white/30 text-xs">|</span>
							<a
								href={enHref}
								preventdefault:click
								onClick$={() => {
									document.cookie = 'lang=en; path=/; max-age=31536000; SameSite=Lax';
									window.location.href = enHref;
								}}
								class={[
									'min-w-[44px] min-h-[44px] flex items-center justify-center px-3 py-2 rounded-full transition-all',
									activeLocale === 'en'
										? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
										: 'hover:bg-white/20 text-white/80',
								]}
							>
								EN
							</a>
							<span class="text-white/30 text-xs">|</span>
							<a
								href={esHref}
								preventdefault:click
								onClick$={() => {
									document.cookie = 'lang=es; path=/; max-age=31536000; SameSite=Lax';
									window.location.href = esHref;
								}}
								class={[
									'min-w-[44px] min-h-[44px] flex items-center justify-center px-3 py-2 rounded-full transition-all',
									activeLocale === 'es'
										? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
										: 'hover:bg-white/20 text-white/80',
								]}
							>
								ES
							</a>
							<span class="text-white/30 text-xs">|</span>
							<a
								href={itHref}
								preventdefault:click
								onClick$={() => {
									document.cookie = 'lang=it; path=/; max-age=31536000; SameSite=Lax';
									window.location.href = itHref;
								}}
								class={[
									'min-w-[44px] min-h-[44px] flex items-center justify-center px-3 py-2 rounded-full transition-all',
									activeLocale === 'it'
										? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
										: 'hover:bg-white/20 text-white/80',
								]}
							>
								IT
							</a>
							<span class="text-white/30 text-xs">|</span>
							<a
								href={frHref}
								preventdefault:click
								onClick$={() => {
									document.cookie = 'lang=fr; path=/; max-age=31536000; SameSite=Lax';
									window.location.href = frHref;
								}}
								class={[
									'min-w-[44px] min-h-[44px] flex items-center justify-center px-3 py-2 rounded-full transition-all',
									activeLocale === 'fr'
										? 'bg-cyan-400 text-slate-950 font-bold shadow-sm'
										: 'hover:bg-white/20 text-white/80',
								]}
							>
								FR
							</a>
						</div>

						<a
							href={appState.customer.id !== CUSTOMER_NOT_DEFINED_ID ? '/account' : '/sign-in'}
							aria-label={
								appState.customer.id !== CUSTOMER_NOT_DEFINED_ID ? _`My Account` : _`Sign In`
							}
							class="min-h-[44px] min-w-[44px] flex items-center justify-center space-x-1.5 text-sm font-medium text-white/90 hover:text-cyan-300 transition-colors"
						>
							<UserIcon />
							<span class="hidden lg:inline">
								{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID ? _`My Account` : _`Sign In`}
							</span>
						</a>

						{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID && (
							<button
								onClick$={logout}
								class="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/80 hover:text-white text-sm"
							>
								<div class="flex items-center cursor-pointer">
									<span class="mr-1 hidden lg:inline">{_`Logout`}</span>
									<LogoutIcon />
								</div>
							</button>
						)}

						<button
							name="Cart"
							aria-label={`${totalQuantity} items in cart`}
							class="relative w-11 h-11 min-h-[44px] min-w-[44px] bg-white/15 hover:bg-white/25 border border-white/25 rounded-full text-white p-2 flex items-center justify-center transition-all"
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
