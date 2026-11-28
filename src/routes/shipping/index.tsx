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
					<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
						{_`Reliable & Insured Delivery`}
					</span>
				</div>

				<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
					{_`Shipping & Delivery Information`}
				</h1>
				<p class="text-lg text-slate-600 leading-relaxed max-w-3xl mb-12">
					{_`We ship performance kites, wings, hydrofoils, and boards quickly and securely across Spain, the European Union, and worldwide.`}
				</p>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
						<h3 class="font-bold text-slate-900 text-lg mb-2">{_`Free Shipping from 499 €`}</h3>
						<p class="text-sm text-slate-600 leading-relaxed">
							{_`Standard shipping is free of charge within Spain and the European Union on orders exceeding 499 €.`}
						</p>
					</div>
					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
						<h3 class="font-bold text-slate-900 text-lg mb-2">{_`Fast Order Dispatch`}</h3>
						<p class="text-sm text-slate-600 leading-relaxed">
							{_`Orders received on business days before 14:00 CET are dispatched same-day when in stock.`}
						</p>
					</div>
					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
						<h3 class="font-bold text-slate-900 text-lg mb-2">{_`Specialized Gear Protection`}</h3>
						<p class="text-sm text-slate-600 leading-relaxed">
							{_`Heavy-duty multi-layer packaging designed for delicate carbon foil masts, wings, and board rails.`}
						</p>
					</div>
				</div>

				<div class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-12">
					<div class="p-6 sm:p-8 border-b border-slate-200">
						<h2 class="text-xl font-bold text-slate-900">{_`Shipping Rates & Delivery Times`}</h2>
						<p class="text-sm text-slate-600 mt-1">
							{_`Overview of standard delivery times and costs by destination.`}
						</p>
					</div>

					<div class="overflow-x-auto">
						<table class="w-full text-left text-sm text-slate-600">
							<thead class="bg-slate-50 text-xs uppercase font-bold text-slate-700 border-b border-slate-200">
								<tr>
									<th class="py-4 px-6">{_`Destination`}</th>
									<th class="py-4 px-6">{_`Delivery Time`}</th>
									<th class="py-4 px-6">{_`Shipping Cost`}</th>
									<th class="py-4 px-6">{_`Free Shipping`}</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-slate-100">
								<tr class="hover:bg-slate-50/50">
									<td class="py-4 px-6 font-semibold text-slate-900">{_`Spain & European Union`}</td>
									<td class="py-4 px-6">{_`2 - 5 business days`}</td>
									<td class="py-4 px-6 font-medium text-slate-800">{_`On request`}</td>
									<td class="py-4 px-6 text-emerald-600 font-medium">{_`From 499 €`}</td>
								</tr>
								<tr class="hover:bg-slate-50/50">
									<td class="py-4 px-6 font-semibold text-slate-900">{_`Switzerland & United Kingdom`}</td>
									<td class="py-4 px-6">{_`3 - 6 business days`}</td>
									<td class="py-4 px-6 font-medium text-slate-800">{_`On request`}</td>
									<td class="py-4 px-6 text-emerald-600 font-medium">{_`From 499 €`}</td>
								</tr>
								<tr class="hover:bg-slate-50/50">
									<td class="py-4 px-6 font-semibold text-slate-900">{_`International / Worldwide`}</td>
									<td class="py-4 px-6">{_`5 - 10 business days`}</td>
									<td class="py-4 px-6 font-medium text-slate-800">{_`On request`}</td>
									<td class="py-4 px-6 text-slate-400">—</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
					<div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
						<h3 class="text-lg font-bold text-slate-900 mb-3">{_`Real-Time Tracking`}</h3>
						<p class="text-sm text-slate-600 leading-relaxed">
							{_`As soon as your parcel leaves our fulfillment center, you will receive an email with your tracking number (DHL, DPD or UPS) to follow your shipment live.`}
						</p>
					</div>

					<div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
						<h3 class="text-lg font-bold text-slate-900 mb-3">{_`100% Transport Insurance`}</h3>
						<p class="text-sm text-slate-600 leading-relaxed">
							{_`Every shipment is fully insured against transport loss or damage. If your package arrives damaged, please notify the carrier immediately and contact our support team.`}
						</p>
					</div>
				</div>

				<div class="p-6 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-between flex-wrap gap-4">
					<div>
						<h4 class="font-bold text-sky-950">{_`Questions about your delivery?`}</h4>
						<p class="text-sm text-sky-800">{_`Reach out to our customer care team at support@allforwind.com.`}</p>
					</div>
					<a
						href="/contact"
						class="px-4 py-2 bg-sky-900 hover:bg-sky-800 text-white text-sm font-semibold rounded-lg transition-colors"
					>
						{_`Contact Support`}
					</a>
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ url }) =>
	generateDocumentHead(
		url.href,
		'Shipping & Delivery Information | ALL FOR WIND',
		'Fast, secure and insured shipping for kites, wings, hydrofoils and boards across Europe and worldwide.'
	);
