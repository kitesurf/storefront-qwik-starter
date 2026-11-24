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
	const articles = [
		{
			title: _`Eleveight 2026 Tech Preview: The Evolution of RS+ and WFS Pro`,
			excerpt: _`Discover how new ultra-light carbon framing, enhanced aerodynamics and refined bridles elevate hangtime and wind range.`,
			date: '2026-03-15',
			tag: _`Gear Review`,
			href: '/collections/kitesurfing',
		},
		{
			title: _`The Hydrofoil Sizing Guide: High Aspect vs. Mid Aspect Wings`,
			excerpt: _`Everything you need to know about front wing surface, mast stiffness and glide efficiency for wingfoiling and pumpfoiling.`,
			date: '2026-02-28',
			tag: _`Guide`,
			href: '/collections/foils',
		},
		{
			title: _`Top European Windsport Spots: From Tarifa to the Baltic Sea`,
			excerpt: _`A guide to the most consistent wind and wave spots across Europe, best seasons, and recommended kite and wing setups.`,
			date: '2026-01-20',
			tag: _`Spot Guide`,
			href: '/about',
		},
	];

	return (
		<div class="bg-slate-50 text-slate-900 min-h-screen py-12 sm:py-16">
			<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="mb-4">
					<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
						{_`Stories, Tech & Spot Guides`}
					</span>
				</div>

				<h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
					{_`ALL FOR WIND Blog`}
				</h1>
				<p class="text-lg text-slate-600 leading-relaxed max-w-3xl mb-12">
					{_`In-depth gear reviews, technical guides, and spot inspiration from passionate kiters and foilers.`}
				</p>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					{articles.map((art, idx) => (
						<article
							key={idx}
							class="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between p-6"
						>
							<div>
								<div class="flex items-center justify-between text-xs text-slate-500 mb-3">
									<span class="px-2.5 py-0.5 rounded-full bg-slate-100 font-semibold text-slate-700">
										{art.tag}
									</span>
									<span>{art.date}</span>
								</div>
								<h2 class="text-lg font-bold text-slate-900 mb-2 leading-snug">{art.title}</h2>
								<p class="text-sm text-slate-600 leading-relaxed mb-4">{art.excerpt}</p>
							</div>
							<a
								href={art.href}
								class="text-sm font-semibold text-sky-700 hover:text-sky-900 transition-colors inline-flex items-center gap-1"
							>
								{_`Explore Equipment →`}
							</a>
						</article>
					))}
				</div>
			</div>
		</div>
	);
});

export const head: DocumentHead = ({ url }) =>
	generateDocumentHead(
		url.href,
		'Blog & Tech Guides | ALL FOR WIND',
		'Discover gear reviews, technical setup guides, and watersports stories at ALL FOR WIND.'
	);
