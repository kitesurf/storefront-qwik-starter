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
	const faqs = [
		{
			q: _`Are all products brand new and genuine Eleveight equipment?`,
			a: _`Yes, 100%. ALL FOR WIND is an official and authorized Eleveight partner. All equipment is factory-new, fully packaged and covered by manufacturer warranty.`,
		},
		{
			q: _`How do I choose the correct kite size and foil mast length?`,
			a: _`Sizing depends on your body weight, typical local wind range and skill level. For freeride kites, our crossover RS series in 9m or 10m is the most popular starting point. Contact us at support@allforwind.com for tailored recommendations.`,
		},
		{
			q: _`What are the delivery times and shipping costs?`,
			a: _`Deliveries within Spain take 1 to 3 business days; EU shipments take 2 to 5 business days. Shipping is free of charge for orders over 499 €. For other orders, shipping costs are available on request.`,
		},
		{
			q: _`What is your return policy?`,
			a: _`We offer a 30-day extended return policy. Items must be unused, unrigged and returned in their original packaging. See our Returns page for step-by-step guidance.`,
		},
		{
			q: _`Which payment methods do you accept?`,
			a: _`We support credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Klarna for fast and secure checkout.`,
		},
	];

	return (
		<div class="bg-slate-50 text-slate-900 min-h-screen py-12 sm:py-16">
			<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
					{_`Frequently Asked Questions (FAQ)`}
				</h1>
				<p class="text-lg text-slate-600 leading-relaxed mb-12">
					{_`Quick answers to common questions regarding gear selection, delivery, warranty, and returns.`}
				</p>

				<div class="space-y-6">
					{faqs.map((faq, idx) => (
						<div
							key={idx}
							class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm"
						>
							<h2 class="text-lg font-bold text-slate-900 mb-3">{faq.q}</h2>
							<p class="text-slate-600 text-sm sm:text-base leading-relaxed">{faq.a}</p>
						</div>
					))}
				</div>

				<div class="mt-12 p-8 bg-sky-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
					<div>
						<h3 class="text-xl font-bold">{_`Didn't find your answer?`}</h3>
						<p class="text-sm text-slate-300 mt-1">{_`Our rider support team is ready to answer any questions.`}</p>
					</div>
					<a
						href="/contact"
						class="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors shrink-0"
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
		'FAQ — Frequently Asked Questions | ALL FOR WIND',
		'Common questions and answers regarding kites, wings, foils, delivery, and returns.'
	);
