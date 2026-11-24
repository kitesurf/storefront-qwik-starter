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
					{_`Imprint (Legal Notice)`}
				</h1>
				<p class="text-sm text-slate-500 mb-8">
					{_`Information pursuant to Spanish Law (LSSI-CE 34/2002) & EU regulations`}
				</p>

				<div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
					<div>
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`Company Information & Site Operator`}</h2>
						<p class="font-bold text-slate-900 text-base">Kitesurf Mallorca SL</p>
						<p class="text-slate-600 mt-1">Carrer Greco 19</p>
						<p class="text-slate-600">07400 Alcúdia, Illes Balears</p>
						<p class="text-slate-600">España (Spain)</p>
						<p class="mt-2 font-mono text-xs bg-slate-100 inline-block px-2 py-1 rounded text-slate-800">
							{_`Tax ID / CIF / VAT-ID:`} ES-B57774572
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`Licenses & Registrations`}</h2>
						<ul class="list-disc list-inside space-y-1 text-slate-600">
							<li>{_`Registered in the Spanish Official Maritime & Watersports School Registry`}</li>
							<li>{_`Licensed Watersports Center of the German Association of Watersport Schools (VDWS) since 2013`}</li>
							<li>{_`Official Eleveight Pro Partner & Testcenter`}</li>
						</ul>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`Contact`}</h2>
						<p>
							{_`E-Mail:`}{' '}
							<a
								href="mailto:support@allforwind.com"
								class="text-sky-700 font-medium hover:underline"
							>
								support@allforwind.com
							</a>
						</p>
						<p>
							{_`Website:`}{' '}
							<a href="https://allforwind.com" class="text-sky-700 font-medium hover:underline">
								https://allforwind.com
							</a>
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`EU Dispute Resolution`}</h2>
						<p>
							{_`The European Commission provides a platform for online dispute resolution (ODR):`}{' '}
							<a
								href="https://ec.europa.eu/consumers/odr"
								target="_blank"
								rel="noopener noreferrer"
								class="text-sky-700 hover:underline font-medium"
							>
								https://ec.europa.eu/consumers/odr
							</a>
						</p>
						<p class="mt-2 text-xs text-slate-500">
							{_`We are neither obligated nor willing to participate in dispute settlement proceedings before a consumer arbitration board.`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`Liability for Content & Intellectual Property`}</h2>
						<p class="text-xs text-slate-600 leading-normal">
							{_`All content, trademarks and media on this website are protected by copyright and intellectual property laws. Eleveight trademarks and logos are used under official pro partnership authorization.`}
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
		'Imprint / Legal Notice | ALL FOR WIND',
		'Legal notice and company information for ALL FOR WIND — Kitesurf Mallorca SL.'
	);
