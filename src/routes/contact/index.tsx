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
						{_`Expert Rider Support`}
					</span>
				</div>

				<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
					{_`Contact & Customer Care`}
				</h1>
				<p class="text-lg text-slate-600 leading-relaxed max-w-3xl mb-12">
					{_`Have questions about kite sizes, wing models, or hydrofoil setups? Our team of active watersports athletes is here to help.`}
				</p>

				{/* Contact Cards */}
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
						<h3 class="font-bold text-slate-900 text-lg mb-2">{_`Email Support`}</h3>
						<p class="text-sm text-slate-600 mb-4">
							{_`Fast support for orders, invoices, and general questions.`}
						</p>
						<a
							href="mailto:support@allforwind.com"
							class="text-sky-700 font-semibold text-sm hover:underline"
						>
							support@allforwind.com
						</a>
					</div>

					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
						<h3 class="font-bold text-slate-900 text-lg mb-2">{_`Technical Advisory`}</h3>
						<p class="text-sm text-slate-600 mb-4">
							{_`Get advice on mast length, front wing surface, and bar sizes.`}
						</p>
						<span class="text-slate-800 font-medium text-sm">
							{_`Mon - Fri: 09:00 - 18:00 CET`}
						</span>
					</div>

					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
						<h3 class="font-bold text-slate-900 text-lg mb-2">{_`Station & Testcenter`}</h3>
						<p class="text-sm text-slate-600 mb-1">Kitesurf Mallorca SL</p>
						<p class="text-xs text-slate-500">Carrer Greco 19, 07400 Alcúdia, Mallorca, Spain</p>
					</div>
				</div>

				<div class="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm">
					<h2 class="text-2xl font-bold text-slate-900 mb-6">{_`Send Us a Message`}</h2>
					<form preventdefault:submit onSubmit$={() => {}} class="space-y-6 max-w-2xl">
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div>
								<label for="contact-name" class="block text-sm font-medium text-slate-700 mb-1">
									{_`Your Name`}
								</label>
								<input
									id="contact-name"
									type="text"
									required
									class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
									placeholder={_`Enter your name`}
								/>
							</div>
							<div>
								<label for="contact-email" class="block text-sm font-medium text-slate-700 mb-1">
									{_`Email Address`}
								</label>
								<input
									id="contact-email"
									type="email"
									required
									class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
									placeholder={_`Enter your email`}
								/>
							</div>
						</div>

						<div>
							<label for="contact-subject" class="block text-sm font-medium text-slate-700 mb-1">
								{_`Subject`}
							</label>
							<input
								id="contact-subject"
								type="text"
								required
								class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
								placeholder={_`E.g. Consultation for Eleveight RS 10m`}
							/>
						</div>

						<div>
							<label for="contact-message" class="block text-sm font-medium text-slate-700 mb-1">
								{_`Message`}
							</label>
							<textarea
								id="contact-message"
								rows={5}
								required
								class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
								placeholder={_`How can we assist you?`}
							></textarea>
						</div>

						<button
							type="submit"
							class="px-6 py-3 bg-sky-900 hover:bg-sky-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
						>
							{_`Send Inquiry`}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ url }) =>
	generateDocumentHead(
		url.href,
		'Contact & Support | ALL FOR WIND',
		'Get in touch with ALL FOR WIND for personalized gear consulting and order support.'
	);
