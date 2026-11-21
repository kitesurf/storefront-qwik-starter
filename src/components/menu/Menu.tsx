import { component$, useContext } from '@qwik.dev/core';
import { useLocation } from '@qwik.dev/router';
import { getLocale } from '@qwik.dev/core';
import { _ } from 'compiled-i18n';
import { APP_STATE } from '~/constants';
import CloseIcon from '../icons/CloseIcon';

export default component$(() => {
	const appState = useContext(APP_STATE);
	const location = useLocation();
	const activeLocale = (getLocale('de') || 'de').split('-')[0].split('_')[0];
	const currentPath = location.url.pathname;
	const collections = useContext(APP_STATE).collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

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
													class="-m-2 p-2 text-gray-400 hover:text-gray-500"
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
												<a
													href={`${currentPath}?lang=de`}
													class={[
														'px-2.5 py-0.5 rounded-full transition-all',
														activeLocale === 'de'
															? 'bg-sky-600 text-white font-bold shadow-sm'
															: 'text-gray-600 hover:bg-gray-200',
													]}
												>
													DE
												</a>
												<span class="text-gray-300 text-[10px]">|</span>
												<a
													href={`${currentPath}?lang=en`}
													class={[
														'px-2.5 py-0.5 rounded-full transition-all',
														activeLocale === 'en'
															? 'bg-sky-600 text-white font-bold shadow-sm'
															: 'text-gray-600 hover:bg-gray-200',
													]}
												>
													EN
												</a>
												<span class="text-gray-300 text-[10px]">|</span>
												<a
													href={`${currentPath}?lang=es`}
													class={[
														'px-2.5 py-0.5 rounded-full transition-all',
														activeLocale === 'es'
															? 'bg-sky-600 text-white font-bold shadow-sm'
															: 'text-gray-600 hover:bg-gray-200',
													]}
												>
													ES
												</a>
											</div>
										</div>

										<div class="flex flex-col pt-6">
											{collections.map((collection) => (
												<a
													class="text-lg font-medium text-gray-900 hover:text-sky-600 pt-4"
													href={`/collections/${collection.slug}`}
													key={collection.id}
												>
													{collection.name}
												</a>
											))}
										</div>
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
