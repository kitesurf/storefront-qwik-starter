import { $, component$, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { _ } from 'compiled-i18n';

const DISMISS_KEY = 'afw_pwa_dismissed';
const DISMISS_TTL_MS = 14 * 24 * 60 * 60 * 1000;

/** iOS Safari has no beforeinstallprompt — the user installs manually. */
const isIosDevice = () =>
	typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export default component$(() => {
	const show = useSignal(false);
	const showIosSteps = useSignal(false);
	const hasPrompt = useSignal(false);
	const isIos = useSignal(false);

	useVisibleTask$(({ cleanup }) => {
		const standalone =
			window.matchMedia('(display-mode: standalone)').matches ||
			(navigator as any).standalone === true;
		(window as any).__afwPwaStandalone = standalone;
		if (standalone) return;

		isIos.value = isIosDevice();

		const evaluate = () => {
			const forced = new URLSearchParams(window.location.search).get('install') === 'app';
			if (forced) return true;
			const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
			if (dismissedAt && Date.now() - dismissedAt < DISMISS_TTL_MS) return false;
			return hasPrompt.value || isIos.value;
		};

		const handler = (e: Event) => {
			e.preventDefault();
			// The BeforeInstallPromptEvent is not serializable — keep it off Qwik state.
			(window as any).__afwDeferredPrompt = e;
			hasPrompt.value = true;
			if (evaluate()) show.value = true;
		};
		document.addEventListener('beforeinstallprompt', handler);
		cleanup(() => document.removeEventListener('beforeinstallprompt', handler));

		// Direct install link (?install=app): ignore the dismiss timestamp and open
		// immediately — Android gets the native prompt, iOS the step-by-step guide.
		const forced = new URLSearchParams(window.location.search).get('install') === 'app';
		if (forced) {
			show.value = true;
			if (isIos.value) showIosSteps.value = true;
			const deferred = (window as any).__afwDeferredPrompt;
			if (deferred) deferred.prompt();
		} else {
			// Give beforeinstallprompt a moment to fire before deciding.
			setTimeout(() => {
				if (evaluate()) show.value = true;
			}, 800);
		}
	});

	const install = $(() => {
		const deferred = (window as any).__afwDeferredPrompt;
		if (deferred) {
			deferred.prompt();
			show.value = false;
		} else if (isIos.value) {
			showIosSteps.value = true;
		}
	});

	const dismiss = $(() => {
		localStorage.setItem(DISMISS_KEY, String(Date.now()));
		show.value = false;
	});

	return (
		show.value && (
			<div
				class="fixed bottom-4 inset-x-4 max-w-md mx-auto z-40 bg-slate-900/95 backdrop-blur-md border border-cyan-400/30 rounded-2xl p-4 shadow-2xl text-white"
				role="dialog"
				aria-label="ALL FOR WIND App"
			>
				<button
					type="button"
					class="absolute top-2 right-3 w-8 h-8 min-w-[32px] min-h-[32px] flex items-center justify-center text-white/50 hover:text-white text-lg rounded-full hover:bg-white/10 transition-colors"
					onClick$={dismiss}
					aria-label={_`Close`}
				>
					✕
				</button>
				<div class="flex items-start gap-3 pr-6">
					<img
						src="/apple-touch-icon.png"
						alt="ALL FOR WIND"
						class="w-12 h-12 rounded-xl shrink-0"
						width={48}
						height={48}
						loading="lazy"
					/>
					<div class="flex-1 min-w-0">
						<div class="font-bold text-sm tracking-wide">ALL FOR WIND App</div>
						<p class="text-xs text-white/70 mt-0.5 leading-relaxed">
							{_`Quick access to kites, wings & foils right from your home screen.`}
						</p>
						{isIos.value && showIosSteps.value && (
							<p class="text-xs text-cyan-200 mt-2 leading-relaxed">
								{_`1. Tap the Share button [↑] at the bottom`}
								<br />
								{_`2. Choose 'Add to Home Screen' [+]`}
							</p>
						)}
						{hasPrompt.value && (
							<button
								type="button"
								onClick$={install}
								class="mt-3 px-4 py-2 bg-cyan-400 text-slate-950 rounded-full text-xs font-bold hover:bg-cyan-300 transition-colors"
							>
								{_`Install`}
							</button>
						)}
					</div>
				</div>
			</div>
		)
	);
});
