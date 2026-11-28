import { component$ } from '@qwik.dev/core';
import { Form, type ActionStore } from '@qwik.dev/router';
import { _ } from 'compiled-i18n';

interface PartnerApplyFormProps {
	action: ActionStore<any, any, any>;
}

export const PartnerApplyForm = component$<PartnerApplyFormProps>(({ action }) => {
	return (
		<div class="bg-slate-50 text-slate-900 min-h-screen py-12 sm:py-16">
			<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Top Badge */}
				<div class="mb-4">
					<span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 border border-sky-200">
						<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
						{_`ALL FOR WIND Partner Network · Eleveight Authorized`}
					</span>
				</div>

				{/* Header */}
				<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 sm:mb-6">
					{_`Become an Official Partner School`}
				</h1>
				<p class="text-lg text-slate-600 leading-relaxed max-w-3xl mb-10">
					{_`Equip your students with premium Eleveight gear, offer exclusive 10% student advantages, and earn commission without inventory risk.`}
				</p>

				{/* 3 Key Partner Advantages */}
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
						<div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-lg mb-4">
							%
						</div>
						<h3 class="font-bold text-slate-900 text-lg mb-2">{_`10% Student Advantage`}</h3>
						<p class="text-sm text-slate-600 leading-relaxed">
							{_`Your students save 10% on all Eleveight kites, wings, boards and foils using your custom school coupon.`}
						</p>
					</div>

					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
						<div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg mb-4">
							<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<h3 class="font-bold text-slate-900 text-lg mb-2">{_`Zero Inventory Risk`}</h3>
						<p class="text-sm text-slate-600 leading-relaxed">
							{_`No need to buy advance stock. We handle shipping directly from central European storage or to your station.`}
						</p>
					</div>

					<div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
						<div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg mb-4">
							⚡
						</div>
						<h3 class="font-bold text-slate-900 text-lg mb-2">{_`Fast Activation in 24h`}</h3>
						<p class="text-sm text-slate-600 leading-relaxed">
							{_`Fill out the form below. We create your custom landing page and coupon code within 24 hours.`}
						</p>
					</div>
				</div>

				{/* Form Container */}
				<div class="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
					{action.value?.success ? (
						<div class="py-8 text-center max-w-xl mx-auto">
							<div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
								<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2.5"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
								{_`Application Received!`}
							</h2>
							<p class="text-base text-slate-600 leading-relaxed mb-8">
								{_`Thank you for applying to the ALL FOR WIND partner network. We have received your application and will contact you via WhatsApp / email within 24 hours to activate your code and landing page.`}
							</p>
							<div class="flex flex-col sm:flex-row gap-4 justify-center">
								<a
									href="/"
									class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-medium shadow-sm transition-colors"
								>
									{_`Back to Storefront`}
								</a>
								<a
									href="/partner/kite-mallorca"
									class="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium transition-colors"
								>
									{_`View Pilot Partner Demo`}
								</a>
							</div>
						</div>
					) : (
						<div>
							<div class="border-b border-slate-100 pb-6 mb-8">
								<h2 class="text-2xl font-bold text-slate-900 mb-2">
									{_`Partner Registration Form`}
								</h2>
								<p class="text-sm text-slate-500">
									{_`Please provide your station details. We review and activate your partner link and discount code immediately.`}
								</p>
							</div>

							<Form action={action} class="space-y-6">
								{/* Honeypot field for bot suppression */}
								<div class="hidden" aria-hidden="true">
									<label for="partner-hp">Leave this empty</label>
									<input
										type="text"
										id="partner-hp"
										name="hp_field"
										tabIndex={-1}
										autoComplete="off"
									/>
								</div>

								{/* Row 1: Station Name & Contact Person */}
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div>
										<label
											for="stationName"
											class="block text-sm font-semibold text-slate-900 mb-2"
										>
											{_`School / Center / Business Name`} <span class="text-rose-500">*</span>
										</label>
										<input
											type="text"
											id="stationName"
											name="stationName"
											required
											placeholder="z.B. Kite Academy Tarifa"
											class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
										/>
									</div>

									<div>
										<label
											for="contactName"
											class="block text-sm font-semibold text-slate-900 mb-2"
										>
											{_`Contact Person`} <span class="text-rose-500">*</span>
										</label>
										<input
											type="text"
											id="contactName"
											name="contactName"
											required
											placeholder="z.B. Alex Müller"
											class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
										/>
									</div>
								</div>

								{/* Row 2: Email & Phone / WhatsApp */}
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div>
										<label for="email" class="block text-sm font-semibold text-slate-900 mb-2">
											{_`Email Address`} <span class="text-rose-500">*</span>
										</label>
										<input
											type="email"
											id="email"
											name="email"
											required
											placeholder="info@yourstation.com"
											class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
										/>
									</div>

									<div>
										<label for="phone" class="block text-sm font-semibold text-slate-900 mb-2">
											{_`Phone / WhatsApp`} <span class="text-rose-500">*</span>
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											required
											placeholder="+34 600 000 000"
											class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
										/>
										<p class="text-xs text-slate-400 mt-1">
											{_`For direct coordination & questions regarding student orders.`}
										</p>
									</div>
								</div>

								{/* Row 3: Spot / Location & Website / Social */}
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div>
										<label for="location" class="block text-sm font-semibold text-slate-900 mb-2">
											{_`Location & Country`} <span class="text-rose-500">*</span>
										</label>
										<input
											type="text"
											id="location"
											name="location"
											required
											placeholder="z.B. Tarifa, Spanien oder Fehmarn, DE"
											class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
										/>
									</div>

									<div>
										<label for="website" class="block text-sm font-semibold text-slate-900 mb-2">
											{_`Website or Social Media Profile`}
										</label>
										<input
											type="text"
											id="website"
											name="website"
											placeholder="https://... oder @instagram"
											class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
										/>
									</div>
								</div>

								{/* Row 4: Preferred Code & Student Volume */}
								<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div>
										<label
											for="preferredCode"
											class="block text-sm font-semibold text-slate-900 mb-2"
										>
											{_`Preferred Coupon Code (e.g. TKA10)`}
										</label>
										<input
											type="text"
											id="preferredCode"
											name="preferredCode"
											placeholder="z.B. KAT10"
											class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm uppercase tracking-wider font-mono font-bold"
										/>
										<p class="text-xs text-slate-400 mt-1">
											{_`Code for your students (10% discount on entire Eleveight catalog).`}
										</p>
									</div>

									<div>
										<label
											for="studentVolume"
											class="block text-sm font-semibold text-slate-900 mb-2"
										>
											{_`Estimated Students / Guests per Year`}
										</label>
										<select
											id="studentVolume"
											name="studentVolume"
											class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
										>
											<option value="under_50">{_`Under 50`}</option>
											<option value="50_to_200" selected>
												{_`50 to 200`}
											</option>
											<option value="over_200">{_`Over 200`}</option>
										</select>
									</div>
								</div>

								{/* Disciplines Checkboxes */}
								<div>
									<label class="block text-sm font-semibold text-slate-900 mb-3">
										{_`Main Disciplines`}
									</label>
									<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
										<label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-sm font-medium text-slate-700">
											<input
												type="checkbox"
												name="sports"
												value="Kitesurfen"
												checked
												class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
											/>
											<span>{_`Kitesurfing`}</span>
										</label>
										<label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-sm font-medium text-slate-700">
											<input
												type="checkbox"
												name="sports"
												value="Wingfoilen"
												checked
												class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
											/>
											<span>{_`Wingfoiling`}</span>
										</label>
										<label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-sm font-medium text-slate-700">
											<input
												type="checkbox"
												name="sports"
												value="Hydrofoil"
												class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
											/>
											<span>{_`Hydrofoil`}</span>
										</label>
										<label class="flex items-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors text-sm font-medium text-slate-700">
											<input
												type="checkbox"
												name="sports"
												value="Windsurfen"
												class="rounded text-sky-600 focus:ring-sky-500 h-4 w-4"
											/>
											<span>{_`Windsurfing`}</span>
										</label>
									</div>
								</div>

								{/* Message / Notes */}
								<div>
									<label for="notes" class="block text-sm font-semibold text-slate-900 mb-2">
										{_`Additional Notes or Questions (Optional)`}
									</label>
									<textarea
										id="notes"
										name="notes"
										rows={3}
										placeholder="Besondere Wünsche, geplanter Saisonstart oder bestehende Marken-Partnerschaften..."
										class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all text-sm"
									/>
								</div>

								{/* Submit Button */}
								<div class="pt-4">
									<button
										type="submit"
										disabled={action.isRunning}
										class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white font-bold text-base shadow-md transition-all cursor-pointer"
									>
										{action.isRunning ? (
											<span>{_`Submitting...`}</span>
										) : (
											<>
												<span>{_`Submit Partner Application`}</span>
												<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M14 5l7 7m0 0l-7 7m7-7H3"
													/>
												</svg>
											</>
										)}
									</button>
									<p class="text-xs text-slate-400 mt-3">
										{_`Unverbindliche Anfrage. Keine Vertragsbindung oder Mindestabnahmemengen.`}
									</p>
								</div>
							</Form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
});
