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
			<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
					{_`Terms & Conditions (AGB)`}
				</h1>
				<p class="text-sm text-slate-500 mb-8">
					{_`General Terms and Conditions for Online Orders at allforwind.com`}
				</p>

				<div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
					<div>
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`§ 1 Scope & Contracting Party`}</h2>
						<p>
							{_`These General Terms and Conditions govern all contracts concluded between customers purchasing products via allforwind.com and the operator:`}
						</p>
						<div class="mt-2 text-slate-800">
							<p class="font-bold">Kitesurf Mallorca SL</p>
							<p>Carrer Greco 19, 07400 Alcúdia, Illes Balears, España</p>
							<p>CIF: ES-B57774572</p>
							<p class="mt-1">
								{_`E-Mail:`}{' '}
								<a href="mailto:support@allforwind.com" class="text-sky-700 hover:underline">
									support@allforwind.com
								</a>
							</p>
						</div>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`§ 2 Conclusion of Contract`}</h2>
						<p>
							{_`The presentation of products in the online shop does not represent a legally binding offer, but rather an invitation to order. By clicking the order button at checkout, you submit a binding offer for the products in your shopping cart.`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`§ 3 Prices & Payment`}</h2>
						<p>
							{_`All stated prices include statutory value-added tax (VAT) where applicable. Shipping costs are displayed clearly during the checkout process before order confirmation.`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`§ 4 Delivery & Reservation of Proprietary Rights`}</h2>
						<p>
							{_`Delivery is carried out to the shipping address provided. Delivered products remain the property of Kitesurf Mallorca SL until full payment has been received.`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`§ 5 Right of Withdrawal`}</h2>
						<p>
							{_`Consumers are entitled to the statutory right of withdrawal. Details can be found in our Returns & Cancellation Policy.`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`§ 6 Warranty & Liability`}</h2>
						<p>
							{_`Statutory warranty provisions apply to all products. Manufacturer warranties (such as Eleveight warranty) apply in addition to statutory customer rights.`}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ url }) =>
	generateDocumentHead(
		url.href,
		'Terms & Conditions | ALL FOR WIND',
		'General terms and conditions for orders at ALL FOR WIND.'
	);
