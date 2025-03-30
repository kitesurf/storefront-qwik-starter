import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import { Image } from '@unpic/qwik';
import { LocalizedLink } from '~/components/locallizedclientlink/LocalizedLink';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID } from '~/constants';
import { getActiveCustomerQuery } from '~/providers/shop/customer/customer';
import { createRequestOptions } from '~/utils/api';
import logo from '../../../public/logo.webp';
import MenuIcon from '../icons/MenuIcon';
import ShoppingBagIcon from '../icons/ShoppingBagIcon';
import SearchBar from '../search-bar/SearchBar';

interface Language {
	code: string;
	name: string;
	flag: string;
}

const languages: Language[] = [
	{ code: 'en', name: 'English', flag: '🇬🇧' },
	{ code: 'fr', name: 'Français', flag: '🇫🇷' },
	{ code: 'de', name: 'Deutsch', flag: '🇩🇪' },
	{ code: 'it', name: 'Italiano', flag: '🇮🇹' },
	{ code: 'es', name: 'Español', flag: '🇪🇸' },
];

const detectBrowserLanguage = (): string => {
	if (!isBrowser) return 'en';
	const browserLangs = navigator.languages || [navigator.language];
	const simpleLangs = browserLangs.map((lang) => lang.split('-')[0]);
	const matchedLang = simpleLangs.find((lang) =>
		languages.some((supportedLang) => supportedLang.code === lang)
	);
	return matchedLang || 'en';
};

