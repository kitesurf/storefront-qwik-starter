import { component$ } from '@qwik.dev/core';
import { type DocumentHead, type RequestHandler } from '@qwik.dev/router';
import { _ } from 'compiled-i18n';
import { generateDocumentHead } from '~/utils/head.utils';

export const onGet: RequestHandler = async ({ cacheControl, headers }) => {
	cacheControl({
		public: true,
		maxAge: 3600,
		sMaxAge: 86400,
		staleWhileRevalidate: 86400,
	});
	headers.set(
		'Cache-Control',
		'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
	);
};

export default component$(() => {
	return (
		<div class="bg-slate-50 text-slate-900 min-h-screen py-12 sm:py-16">
			<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="mb-4 flex flex-wrap gap-2">
					<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
						{_`Official Eleveight Pro Partner & Testcenter`}
					</span>
					<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
						{_`VDWS Recognized Center Since 2013`}
					</span>
				</div>

				<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
					{_`About ALL FOR WIND`}
				</h1>
				<p class="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mb-12">
					{_`Operated by Kitesurf Mallorca SL. With over a decade of dedication to kitesurfing, wingfoiling and hydrofoiling, we bring test-proven performance gear from the wind capital of the Balearics directly to riders across Europe.`}
				</p>

				{/* Two columns: Story & Credentials */}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					<div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
						<div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xl mb-6">
							01
						</div>
						<h2 class="text-xl font-bold text-slate-900 mb-4">
							{_`Born in the Bay of Alcúdia, Mallorca`}
						</h2>
						<p class="text-slate-600 leading-relaxed text-sm sm:text-base">
							{_`ALL FOR WIND is powered by Kitesurf Mallorca SL (Carrer Greco 19, 07400 Alcúdia, Illes Balears). Located in one of the most consistent thermal wind arenas in Europe, our station has been welcoming riders and testing kites, wings, and foils in real marine conditions since 2013.`}
						</p>
					</div>

					<div id="eleveight" class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
						<div class="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold text-xl mb-6">
							02
						</div>
						<h2 class="text-xl font-bold text-slate-900 mb-4">
							{_`Official Eleveight Pro Partner & Test Center`}
						</h2>
						<p class="text-slate-600 leading-relaxed text-sm sm:text-base">
							{_`As an official Eleveight Pro Partner and authorized test center, we test and ride every kite, wing, hydrofoil, and board on our home waters. You benefit from direct factory backing, full manufacturer warranty, and hands-on setup advice.`}
						</p>
					</div>
				</div>

				{/* Certifications and credentials banner */}
				<div class="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl">
					<div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-800">
						<div>
							<span class="text-xs font-bold uppercase tracking-wider text-cyan-400">
								{_`Certified Excellence`}
							</span>
							<h2 class="text-2xl sm:text-3xl font-bold mt-1">
								{_`Accredited Standards & Real Experience`}
							</h2>
						</div>
						<div class="text-sm text-slate-300 max-w-md">
							{_`Operated under official Spanish maritime school registry and licensed by the German Watersport Association (VDWS).`}
						</div>
					</div>

					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						<div class="space-y-2">
							<h3 class="font-bold text-lg text-cyan-400">{_`VDWS Licensed`}</h3>
							<p class="text-sm text-slate-300 leading-relaxed">
								{_`Officially recognized water sports training & test center since 2013.`}
							</p>
						</div>
						<div class="space-y-2">
							<h3 class="font-bold text-lg text-cyan-400">{_`Spanish Registry`}</h3>
							<p class="text-sm text-slate-300 leading-relaxed">
								{_`Registered in Spain as an official watersports and active tourism enterprise.`}
							</p>
						</div>
						<div class="space-y-2">
							<h3 class="font-bold text-lg text-cyan-400">{_`Real Test Center`}</h3>
							<p class="text-sm text-slate-300 leading-relaxed">
								{_`Daily testing on the water — we only sell equipment we stand behind 100%.`}
							</p>
						</div>
						<div class="space-y-2">
							<h3 class="font-bold text-lg text-cyan-400">{_`Fast EU Logistics`}</h3>
							<p class="text-sm text-slate-300 leading-relaxed">
								{_`Express insured shipping to Germany, Spain, and all European destinations.`}
							</p>
						</div>
					</div>
				</div>

				{/* Call to action */}
				<div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
					<div>
						<h3 class="text-xl font-bold text-slate-900">
							{_`Looking for tailored advice or a test session?`}
						</h3>
						<p class="text-sm text-slate-600 mt-1">
							{_`Talk to our licensed instructors and gear specialists.`}
						</p>
					</div>
					<div class="flex gap-4">
						<a
							href="/collections/kitesurfing"
							class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold bg-sky-900 text-white hover:bg-sky-800 transition-colors"
						>
							{_`Explore Collections`}
						</a>
						<a
							href="/contact"
							class="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
						>
							{_`Contact Support`}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ url }) =>
	generateDocumentHead(
		url.href,
		'About ALL FOR WIND | Official Eleveight Partner',
		'ALL FOR WIND by Kitesurf Mallorca SL. Official Eleveight partner and VDWS licensed center since 2013.'
	);
