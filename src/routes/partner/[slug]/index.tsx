import { component$ } from '@qwik.dev/core';
import { DocumentHead, routeLoader$ } from '@qwik.dev/router';
import { getPartner } from '~/config/partners';

export const usePartnerRouteLoader = routeLoader$(async ({ params, cookie }) => {
	const partner = getPartner(params.slug);
	if (!partner) {
		return { partner: null };
	}

	// Persist 30-day partner referral cookie
	cookie.set('afw_partner', partner.slug, {
		path: '/',
		maxAge: 2592000, // 30 days
		sameSite: 'lax',
	});

	return { partner };
});

export default component$(() => {
	const partnerSignal = usePartnerRouteLoader();
	const partner = partnerSignal.value.partner;

	if (!partner) {
		return (
			<div class="max-w-4xl mx-auto px-4 py-20 text-center">
				<div class="inline-flex p-4 rounded-full bg-amber-50 text-amber-600 mb-6">
					<svg
						class="w-12 h-12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<circle cx="12" cy="12" r="10" />
						<line x1="12" y1="8" x2="12" y2="12" />
						<line x1="12" y1="16" x2="12.01" y2="16" />
					</svg>
				</div>
				<h1 class="text-3xl font-bold text-gray-900 mb-3">Partner-Schule nicht gefunden</h1>
				<p class="text-gray-600 mb-8 max-w-md mx-auto">
					Der aufgerufene Partner-Link ist ungültig oder nicht mehr aktiv. Du kannst dich im
					regulären Shop umsehen oder deine Station kontaktieren.
				</p>
				<a
					href="/"
					class="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-sky-700 hover:bg-sky-800 text-white font-medium transition-colors"
				>
					Zur Shop-Startseite
				</a>
			</div>
		);
	}

	return (
		<div class="min-h-screen bg-slate-50/50 pb-20">
			{/* Hero Section */}
			<section class="relative bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-md">
				{/* Ambient background decoration */}
				<div class="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
				<div class="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

				<div class="relative max-w-4xl mx-auto text-center">
					{/* Partner Badge */}
					<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs sm:text-sm font-semibold text-sky-200 mb-6 shadow-sm">
						<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
						Offizieller Eleveight Schul-Partner · {partner.location}
					</div>

					<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
						Willkommen Schüler & Gäste von{' '}
						<span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-sky-200">
							{partner.name}
						</span>
					</h1>

					<p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
						{partner.description}
					</p>

					{/* 10% Voucher Highlight Card */}
					<div class="max-w-xl mx-auto p-5 sm:p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-sky-400/30 shadow-xl text-left">
						<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div>
								<span class="text-xs uppercase font-bold tracking-wider text-sky-300">
									Exklusiver Schülervorteil
								</span>
								<h2 class="text-xl sm:text-2xl font-bold text-white mt-0.5">
									10 % Rabatt auf das Sortiment
								</h2>
								<p class="text-xs sm:text-sm text-slate-300 mt-1">
									Auslieferung & Betreuung direkt durch deine Station.
								</p>
							</div>
							<div class="flex-shrink-0 text-center sm:text-right bg-sky-500/20 border border-sky-400/40 px-4 py-2.5 rounded-xl">
								<span class="text-[10px] text-sky-200 uppercase font-bold block">
									Gutscheincode
								</span>
								<span class="text-xl font-black text-white tracking-widest">
									{partner.couponCode}
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Seasonal Preorder Notice */}
			<section class="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
				<div class="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 shadow-sm flex items-start gap-3.5">
					<div class="p-2 rounded-xl bg-amber-100 text-amber-800 flex-shrink-0 mt-0.5">
						<svg
							class="w-5 h-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						</svg>
					</div>
					<div>
						<h3 class="text-sm font-bold text-amber-900">
							Saisonwechsel & Vorbestell-Phase 2026/27
						</h3>
						<p class="text-xs sm:text-sm text-amber-800/90 mt-1 leading-relaxed">
							Die aktuelle Eleveight Kollektion trifft in Kürze frisch an den Partnerstationen ein.
							Viele Produkte stehen derzeit auf Vorbestellung. Wenn du deine Ausrüstung jetzt über
							deinen Schüler-Vorteil vorbestellst, reserviert dein Center deine Wunschgröße
							priorisiert und stimmt die Abholung oder Lieferung persönlich mit dir ab.
						</p>
					</div>
				</div>
			</section>

			{/* How it Works Section */}
			<section class="max-w-5xl mx-auto px-4 py-16">
				<div class="text-center mb-12">
					<h2 class="text-2xl sm:text-3xl font-bold text-slate-900">
						Wie funktioniert der Schüler-Partner-Kauf?
					</h2>
					<p class="text-slate-600 mt-2 max-w-xl mx-auto text-sm sm:text-base">
						Transparenz, faire Center-Vergütung und persönliche Betreuung vor Ort.
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
					<div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
						<div>
							<div class="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 font-black text-lg flex items-center justify-center mb-4">
								1
							</div>
							<h3 class="text-lg font-bold text-slate-900 mb-2">Ausrüstung auswählen</h3>
							<p class="text-sm text-slate-600 leading-relaxed">
								Wähle Kites, Wings, Boards oder Foils im ALL FOR WIND Store. Der 10 % Rabattcode{' '}
								<strong>{partner.couponCode}</strong> ist in deiner Session aktiv.
							</p>
						</div>
					</div>

					<div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
						<div>
							<div class="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 font-black text-lg flex items-center justify-center mb-4">
								2
							</div>
							<h3 class="text-lg font-bold text-slate-900 mb-2">Auftrag geht an dein Center</h3>
							<p class="text-sm text-slate-600 leading-relaxed">
								Deine Bestellung wird direkt an <strong>{partner.name}</strong> übergeben. Die
								Station erhält 96 % des Wertes (wir behalten lediglich 4 % Transaktionsgebühr) und
								bereitet dein Material vor.
							</p>
						</div>
					</div>

					<div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
						<div>
							<div class="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 font-black text-lg flex items-center justify-center mb-4">
								3
							</div>
							<h3 class="text-lg font-bold text-slate-900 mb-2">Lieferung oder Station-Pickup</h3>
							<p class="text-sm text-slate-600 leading-relaxed">
								Du erhältst deine Ausrüstung bequem nach Hause geliefert oder holst sie direkt an
								der Station ab – inklusive individuellem Trimm- und Setup-Tipp deiner Lehrer.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Category Jump Cards */}
			<section class="max-w-5xl mx-auto px-4 pb-12">
				<h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
					Jetzt Sortiment mit 10 % Schülervorteil entdecken
				</h2>
				<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
					<a
						href="/collections/kites"
						class="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-sky-500 hover:shadow-md transition-all text-center block"
					>
						<span class="text-3xl block mb-2 group-hover:scale-110 transition-transform">🪁</span>
						<span class="font-bold text-slate-900 block text-sm sm:text-base">Kites & Bars</span>
						<span class="text-xs text-sky-600 font-medium mt-1 block">RS, WS, OS, CS Bars</span>
					</a>

					<a
						href="/collections/wings"
						class="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-sky-500 hover:shadow-md transition-all text-center block"
					>
						<span class="text-3xl block mb-2 group-hover:scale-110 transition-transform">🪂</span>
						<span class="font-bold text-slate-900 block text-sm sm:text-base">
							Wings & Parawings
						</span>
						<span class="text-xs text-sky-600 font-medium mt-1 block">WFS V7, GT4, Chute</span>
					</a>

					<a
						href="/collections/boards"
						class="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-sky-500 hover:shadow-md transition-all text-center block"
					>
						<span class="text-3xl block mb-2 group-hover:scale-110 transition-transform">🏄‍♂️</span>
						<span class="font-bold text-slate-900 block text-sm sm:text-base">Twintips & Surf</span>
						<span class="text-xs text-sky-600 font-medium mt-1 block">Process, Master, Escape</span>
					</a>

					<a
						href="/collections/foils"
						class="group p-5 bg-white rounded-2xl border border-slate-200 hover:border-sky-500 hover:shadow-md transition-all text-center block"
					>
						<span class="text-3xl block mb-2 group-hover:scale-110 transition-transform">⚡</span>
						<span class="font-bold text-slate-900 block text-sm sm:text-base">Hydrofoils</span>
						<span class="text-xs text-sky-600 font-medium mt-1 block">GSF, CSF, RSF Sets</span>
					</a>
				</div>
			</section>

			{/* Station Contact Box */}
			<section class="max-w-3xl mx-auto px-4 text-center">
				<div class="bg-slate-100 rounded-2xl p-6 border border-slate-200">
					<h3 class="text-base font-bold text-slate-900 mb-1">
						Fragen zu Größe, Modell oder Verfügbarkeit?
					</h3>
					<p class="text-xs sm:text-sm text-slate-600 mb-4">
						Das Team von {partner.name} berät dich gerne bei der idealen Abstimmung auf dein
						Fahrkönnen und deine Windbedingungen.
					</p>
					<a
						href={`mailto:${partner.contactEmail}?subject=Eleveight%20Beratung%20über%20allforwind.com`}
						class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
					>
						<svg
							class="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
							<polyline points="22,6 12,13 2,6" />
						</svg>
						Station kontaktieren ({partner.contactEmail})
					</a>
				</div>
			</section>
		</div>
	);
});

export const head: DocumentHead = ({ resolveValue }) => {
	const data = resolveValue(usePartnerRouteLoader);
	const partner = data?.partner;

	if (!partner) {
		return {
			title: 'Partner-Aktion | ALL FOR WIND',
		};
	}

	return {
		title: `${partner.name} – 10 % Schüler-Vorteil | ALL FOR WIND`,
		meta: [
			{
				name: 'description',
				content: `Exklusiver 10 % Schülerrabatt für Schüler und Stationsgäste von ${partner.name}. Eleveight Kites, Wings & Boards mit persönlicher Betreuung durch dein Center.`,
			},
			{
				property: 'og:title',
				content: `${partner.name} – 10 % Schülerrabatt auf Eleveight Equipment`,
			},
			{
				property: 'og:description',
				content: `Bestelle dein Eleveight Equipment mit 10 % Schülervorteil. Auslieferung & Betreuung durch ${partner.name}.`,
			},
		],
	};
};