export default component$(() => {
	const appState = useContext(APP_STATE);
	const currentLang = appState.language || 'en';

	const rootCollections = appState.collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const totalQuantity =
		appState.activeOrder?.state !== 'PaymentAuthorized'
			? appState.activeOrder?.totalQuantity || 0
			: 0;

	const switchLanguage = $((newLang: string) => {
		if (newLang === currentLang) return;
		const currentPath = window.location.pathname.replace(/^\/[a-z]{2}/, '');
		const newUrl = `/${newLang}${currentPath || '/'}`;
		appState.language = newLang;
		localStorage.setItem('lang', newLang);
		createRequestOptions(newLang);
		window.history.pushState({}, '', newUrl);
		window.location.reload();
	});

	useVisibleTask$(async ({ track }) => {
		track(() => appState.language);

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

		if (isBrowser) {
			const urlLang = window.location.pathname.split('/')[1];
			const storedLang = localStorage.getItem('lang');
			let selectedLang = urlLang;

			if (!languages.some((l) => l.code === selectedLang)) {
				selectedLang = storedLang || detectBrowserLanguage();
			}

			if (selectedLang !== currentLang) {
				appState.language = selectedLang;
				localStorage.setItem('lang', selectedLang);
				createRequestOptions(selectedLang);
			}
		}
	});

	return (
		<div class="w-full">
			{/* Top Navigation Bar with highest z-index */}
			<div class="hidden md:block bg-white border-b relative">
				<div class="max-w-7xl mx-auto flex justify-end items-center space-x-4 p-1">
					<a href="#" class="text-gray-600 hover:text-gray-900 text-sm">
						{$localize`Help &amp; FAQs`}
					</a>

					<div class="relative group z-50">
						<div class="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-gray-100 rounded transition-colors">
							<span class="text-base">
								{languages.find((l) => l.code === currentLang)?.flag || '🇬🇧'}
							</span>
							<span class="text-gray-700 text-sm">
								{languages.find((l) => l.code === currentLang)?.name}
							</span>
						</div>

						{/* Dropdown inherits z-index from parent */}
						<div class="absolute right-0 mt-1 w-44 bg-white border rounded-md shadow-lg hidden group-hover:block">
							{languages.map((lang) => (
								<button
									key={lang.code}
									onClick$={() => switchLanguage(lang.code)}
									class={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-100 transition-colors
                    ${currentLang === lang.code ? 'bg-gray-50 font-medium' : ''}`}
								>
									<span class="text-lg">{lang.flag}</span>
									<span class="text-sm">{lang.name}</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Main Header */}
			<div class="bg-[#2d2d2d] sticky top-0">
				<header class="max-w-7xl mx-auto">
					<div class="px-4 lg:px-6 py-3 md:py-4 flex items-center gap-4 md:gap-6">
						{/* Hamburger Menu Button */}
						<button
							class="md:hidden text-white hover:text-gray-200 p-1"
							onClick$={() => (appState.showMenu = !appState.showMenu)}
							aria-label="Toggle menu"
						>
							<MenuIcon />
						</button>

						{/* Logo */}
						<LocalizedLink href="/" class="hover:opacity-90 transition-opacity" aria-label="Home">
							<Image src={logo} width={100} height={31} alt="Logo" class="h-auto" layout="fixed" />
						</LocalizedLink>

						{/* Desktop Navigation */}
						<nav class="hidden md:flex gap-8">
							{rootCollections.map((collection) => (
								<LocalizedLink
									class="text-white font-bold hover:text-gray-200 transition-colors text-sm lg:text-base"
									href={`/collections/${collection.slug}`}
									key={collection.id}
								>
									{collection.name}
								</LocalizedLink>
							))}
						</nav>

						{/* Search Bar */}
						<div class="flex-1 max-w-3xl">
							<SearchBar />
						</div>

						{/* Mobile Language Switcher */}
						<div class="md:hidden relative">
							<button
								class="text-white p-1 cursor-pointer hover:text-gray-200 flex items-center"
								onClick$={() => (appState.showLangDropdown = !appState.showLangDropdown)}
								aria-label="Toggle language menu"
							>
								<span class="text-lg">
									{languages.find((l) => l.code === currentLang)?.flag || '🇬🇧'}
								</span>
							</button>
						</div>
						
						{/* Cart Button */}
						<button
							name="Cart"
							aria-label={`${totalQuantity} items in cart`}
							class="relative hover:text-gray-200 text-white p-1"
							onClick$={() => (appState.showCart = !appState.showCart)}
						>
							<ShoppingBagIcon />
							{totalQuantity > 0 && (
								<div class="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
									{totalQuantity}
								</div>
							)}
						</button>
					</div>
				</header>

				{/* Mobile Menu */}
				{appState.showMenu && (
					<div class="md:hidden bg-[#2d2d2d] border-t border-gray-700 absolute w-full left-0">
						<div class="px-4 py-4 space-y-4">
							{/* Mobile Navigation Links */}
							<div class="space-y-2">
								{rootCollections.map((collection) => (
									<LocalizedLink
										class="block text-white hover:text-gray-200 py-2 text-sm font-medium"
										href={`/collections/${collection.slug}`}
										key={collection.id}
									>
										{collection.name}
									</LocalizedLink>
								))}
							</div>

							<div class="pt-2 border-t border-gray-700">
								<a href="#" class="block text-white hover:text-gray-200 py-2 text-sm">
									{$localize`Help - FAQs`}
								</a>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Language Dropdown Portal - Placed at root level to avoid z-index issues */}
			{appState.showLangDropdown && (
				<div 
					class="fixed left-0 top-0 w-full h-full bg-black/50 z-[99999]"
					onClick$={() => (appState.showLangDropdown = false)}
				>
					<div 
						class="absolute top-14 right-4 w-44 bg-white border rounded-md shadow-lg"
						onClick$={(e) => e.stopPropagation()}
					>
						{languages.map((lang) => (
							<button
								key={lang.code}
								onClick$={() => {
									switchLanguage(lang.code);
									appState.showLangDropdown = false;
								}}
								class={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-gray-100 transition-colors
									${currentLang === lang.code ? 'bg-gray-50 font-medium' : ''}`}
							>
								<span class="text-lg">{lang.flag}</span>
								<span class="text-sm">{lang.name}</span>
							</button>
						))}
					</div>
				</div>
			)}

			{/* Promo Banner */}
		</div>
	);
});