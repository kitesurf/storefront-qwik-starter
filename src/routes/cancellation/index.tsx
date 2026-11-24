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
				<h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
					{_`Cancellation Policy (Widerrufsbelehrung)`}
				</h1>
				<p class="text-sm text-slate-600 mb-8">
					{_`Information regarding the statutory right of withdrawal for consumers.`}
				</p>

				<div class="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 text-sm text-slate-700 leading-relaxed">
					<div>
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`Right of Withdrawal`}</h2>
						<p>
							{_`You have the right to withdraw from this contract within fourteen (14) days without giving any reason. The withdrawal period will expire 14 days from the day on which you acquire, or a third party indicated by you acquires, physical possession of the goods.`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`Exercising the Right of Withdrawal`}</h2>
						<p>
							{_`To exercise the right of withdrawal, you must inform us (ALL FOR WIND, E-Mail: support@allforwind.com) of your decision to withdraw from this contract by an unequivocal statement (e.g. a letter sent by post or e-mail).`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<h2 class="text-base font-bold text-slate-900 mb-2">{_`Effects of Withdrawal`}</h2>
						<p>
							{_`If you withdraw from this contract, we shall reimburse to you all payments received from you, including the costs of standard delivery, without undue delay and in any event not later than 14 days from the day on which we are informed about your decision. We may withhold reimbursement until we have received the goods back or you have supplied evidence of having sent back the goods.`}
						</p>
					</div>

					<div class="border-t border-slate-100 pt-6">
						<a
							href="/returns"
							class="inline-flex items-center text-sm font-semibold text-sky-700 hover:text-sky-900"
						>
							{_`← Back to Returns & Refund Process`}
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
		'Cancellation Policy | ALL FOR WIND',
		'Information on the right of withdrawal at ALL FOR WIND.'
	);
