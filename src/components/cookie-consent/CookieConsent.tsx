// components/cookie-consent/CookieConsent.tsx
import { $, component$, useStore, useVisibleTask$ } from '@builder.io/qwik';

interface CookieSettings {
	necessary: boolean;
	analytics: boolean;
	marketing: boolean;
	preferences: boolean;
}

interface CookieConsentState {
	show: boolean;
	showDetails: boolean;
	settings: CookieSettings;
}

export default component$(() => {
	const state = useStore<CookieConsentState>({
		show: false,
		showDetails: false,
		settings: {
			necessary: true, // Always true as these are essential
			analytics: false,
			marketing: false,
			preferences: false,
		},
	});

	useVisibleTask$(() => {
		const savedSettings = localStorage.getItem('cookieSettings');
		if (!savedSettings) {
			state.show = true;
		} else {
			state.settings = JSON.parse(savedSettings);
		}
	});

	const saveSettings = $(() => {
		localStorage.setItem('cookieSettings', JSON.stringify(state.settings));
		state.show = false;
	});

	const acceptAll = $(() => {
		state.settings = {
			necessary: true,
			analytics: true,
			marketing: true,
			preferences: true,
		};
		saveSettings();
	});

	const rejectNonEssential = $(() => {
		state.settings = {
			necessary: true,
			analytics: false,
			marketing: false,
			preferences: false,
		};
		saveSettings();
	});

	return (
		<>
			{state.show && (
				<div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-4">
					<div class="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden transform transition-all">
						<div class="p-6">
							<h3 class="text-lg font-semibold text-gray-900 mb-4">🍪 Cookie Settings</h3>
							<p class="text-sm text-gray-600 mb-6">
								We respect your privacy and are committed to transparency. We use cookies to enhance
								your browsing experience, analyze site traffic, and personalize content. You can
								customize your preferences below.
							</p>

							{state.showDetails && (
								<div class="space-y-4 mb-6">
									<div class="flex items-center justify-between p-3 bg-gray-50 rounded">
										<div>
											<p class="font-medium text-gray-900">Essential Cookies</p>
											<p class="text-xs text-gray-500">
												Required for the website to function properly
											</p>
										</div>
										<input type="checkbox" checked disabled class="rounded border-gray-300" />
									</div>

									<div class="flex items-center justify-between p-3 bg-gray-50 rounded">
										<div>
											<p class="font-medium text-gray-900">Analytics Cookies</p>
											<p class="text-xs text-gray-500">
												Help us understand how visitors interact with our website
											</p>
										</div>
										<input
											type="checkbox"
											checked={state.settings.analytics}
											onChange$={(e) =>
												(state.settings.analytics = (e.target as HTMLInputElement).checked)
											}
											class="rounded border-gray-300"
										/>
									</div>

									<div class="flex items-center justify-between p-3 bg-gray-50 rounded">
										<div>
											<p class="font-medium text-gray-900">Marketing Cookies</p>
											<p class="text-xs text-gray-500">
												Used to deliver personalized advertisements
											</p>
										</div>
										<input
											type="checkbox"
											checked={state.settings.marketing}
											onChange$={(e) =>
												(state.settings.marketing = (e.target as HTMLInputElement).checked)
											}
											class="rounded border-gray-300"
										/>
									</div>

									<div class="flex items-center justify-between p-3 bg-gray-50 rounded">
										<div>
											<p class="font-medium text-gray-900">Preference Cookies</p>
											<p class="text-xs text-gray-500">Remember your settings and preferences</p>
										</div>
										<input
											type="checkbox"
											checked={state.settings.preferences}
											onChange$={(e) =>
												(state.settings.preferences = (e.target as HTMLInputElement).checked)
											}
											class="rounded border-gray-300"
										/>
									</div>
								</div>
							)}

							<div class="flex flex-col sm:flex-row items-center gap-3 mt-6">
								<button
									onClick$={acceptAll}
									class="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-colors font-medium text-sm focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2"
								>
									Accept All
								</button>
								<button
									onClick$={rejectNonEssential}
									class="w-full sm:w-auto px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 
                         transition-colors font-medium text-sm focus:outline-none focus:ring-2 
                         focus:ring-gray-500 focus:ring-offset-2"
								>
									Essential Only
								</button>
								<button
									onClick$={() => (state.showDetails = !state.showDetails)}
									class="w-full sm:w-auto px-6 py-2.5 text-gray-600 hover:text-gray-900 
                         transition-colors text-sm focus:outline-none"
								>
									{state.showDetails ? 'Hide Details' : 'Customize'}
								</button>
							</div>

							<div class="mt-4 text-xs text-gray-500 flex items-center justify-center gap-4">
								<a href="/privacy-policy" class="hover:text-gray-700">
									Privacy Policy
								</a>
								<span>•</span>
								<a href="/cookie-policy" class="hover:text-gray-700">
									Cookie Policy
								</a>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
});
