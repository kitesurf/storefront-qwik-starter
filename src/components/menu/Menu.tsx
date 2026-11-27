import { $, component$, useContext, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { useLocation } from '@qwik.dev/router';
import { getLocale } from '@qwik.dev/core';
import { _ } from 'compiled-i18n';
import { APP_STATE } from '~/constants';
import CloseIcon from '../icons/CloseIcon';

export default component$(() => {
	const appState = useContext(APP_STATE);
	const location = useLocation();
	const activeLocale = (getLocale('en') || 'en').split('-')[0].split('_')[0];
	const rawPath = location.url.pathname;
	const search = location.url.search || '';
	// Normalized trailing slash so Cloudflare Pages never responds with a 301.
	// preventdefault:click (native buttons never get intercepted by the Qwik
	// router) + window.location.assign force a hard browser navigation: the SPA
	// router would otherwise fetch q-data.json, which 404s behind the products
	// [...slug] catch-all and desyncs the loaders from the page content.
	const clean = rawPath.replace(/^\/(de|en|es|it|fr)(\/|$)/, '/');
	const normalizedPath = clean === '/' ? '/' : clean.endsWith('/') ? clean : `${clean}/`;
	const deHref = `/de${normalizedPath}${search}`;
	const enHref = `/en${normalizedPath}${search}`;
	const esHref = `/es${normalizedPath}${search}`;
	const itHref = `/it${normalizedPath}${search}`;
	const frHref = `/fr${normalizedPath}${search}`;
	const collections = useContext(APP_STATE).collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const isStandalone = useSignal(false);
	useVisibleTask$(() => {
		isStandalone.value =
			window.matchMedia('(display-mode: standalone)').matches ||
			(navigator as any).standalone === true;
	});

	// Reuses the deferred prompt captured by the PwaInstallBanner; without one
	// (e.g. iOS) the banner is force-opened via ?install=app with the manual steps.
	const openPwaInstall$ = $(() => {
		const deferred = (window as any).__afwDeferredPrompt;
		if (deferred) {
			deferred.prompt();
			return;
		}
		const url = new URL(window.location.href);
		url.searchParams.set('install', 'app');
		window.location.href = url.toString();
	});

	return (
		<>
			{appState.showMenu && (
				<div class="fixed inset-0 overflow-hidden z-20">
					<div class="absolute inset-0 overflow-hidden">
						<div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity opacity-100"></div>
						<div class="fixed inset-y-0 pr-10 max-w-full flex">
							<div class="w-screen max-w-md translate-x-0">
								<div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
									<div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
										<div class="flex items-start justify-between">
											<h2 class="text-lg font-medium text-gray-900">{_`Menu`}</h2>
											<div class="ml-3 h-7 flex items-center">
												<button
													type="button"
													class="-m-2 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-gray-500"
													onClick$={() => (appState.showMenu = false)}
												>
													<span class="sr-only">Close panel</span>
													<CloseIcon />
												</button>
											</div>
										</div>

										{/* Language Switcher in Mobile Menu */}
										<div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
											<span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">
												{_`Language`}
											</span>
											<div class="flex items-center space-x-1 bg-gray-100 rounded-full p-1 text-xs font-semibold">
												<button
													type="button"
													onClick$={() => {
														appState.showMenu = false;
														document.cookie = 'lang=de; path=/; max-age=31536000; SameSite=Lax';
														window.location.assign(deHref);
													}}
													class={[
														'min-w-[44px] min-h-[44px] flex items-center justify-center px-3.5 py-2 rounded-full transition-all cursor-pointer',
														activeLocale === 'de'
															? 'bg-sky-600 text-white font-bold shadow-sm'
															: 'text-gray-600 hover:bg-gray-200',
													]}
												>
													DE
												</button>
												<span class="text-gray-300 text-xs">|</span>
												<button
													type="button"
													onClick$={() => {
														appState.showMenu = false;
														document.cookie = 'lang=en; path=/; max-age=31536000; SameSite=Lax';
														window.location.assign(enHref);
													}}
													class={[
														'min-w-[44px] min-h-[44px] flex items-center justify-center px-3.5 py-2 rounded-full transition-all cursor-pointer',
														activeLocale === 'en'
															? 'bg-sky-600 text-white font-bold shadow-sm'
															: 'text-gray-600 hover:bg-gray-200',
													]}
												>
													EN
												</button>
												<span class="text-gray-300 text-xs">|</span>
												<button
													type="button"
													onClick$={() => {
														appState.showMenu = false;
														document.cookie = 'lang=es; path=/; max-age=31536000; SameSite=Lax';
														window.location.assign(esHref);
													}}
													class={[
														'min-w-[44px] min-h-[44px] flex items-center justify-center px-3.5 py-2 rounded-full transition-all cursor-pointer',
														activeLocale === 'es'
															? 'bg-sky-600 text-white font-bold shadow-sm'
															: 'text-gray-600 hover:bg-gray-200',
													]}
												>
													ES
												</button>
												<span class="text-gray-300 text-xs">|</span>
												<button
													type="button"
													onClick$={() => {
														appState.showMenu = false;
														document.cookie = 'lang=it; path=/; max-age=31536000; SameSite=Lax';
														window.location.assign(itHref);
													}}
													class={[
														'min-w-[44px] min-h-[44px] flex items-center justify-center px-3.5 py-2 rounded-full transition-all cursor-pointer',
														activeLocale === 'it'
															? 'bg-sky-600 text-white font-bold shadow-sm'
															: 'text-gray-600 hover:bg-gray-200',
													]}
												>
													IT
												</button>
												<span class="text-gray-300 text-xs">|</span>
												<button
													type="button"
													onClick$={() => {
														appState.showMenu = false;
														document.cookie = 'lang=fr; path=/; max-age=31536000; SameSite=Lax';
														window.location.assign(frHref);
													}}
													class={[
														'min-w-[44px] min-h-[44px] flex items-center justify-center px-3.5 py-2 rounded-full transition-all cursor-pointer',
														activeLocale === 'fr'
															? 'bg-sky-600 text-white font-bold shadow-sm'
															: 'text-gray-600 hover:bg-gray-200',
													]}
												>
													FR
												</button>
											</div>
										</div>

										<div class="flex flex-col pt-6 space-y-4">
											{collections.map((collection) => (
												<div key={collection.id} class="border-b border-gray-100 pb-3">
													<a
														class="text-lg font-bold text-gray-900 hover:text-sky-600 block"
														href={`/collections/${collection.slug}`}
														onClick$={() => (appState.showMenu = false)}
													>
														{collection.name}
													</a>
													{collection.children && collection.children.length > 0 && (
														<div class="pl-3 mt-2 flex flex-col space-y-2 border-l-2 border-cyan-400">
															{collection.children.map((sub: any) => (
																<a
																	key={sub.id}
																	href={`/collections/${sub.slug}`}
																	class="text-sm font-medium text-gray-600 hover:text-cyan-600 py-0.5 flex items-center justify-between"
																	onClick$={() => (appState.showMenu = false)}
																>
																	<span>{sub.name}</span>
																	<span class="text-xs text-gray-400">→</span>
																</a>
															))}
														</div>
													)}
												</div>
											))}
										</div>

										{!isStandalone.value && (
											<div class="pt-6 pb-2">
												<button
													type="button"
													onClick$={openPwaInstall$}
													class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-sky-950 text-white rounded-full text-sm font-bold hover:bg-sky-800 transition-colors border border-cyan-400/30"
												>
													<span aria-hidden="true">📲</span>
													{_`Install App`}
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
});
