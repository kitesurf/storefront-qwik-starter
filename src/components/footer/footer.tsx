import { component$, useContext } from '@qwik.dev/core';
import { _ } from 'compiled-i18n';
import { APP_STATE } from '~/constants';

export default component$(() => {
	const collections = useContext(APP_STATE).collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const navigation = {
		support: [
			{ name: _`Contact`, href: '/contact' },
			{ name: _`Shipping & Delivery`, href: '/shipping' },
			{ name: _`Returns & Cancellation`, href: '/returns' },
			{ name: _`FAQ`, href: '/faq' },
		],
		company: [
			{ name: _`About Us`, href: '/about' },
			{ name: _`Eleveight Partnership`, href: '/about#eleveight' },
			{ name: _`Blog & Stories`, href: '/blog' },
		],
		legal: [
			{ name: _`Imprint`, href: '/imprint' },
			{ name: _`Privacy Policy`, href: '/privacy' },
			{ name: _`Terms & Conditions`, href: '/terms' },
			{ name: _`Cancellation Policy`, href: '/returns#cancellation' },
		],
	};

	return (
		<footer class="border-t border-slate-200 bg-slate-900 text-slate-300">
			{/* Trust Badges Bar */}
			<div class="border-b border-slate-800 bg-slate-950/70">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
						<div class="flex items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm text-slate-300">
							<span class="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
							<span class="font-medium">{_`Official Eleveight Partner`}</span>
						</div>
						<div class="flex items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm text-slate-300">
							<span class="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
							<span class="font-medium">{_`Free EU Shipping from 499 €`}</span>
						</div>
						<div class="flex items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm text-slate-300">
							<span class="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
							<span class="font-medium">{_`30-Day Return Guarantee`}</span>
						</div>
						<div class="flex items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm text-slate-300">
							<span class="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
							<span class="font-medium">{_`Expert Advice by Riders`}</span>
						</div>
					</div>
				</div>
			</div>

			<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12">
					{/* Col 1: Shop */}
					<div>
						<h3 class="text-xs font-bold uppercase tracking-wider text-white">{_`Shop`}</h3>
						<ul class="mt-4 space-y-3">
							{collections.map((collection) => (
								<li key={collection.id}>
									<a
										class="text-sm text-slate-400 hover:text-white transition-colors"
										href={`/collections/${collection.slug}`}
									>
										{collection.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Col 2: Support */}
					<div>
						<h3 class="text-xs font-bold uppercase tracking-wider text-white">
							{_`Customer Service`}
						</h3>
						<ul class="mt-4 space-y-3">
							{navigation.support.map((item) => (
								<li key={item.name}>
									<a
										href={item.href}
										class="text-sm text-slate-400 hover:text-white transition-colors"
									>
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Col 3: Company */}
					<div>
						<h3 class="text-xs font-bold uppercase tracking-wider text-white">{_`Company`}</h3>
						<ul class="mt-4 space-y-3">
							{navigation.company.map((item) => (
								<li key={item.name}>
									<a
										href={item.href}
										class="text-sm text-slate-400 hover:text-white transition-colors"
									>
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Col 4: Legal */}
					<div>
						<h3 class="text-xs font-bold uppercase tracking-wider text-white">{_`Legal`}</h3>
						<ul class="mt-4 space-y-3">
							{navigation.legal.map((item) => (
								<li key={item.name}>
									<a
										href={item.href}
										class="text-sm text-slate-400 hover:text-white transition-colors"
									>
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Col 5: Newsletter */}
					<div class="md:col-span-2 lg:col-span-1">
						<h3 class="text-xs font-bold uppercase tracking-wider text-white">
							{_`Subscribe to our newsletter`}
						</h3>
						<p class="mt-3 text-sm text-slate-400">
							{_`Please enter your email address here to sign up for our newsletter.`}
						</p>
						<form
							class="mt-4 flex flex-col sm:flex-row gap-2"
							preventdefault:submit
							onSubmit$={() => {}}
						>
							<label for="footer-email" class="sr-only">
								{_`Email`}
							</label>
							<input
								id="footer-email"
								type="email"
								autoComplete="email"
								required
								class="w-full bg-slate-800/90 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
								placeholder={_`Email`}
							/>
							<button
								type="submit"
								class="shrink-0 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors"
							>
								{_`Subscribe`}
							</button>
						</form>
						<p class="mt-2 text-xs text-slate-500">
							{_`Unsubscribe anytime. We respect your privacy.`}
						</p>
					</div>
				</div>

				{/* Bottom Bar */}
				<div class="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
					<div class="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
						<span class="font-medium text-slate-300">© 2026 ALL FOR WIND.</span>
						<span class="text-slate-400">{_`Official Eleveight Partner.`}</span>
					</div>

					<div class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
						<a href="/imprint" class="hover:text-white transition-colors">
							{_`Imprint`}
						</a>
						<span class="text-slate-700">•</span>
						<a href="/privacy" class="hover:text-white transition-colors">
							{_`Privacy Policy`}
						</a>
						<span class="text-slate-700">•</span>
						<a href="/terms" class="hover:text-white transition-colors">
							{_`Terms & Conditions`}
						</a>
						<span class="text-slate-700">•</span>
						<a href="/returns#cancellation" class="hover:text-white transition-colors">
							{_`Cancellation Policy`}
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
});
