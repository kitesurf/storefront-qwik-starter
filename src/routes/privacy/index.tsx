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
					{_`Privacy Policy (Datenschutzerklärung)`}
				</h1>
				<p class="text-sm text-slate-500 mb-8">
					{_`Last updated: 2026. In compliance with the General Data Protection Regulation (GDPR / DSGVO).`}
				</p>

				<div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
					<div>
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`1. Controller & Data Protection Officer`}</h2>
						<p>{_`The controller responsible for data processing on this website is:`}</p>
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
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`2. Collection of General Information (Server Log Files)`}</h2>
						<p>
							{_`When you access our website, information of a general nature is automatically recorded. This information (server log files) includes the type of web browser, operating system used, domain name of your internet service provider, your IP address and timestamp. This data is technically necessary to correctly deliver requested website content and ensure stability and security.`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`3. Cookies & Session Storage`}</h2>
						<p>
							{_`We only utilize essential technical cookies and local storage tokens required for core store functionality, such as keeping track of your shopping cart, preferred language, and login authentication state. We do not sell your personal data or deploy intrusive third-party cross-site advertising trackers.`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`4. Order Processing & Customer Data`}</h2>
						<p>
							{_`To fulfill your purchase and deliver physical goods, we collect contact information (name, address, email, phone number) and pass the necessary delivery information strictly to our contracted shipping partners (DHL, DPD, UPS) pursuant to Art. 6 (1) (b) GDPR.`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`5. Secure Payment Processing`}</h2>
						<p>
							{_`Payment details (credit cards, PayPal, Klarna) are processed securely and directly via PCI-DSS certified payment gateways over encrypted TLS/SSL connections. We do not store sensitive credit card numbers on our servers.`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`6. Your Rights Under the GDPR`}</h2>
						<p>
							{_`You have the right to receive information about your personal data stored with us at any time (Art. 15 GDPR), as well as the right to rectification (Art. 16 GDPR), deletion (Art. 17 GDPR), restriction of processing (Art. 18 GDPR), and data portability (Art. 20 GDPR). Contact us at support@allforwind.com.`}
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
		'Privacy Policy | ALL FOR WIND',
		'Information on data privacy and GDPR compliance at ALL FOR WIND.'
	);
