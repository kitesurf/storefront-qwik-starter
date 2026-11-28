import { component$ } from '@qwik.dev/core';
import { DocumentHead, routeAction$, routeLoader$, zod$ } from '@qwik.dev/router';
import { PartnerApplyForm } from '~/components/partner/PartnerApplyForm';
import { getPartner } from '~/config/partners';
import { generateDocumentHead } from '~/utils/head.utils';

export const usePartnerRouteLoader = routeLoader$(async ({ params, cookie }) => {
	const rawSlug = params.slug?.replace(/\/$/, '') || '';
	const cleanSlug = rawSlug.toLowerCase();

	if (!cleanSlug || ['apply', 'join', 'anmelden', 'anmeldung', 'register'].includes(cleanSlug)) {
		return { partner: null, isApply: true };
	}

	const partner = getPartner(rawSlug);
	if (!partner) {
		return { partner: null, isApply: false };
	}

	// Persist 30-day partner referral cookie
	cookie.set('afw_partner', partner.slug, {
		path: '/',
		maxAge: 2592000, // 30 days
		sameSite: 'lax',
	});

	return { partner, isApply: false };
});

export const usePartnerApplyAction = routeAction$(
	async (data, requestEvent) => {
		// Bot protection honeypot
		if (data.hp_field && data.hp_field.trim() !== '') {
			return { success: true };
		}

		const escape = (text: string) =>
			(text || '')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#039;');

		const stationName = data.stationName.trim();
		const contactName = data.contactName.trim();
		const email = data.email.trim();
		const phone = data.phone.trim();
		const location = data.location.trim();
		const website = (data.website || '').trim();
		const preferredCode = (data.preferredCode || '').trim().toUpperCase();
		const sports = Array.isArray(data.sports)
			? data.sports.join(', ')
			: data.sports || 'Kitesurf / Wing';
		const studentVolume = data.studentVolume || 'Nicht angegeben';
		const notes = (data.notes || '').trim();

		// 1. Instant Telegram Bot notification to Daniel
		const telegramToken =
			requestEvent.env.get('TELEGRAM_BOT_TOKEN') ||
			(requestEvent.platform as any)?.env?.TELEGRAM_BOT_TOKEN ||
			(typeof process !== 'undefined' ? process.env?.TELEGRAM_BOT_TOKEN : '') ||
			'8399601223:AAGfvATulwPpxvo7iLHTaz9oBs0vyrYOM4w';

		const telegramChatId =
			requestEvent.env.get('TELEGRAM_CHAT_ID') ||
			(requestEvent.platform as any)?.env?.TELEGRAM_CHAT_ID ||
			(typeof process !== 'undefined' ? process.env?.TELEGRAM_CHAT_ID : '') ||
			'444372500';

		const tgMessage =
			`🎉 *NEUE PARTNER-SCHULEN ANMELDUNG!*\n\n` +
			`🏫 *Station / Schule:* ${stationName}\n` +
			`👤 *Ansprechpartner:* ${contactName}\n` +
			`📧 *E-Mail:* ${email}\n` +
			`📱 *Telefon / WhatsApp:* ${phone}\n` +
			`📍 *Standort / Spot:* ${location}\n` +
			(website ? `🌐 *Web / Social:* ${website}\n` : '') +
			(preferredCode ? `🏷️ *Wunsch-Code:* \`${preferredCode}\`\n` : '') +
			`🏄 *Sportarten:* ${sports}\n` +
			`👥 *Schüler/Saison:* ${studentVolume}\n` +
			(notes ? `\n💬 *Nachricht / Notiz:*\n${notes}` : '');

		try {
			await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: telegramChatId,
					text: tgMessage,
					parse_mode: 'Markdown',
				}),
			});
		} catch (tgError) {
			console.error('Failed to dispatch partner Telegram notification:', tgError);
		}

		// 2. Email notification via Cloudflare Email API
		const apiToken =
			requestEvent.env.get('CLOUDFLARE_EMAIL_API_TOKEN') ||
			(requestEvent.platform as any)?.env?.CLOUDFLARE_EMAIL_API_TOKEN ||
			(typeof process !== 'undefined' ? process.env?.CLOUDFLARE_EMAIL_API_TOKEN : '') ||
			'';

		const accountId =
			requestEvent.env.get('CLOUDFLARE_ACCOUNT_ID') ||
			(requestEvent.platform as any)?.env?.CLOUDFLARE_ACCOUNT_ID ||
			(typeof process !== 'undefined' ? process.env?.CLOUDFLARE_ACCOUNT_ID : '') ||
			'8a245c8aab6033cccfc3829fb5537026';

		if (apiToken) {
			const textContent =
				`Neue Partner-Anmeldung über allforwind.com:\n\n` +
				`Station: ${stationName}\n` +
				`Ansprechpartner: ${contactName}\n` +
				`E-Mail: ${email}\n` +
				`Telefon/WhatsApp: ${phone}\n` +
				`Standort: ${location}\n` +
				`Web/Social: ${website}\n` +
				`Wunsch-Code: ${preferredCode}\n` +
				`Sportarten: ${sports}\n` +
				`Schüler/Jahr: ${studentVolume}\n` +
				`Nachricht: ${notes}\n`;

			const htmlContent = `
				<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
					<div style="border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px;">
						<h2 style="color: #0369a1; margin: 0; font-size: 20px;">ALL FOR WIND — Neue Partnerschulen-Anmeldung</h2>
					</div>
					<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
						<tr><td style="padding: 8px 0; color: #64748b; width: 160px;"><strong>Station:</strong></td><td><strong>${escape(stationName)}</strong></td></tr>
						<tr><td style="padding: 8px 0; color: #64748b;"><strong>Ansprechpartner:</strong></td><td>${escape(contactName)}</td></tr>
						<tr><td style="padding: 8px 0; color: #64748b;"><strong>E-Mail:</strong></td><td><a href="mailto:${escape(email)}" style="color: #0284c7;">${escape(email)}</a></td></tr>
						<tr><td style="padding: 8px 0; color: #64748b;"><strong>Telefon / WhatsApp:</strong></td><td><a href="tel:${escape(phone)}" style="color: #0284c7;">${escape(phone)}</a></td></tr>
						<tr><td style="padding: 8px 0; color: #64748b;"><strong>Standort / Spot:</strong></td><td>${escape(location)}</td></tr>
						<tr><td style="padding: 8px 0; color: #64748b;"><strong>Website / Social:</strong></td><td>${escape(website)}</td></tr>
						<tr><td style="padding: 8px 0; color: #64748b;"><strong>Wunsch-Code:</strong></td><td><code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: #0369a1;">${escape(preferredCode || 'Auto-Generieren')}</code></td></tr>
						<tr><td style="padding: 8px 0; color: #64748b;"><strong>Sportarten:</strong></td><td>${escape(sports)}</td></tr>
						<tr><td style="padding: 8px 0; color: #64748b;"><strong>Schüler / Saison:</strong></td><td>${escape(studentVolume)}</td></tr>
					</table>
					${
						notes
							? `<div style="margin-top: 16px; padding: 14px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #0284c7;">
							<h3 style="margin: 0 0 6px 0; font-size: 13px; text-transform: uppercase; color: #64748b;">Nachricht:</h3>
							<p style="white-space: pre-wrap; margin: 0; line-height: 1.5; color: #334155;">${escape(notes)}</p>
						</div>`
							: ''
					}
					<p style="margin-top: 24px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 12px;">
						Antworten per E-Mail geht direkt an ${escape(email)}.
					</p>
				</div>
			`;

			try {
				await fetch(
					`https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${apiToken}`,
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							from: 'noreply@allforwind.com',
							to: 'info@allforwind.com',
							reply_to: email,
							subject: `[Partner Anmeldung] ${stationName} (${location})`,
							text: textContent,
							html: htmlContent,
						}),
					}
				);
			} catch (mailError) {
				console.error('Failed to send partner registration email:', mailError);
			}
		}

		return { success: true };
	},
	zod$((z) =>
		z.object({
			stationName: z.string().trim().min(2, 'Station name is required'),
			contactName: z.string().trim().min(2, 'Contact person name is required'),
			email: z.string().trim().email('Valid email is required'),
			phone: z.string().trim().min(5, 'Phone or WhatsApp number is required'),
			location: z.string().trim().min(2, 'Location is required'),
			website: z.string().optional(),
			preferredCode: z.string().optional(),
			sports: z.union([z.string(), z.array(z.string())]).optional(),
			studentVolume: z.string().optional(),
			notes: z.string().optional(),
			hp_field: z.string().optional(),
		})
	)
);

