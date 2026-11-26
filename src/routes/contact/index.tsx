import { component$ } from '@qwik.dev/core';
import { type DocumentHead, Form, routeAction$, zod$, type RequestHandler } from '@qwik.dev/router';
import { _ } from 'compiled-i18n';
import nodemailer from 'nodemailer';
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

export const useContactAction = routeAction$(
	async (data, requestEvent) => {
		// Bot-Schutz: Unsichtbares Honeypot-Feld prüfen.
		// Wenn Bots das Feld ausfüllen -> stiller Erfolg ohne Mailversand.
		if (data.hp_field && data.hp_field.trim() !== '') {
			return { success: true };
		}

		const apiToken =
			requestEvent.env.get('CLOUDFLARE_EMAIL_API_TOKEN') ||
			(requestEvent.platform as any)?.env?.CLOUDFLARE_EMAIL_API_TOKEN ||
			(typeof process !== 'undefined' ? process.env?.CLOUDFLARE_EMAIL_API_TOKEN : '') ||
			'';

		try {
			const transporter = nodemailer.createTransport({
				host: 'smtp.mx.cloudflare.net',
				port: 465,
				secure: true,
				auth: {
					user: 'api_token',
					pass: apiToken,
				},
			});

			const escape = (text: string) =>
				text
					.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/"/g, '&quot;')
					.replace(/'/g, '&#039;');

			const mailOptions = {
				from: '"ALL FOR WIND Webform" <noreply@allforwind.com>',
				to: 'info@allforwind.com',
				replyTo: data.email,
				subject: `[Webform Anfrage] ${data.subject}`,
				text: `Neue Kontaktanfrage über allforwind.com:\n\nName: ${data.name}\nE-Mail: ${data.email}\nBetreff: ${data.subject}\n\nNachricht:\n${data.message}\n`,
				html: `
					<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
						<div style="border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px;">
							<h2 style="color: #0369a1; margin: 0; font-size: 20px;">ALL FOR WIND — Neue Kontaktanfrage</h2>
						</div>
						<p style="margin: 8px 0;"><strong>Name:</strong> ${escape(data.name)}</p>
						<p style="margin: 8px 0;"><strong>E-Mail:</strong> <a href="mailto:${escape(data.email)}" style="color: #0284c7;">${escape(data.email)}</a></p>
						<p style="margin: 8px 0;"><strong>Betreff:</strong> ${escape(data.subject)}</p>
						<div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #0284c7;">
							<h3 style="margin-top: 0; margin-bottom: 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Nachricht:</h3>
							<p style="white-space: pre-wrap; margin: 0; line-height: 1.6; color: #334155;">${escape(data.message)}</p>
						</div>
						<p style="margin-top: 28px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 12px;">
							Diese Anfrage wurde über das Webformular auf allforwind.com versendet. Bei Klick auf „Antworten“ geht deine E-Mail direkt an ${escape(data.email)}.
						</p>
					</div>
				`,
			};

			await transporter.sendMail(mailOptions);
			return { success: true };
		} catch (error: any) {
			console.error('Failed to send contact inquiry email:', error);
			return {
				success: false,
				error: error?.message || 'Fehler beim Senden der Nachricht.',
			};
		}
	},
	zod$((z) =>
		z.object({
			name: z.string().trim().min(1, 'Name is required'),
			email: z.string().trim().email('Valid email is required'),
			subject: z.string().trim().min(1, 'Subject is required'),
			message: z.string().trim().min(1, 'Message is required'),
			hp_field: z.string().optional(),
		})
	)
);

export default component$(() => {
	const contactAction = useContactAction();

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

					{contactAction.value?.success && (
						<div class="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
							<svg
								class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<div>
								<h4 class="font-bold text-sm text-emerald-900">{_`Message Sent`}</h4>
								<p class="text-sm text-emerald-700 mt-0.5">
									{_`Thank you! Your message has been sent successfully.`}
								</p>
							</div>
						</div>
					)}

					{contactAction.value?.success === false && (
						<div class="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
							<svg
								class="w-5 h-5 text-rose-600 mt-0.5 shrink-0"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<div>
								<h4 class="font-bold text-sm text-rose-900">{_`Failed to send message`}</h4>
								<p class="text-sm text-rose-700 mt-0.5">
									{contactAction.value?.error ||
										_`An error occurred while sending your message. Please try again or contact us directly via email.`}
								</p>
							</div>
						</div>
					)}

					<Form action={contactAction} class="space-y-6 max-w-2xl">
						{/* Unsichtbares Honeypot-Feld zum Schutz vor Spam-Bots */}
						<div class="hidden" aria-hidden="true">
							<label for="contact-hp">Do not fill this field</label>
							<input id="contact-hp" type="text" name="hp_field" tabIndex={-1} autoComplete="off" />
						</div>

						<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
							<div>
								<label for="contact-name" class="block text-sm font-medium text-slate-700 mb-1">
									{_`Your Name`}
								</label>
								<input
									id="contact-name"
									name="name"
									type="text"
									required
									class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
									placeholder={_`Enter your name`}
								/>
								{contactAction.value?.failed && contactAction.value?.fieldErrors?.name && (
									<p class="mt-1 text-xs text-rose-600">
										{contactAction.value.fieldErrors.name[0]}
									</p>
								)}
							</div>
							<div>
								<label for="contact-email" class="block text-sm font-medium text-slate-700 mb-1">
									{_`Email Address`}
								</label>
								<input
									id="contact-email"
									name="email"
									type="email"
									required
									class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
									placeholder={_`Enter your email`}
								/>
								{contactAction.value?.failed && contactAction.value?.fieldErrors?.email && (
									<p class="mt-1 text-xs text-rose-600">
										{contactAction.value.fieldErrors.email[0]}
									</p>
								)}
							</div>
						</div>

						<div>
							<label for="contact-subject" class="block text-sm font-medium text-slate-700 mb-1">
								{_`Subject`}
							</label>
							<input
								id="contact-subject"
								name="subject"
								type="text"
								required
								class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
								placeholder={_`E.g. Consultation for Eleveight RS 10m`}
							/>
							{contactAction.value?.failed && contactAction.value?.fieldErrors?.subject && (
								<p class="mt-1 text-xs text-rose-600">
									{contactAction.value.fieldErrors.subject[0]}
								</p>
							)}
						</div>

						<div>
							<label for="contact-message" class="block text-sm font-medium text-slate-700 mb-1">
								{_`Message`}
							</label>
							<textarea
								id="contact-message"
								name="message"
								rows={5}
								required
								class="w-full bg-slate-50 border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
								placeholder={_`How can we assist you?`}
							></textarea>
							{contactAction.value?.failed && contactAction.value?.fieldErrors?.message && (
								<p class="mt-1 text-xs text-rose-600">
									{contactAction.value.fieldErrors.message[0]}
								</p>
							)}
						</div>

						<button
							type="submit"
							disabled={contactAction.isRunning}
							class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-900 hover:bg-sky-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
						>
							{contactAction.isRunning ? (
								<>
									<svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
									</svg>
									<span>{_`Sending inquiry...`}</span>
								</>
							) : (
								<span>{_`Send Inquiry`}</span>
							)}
						</button>
					</Form>
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
