import { component$, useSignal } from '@qwik.dev/core';
import { PartnerSchool } from '~/config/partners';

interface PartnerBannerProps {
	partner?: PartnerSchool | null;
}

export default component$<PartnerBannerProps>(({ partner }) => {
	const isDismissedSig = useSignal(false);

	if (!partner || isDismissedSig.value) {
		return null;
	}

	return (
		<aside
			aria-label="Partner Information"
			class="bg-gradient-to-r from-sky-950 via-sky-900 to-slate-900 text-white text-xs sm:text-sm py-2 px-4 shadow-sm border-b border-sky-800/40 relative z-40 transition-all"
		>
			<div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
				<div class="flex items-center gap-2.5 overflow-hidden">
					<span class="inline-flex items-center justify-center bg-sky-500/20 text-sky-300 border border-sky-400/30 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
						Partner-Vorteil
					</span>
					<p class="truncate text-slate-100">
						<span class="font-semibold text-sky-200">{partner.name}:</span>{' '}
						<span>
							10% Schülerrabatt aktiv (Code{' '}
							<strong class="text-white tracking-wide">{partner.couponCode}</strong>) · Betreuung
							durch deine Station
						</span>
					</p>
				</div>
				<div class="flex items-center gap-3 flex-shrink-0">
					<a
						href={`/partner/${partner.slug}/`}
						class="text-xs font-semibold text-sky-300 hover:text-white underline underline-offset-2 transition-colors whitespace-nowrap"
					>
						Stations-Info
					</a>
					<button
						type="button"
						onClick$={() => {
							isDismissedSig.value = true;
						}}
						aria-label="Banner ausblenden"
						class="text-sky-300/70 hover:text-white p-0.5 rounded transition-colors"
					>
						<svg
							class="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
					</button>
				</div>
			</div>
		</aside>
	);
});