export default component$(() => {
	const partnerSignal = usePartnerRouteLoader();
	const applyAction = usePartnerApplyAction();
	const { partner, isApply } = partnerSignal.value;

	if (isApply) {
		return <PartnerApplyForm action={applyAction} />;
	}

	if (!partner) {
		return (
			<div class="max-w-4xl mx-auto px-4 py-20 text-center">
				<div class="inline-flex p-4 rounded-full bg-amber-50 text-amber-600 mb-6">
					<svg
						class="w-12 h-12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<circle cx="12" cy="12" r="10" />
						<line x1="12" y1="8" x2="12" y2="12" />
						<line x1="12" y1="16" x2="12.01" y2="16" />
					</svg>
				</div>
				<h1 class="text-3xl font-bold text-gray-900 mb-3">Partner-Schule nicht gefunden</h1>
				<p class="text-gray-600 mb-8 max-w-md mx-auto">
					Der aufgerufene Partner-Link ist ungültig oder nicht mehr aktiv. Du kannst dich im
					regulären Shop umsehen oder selbst Partner von ALL FOR WIND werden.
				</p>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a
						href="/"
						class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors"
					>
						Zur Shop-Startseite
					</a>
					<a
						href="/partner/apply"
						class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-medium transition-colors"
					>
						Jetzt Partner-Schule werden
					</a>
				</div>
			</div>
		);
	}

	return (
		<div class="min-h-screen bg-slate-50/50 pb-20">
			{/* Hero Section */}
			<section class="relative bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-md">
				{/* Ambient background decoration */}
				<div class="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
				<div class="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />

				<div class="relative max-w-4xl mx-auto text-center">
					{/* Partner Badge */}
					<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs sm:text-sm font-semibold text-sky-200 mb-6 shadow-sm">
						<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
						Offizieller Eleveight Schul-Partner · {partner.location}
					</div>

					<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
						Willkommen Schüler & Gäste von{' '}
						<span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-300 to-sky-200">
							{partner.name}
						</span>
					</h1>

					<p class="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
						{partner.description}
					</p>

					{/* 10% Voucher Highlight Card */}
					<div class="max-w-xl mx-auto p-5 sm:p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-sky-400/30 shadow-xl text-left">
						<div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div>
								<span class="text-xs uppercase font-bold tracking-wider text-sky-300">
									Exklusiver Schülervorteil
								</span>
								<h2 class="text-xl sm:text-2xl font-bold text-white mt-0.5">
									10 % Rabatt auf das Sortiment
								</h2>
								<p class="text-xs text-sky-100/80 mt-1">
									Gilt für alle Eleveight Kites, Wings, Boards, Bars & Foils.
								</p>
							</div>
							<div class="w-full sm:w-auto text-center sm:text-right bg-white/20 px-4 py-2.5 rounded-xl border border-white/30">
								<div class="text-[10px] uppercase font-semibold text-sky-200">Dein Code</div>
								<div class="text-xl font-extrabold text-white tracking-wider font-mono">
									{partner.couponCode}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* How it Works / 3 Steps */}
			<section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
				<div class="text-center mb-10">
					<h2 class="text-2xl sm:text-3xl font-bold text-slate-900">
						So funktioniert deine Schüler-Bestellung
					</h2>
					<p class="text-sm sm:text-base text-slate-600 mt-2">
						Direkt abgestimmt mit {partner.name} für eine reibungslose Übergabe.
					</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
						<div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-lg mb-4">
							1
						</div>
						<h3 class="font-bold text-slate-900 text-base mb-2">Ausrüstung auswählen</h3>
						<p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
							Stöbere durch die aktuellen Eleveight Kollektionen – vom Allround-Kite RS bis zu
							modernen Wingfoil-Sets.
						</p>
					</div>

					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
						<div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-lg mb-4">
							2
						</div>
						<h3 class="font-bold text-slate-900 text-base mb-2">
							10 % mit „{partner.couponCode}“ sparen
						</h3>
						<p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
							Gib deinen persönlichen Schülercode im Warenkorb ein – der Rabatt wird sofort
							abgezogen.
						</p>
					</div>

					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
						<div class="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-lg mb-4">
							3
						</div>
						<h3 class="font-bold text-slate-900 text-base mb-2">Auslieferung & Betreuung</h3>
						<p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
							Deine Bestellung wird vorrangig versendet oder liegt nach Wunsch direkt an deiner
							Station für dich bereit.
						</p>
					</div>
				</div>
			</section>

			{/* Seasonal Preorder Notice */}
			<section class="max-w-4xl mx-auto px-4 mb-14">
				<div class="p-6 sm:p-8 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center gap-5">
					<div class="p-3 bg-amber-100 rounded-xl text-amber-800 shrink-0">
						<svg
							class="w-8 h-8"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="8" x2="12" y2="12" />
							<line x1="12" y1="16" x2="12.01" y2="16" />
						</svg>
					</div>
					<div>
						<h3 class="text-lg font-bold text-amber-950 mb-1">
							Saison-Vorbestellungen für Partnerschüler
						</h3>
						<p class="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
							Besonders gefragte Größen und Farben für die kommende Saison werden für Partnerschüler
							bevorzugt reserviert. Bei Fragen zu Lieferzeiten steht dir das Stations-Team direkt
							zur Verfügung.
						</p>
					</div>
				</div>
			</section>

			{/* Direct CTA Categories */}
			<section class="max-w-4xl mx-auto px-4 mb-14 text-center">
				<h3 class="text-xl font-bold text-slate-900 mb-6">Jetzt Equipment entdecken</h3>
				<div class="flex flex-wrap items-center justify-center gap-3">
					<a
						href="/collections/kites"
						class="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
					>
						Eleveight Kites ansehen →
					</a>
					<a
						href="/collections/wings"
						class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold shadow-sm transition-colors"
					>
						Eleveight Wings ansehen →
					</a>
					<a
						href="/collections/twintips"
						class="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold shadow-sm transition-colors"
					>
						Twintip & Foilboards →
					</a>
				</div>
			</section>

			{/* Station Contact Box */}
			<section class="max-w-3xl mx-auto px-4 text-center mb-10">
				<div class="bg-slate-100 rounded-2xl p-6 border border-slate-200">
					<h3 class="text-base font-bold text-slate-900 mb-1">
						Fragen zu Größe, Modell oder Verfügbarkeit?
					</h3>
					<p class="text-xs sm:text-sm text-slate-600 mb-4">
						Das Team von {partner.name} berät dich gerne bei der idealen Abstimmung auf dein
						Fahrkönnen und deine Windbedingungen.
					</p>
					<a
						href={`mailto:${partner.contactEmail}?subject=Eleveight%20Beratung%20über%20allforwind.com`}
						class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold transition-colors"
					>
						<svg
							class="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
							<polyline points="22,6 12,13 2,6" />
						</svg>
						Station kontaktieren ({partner.contactEmail})
					</a>
				</div>
			</section>

			{/* Become a Partner Callout */}
			<section class="max-w-3xl mx-auto px-4 text-center">
				<div class="bg-gradient-to-r from-sky-900 to-slate-900 rounded-2xl p-6 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
					<div>
						<h4 class="font-bold text-base text-white">
							Du betreibst selbst eine Station oder Schule?
						</h4>
						<p class="text-xs text-sky-200 mt-0.5">
							Statte deine Schüler mit 10 % Schülervorteil aus und erhalte attraktive Provisionen.
						</p>
					</div>
					<a
						href="/partner/apply"
						class="shrink-0 px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-sky-50 text-xs sm:text-sm font-bold shadow transition-colors"
					>
						Partner werden →
					</a>
				</div>
			</section>
		</div>
	);
});

export const head: DocumentHead = ({ resolveValue }) => {
	const data = resolveValue(usePartnerRouteLoader);
	const partner = data?.partner;
	const isApply = data?.isApply;

	if (isApply) {
		return generateDocumentHead(
			'Become an Official Partner School | ALL FOR WIND',
			'Equip your students with premium Eleveight kites, wings and boards with 10% student advantage. Join the ALL FOR WIND partner network for kite and watersports centers.'
		);
	}

	if (!partner) {
		return {
			title: 'Partner-Aktion | ALL FOR WIND',
		};
	}

	return {
		title: `${partner.name} – 10 % Schüler-Vorteil | ALL FOR WIND`,
		meta: [
			{
				name: 'description',
				content: `Exklusiver 10 % Schülerrabatt für Schüler und Stationsgäste von ${partner.name}. Eleveight Kites, Wings & Boards mit persönlicher Betreuung durch dein Center.`,
			},
			{
				property: 'og:title',
				content: `${partner.name} – 10 % Schülerrabatt auf Eleveight Equipment`,
			},
			{
				property: 'og:description',
				content: `Bestelle dein Eleveight Equipment mit 10 % Schülervorteil. Auslieferung & Betreuung durch ${partner.name}.`,
			},
		],
	};
};
