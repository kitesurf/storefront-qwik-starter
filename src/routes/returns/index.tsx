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
				<div class="mb-4">
					<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
						{_`Customer Satisfaction Guarantee`}
					</span>
				</div>

				<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
					{_`Returns & Cancellation Policy`}
				</h1>
				<p class="text-lg text-slate-600 leading-relaxed max-w-3xl mb-12">
					{_`We want you to be completely satisfied with your equipment. If a product does not meet your expectations, we offer straightforward 30-day returns and a transparent cancellation process.`}
				</p>

				<div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm mb-12">
					<h2 class="text-2xl font-bold text-slate-900 mb-6">{_`How to Return an Item`}</h2>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div class="space-y-2">
							<div class="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center">
								1
							</div>
							<h3 class="font-bold text-slate-900">{_`1. Request Return`}</h3>
							<p class="text-sm text-slate-600 leading-relaxed">
								{_`Email support@allforwind.com with your order number and the items you wish to return.`}
							</p>
						</div>
						<div class="space-y-2">
							<div class="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center">
								2
							</div>
							<h3 class="font-bold text-slate-900">{_`2. Pack Securely`}</h3>
							<p class="text-sm text-slate-600 leading-relaxed">
								{_`Repack items in their original condition and packaging, including all accessories, tags and manuals.`}
							</p>
						</div>
						<div class="space-y-2">
							<div class="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 font-bold flex items-center justify-center">
								3
							</div>
							<h3 class="font-bold text-slate-900">{_`3. Quick Refund`}</h3>
							<p class="text-sm text-slate-600 leading-relaxed">
								{_`After receiving and inspecting your package, your refund is processed within 3 to 5 business days.`}
							</p>
						</div>
					</div>
				</div>

				<div
					id="cancellation"
					class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm mb-12"
				>
					<h2 class="text-2xl font-bold text-slate-900 mb-4">
						{_`Statutory Right of Withdrawal (Widerrufsbelehrung)`}
					</h2>
					<div class="prose prose-slate max-w-none text-sm text-slate-600 space-y-4 leading-relaxed">
						<p>
							{_`You have the right to withdraw from this contract within fourteen (14) days without giving any reason. The withdrawal period will expire 14 days from the day on which you acquire, or a third party indicated by you acquires, physical possession of the goods.`}
						</p>
						<p>
							{_`To exercise the right of withdrawal, you must inform us (ALL FOR WIND, E-Mail: support@allforwind.com) of your decision to withdraw from this contract by an unequivocal statement (e.g. a letter sent by post or e-mail).`}
						</p>
						<h3 class="text-base font-bold text-slate-800 pt-2">{_`Effects of Withdrawal`}</h3>
						<p>
							{_`If you withdraw from this contract, we shall reimburse to you all payments received from you, including the costs of standard delivery, without undue delay and in any event not later than 14 days from the day on which we are informed about your decision. We may withhold reimbursement until we have received the goods back or you have supplied evidence of having sent back the goods.`}
						</p>
					</div>

					<div class="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 font-mono space-y-2">
						<p class="font-bold font-sans text-sm text-slate-900">{_`Model Withdrawal Form (Muster-Widerrufsformular)`}</p>
						<p>{_`To: ALL FOR WIND, E-Mail: support@allforwind.com`}</p>
						<p>{_`I/We hereby give notice that I/We withdraw from my/our contract of sale of the following goods:`}</p>
						<p>{_`Ordered on / Received on: ________________________`}</p>
						<p>{_`Name of consumer(s): ________________________`}</p>
						<p>{_`Address of consumer(s): ________________________`}</p>
						<p>{_`Signature (only if submitted on paper) / Date: ________________________`}</p>
					</div>
				</div>

				<div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
					<h2 class="text-xl font-bold text-slate-900 mb-3">
						{_`Manufacturer Warranty & Eleveight Support`}
					</h2>
					<p class="text-sm text-slate-600 leading-relaxed mb-4">
						{_`All new Eleveight kites, wings, bars, and hydrofoils carry the official manufacturer warranty against production defects. In addition, our team stocks essential spare parts (bladders, valves, bridles, foil screws) to keep you on the water.`}
					</p>
					<a
						href="/contact"
						class="inline-flex items-center text-sm font-semibold text-sky-700 hover:text-sky-900 transition-colors"
					>
						{_`Contact Warranty & Support Team →`}
					</a>
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ url }) =>
	generateDocumentHead(
		url.href,
		'Returns & Cancellation Policy | ALL FOR WIND',
		'Easy 30-day returns, statutory withdrawal rights, and Eleveight warranty support.'
	);
