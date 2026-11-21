import { $, component$, useSignal, useVisibleTask$ } from '@qwik.dev/core';

interface HeroSlide {
	id: string;
	tag: string;
	title: string;
	subtitle: string;
	description: string;
	ctaText: string;
	ctaLink: string;
	image: string;
	thumb: string;
}

export const SLIDES: HeroSlide[] = [
	{
		id: 'kitesurfing',
		tag: 'ELEVEIGHT 2026 // RS+ & FS PERFORMANCE',
		title: 'KITESURFING',
		subtitle: 'LIMITLESS BIG AIR & SPEED',
		description:
			'Konstruiert für maximale Hangtime, explosive Beschleunigung und kompromisslose Kontrolle bei jedem Wind.',
		ctaText: 'Kitesurfen Entdecken',
		ctaLink: '/collections/kitesurfen',
		image: '/images/hero/kitesurfing-hero.jpg',
		thumb: '/images/hero/kitesurfing-hero.jpg',
	},
	{
		id: 'wingfoiling',
		tag: 'ELEVEIGHT 2026 // WFS PRO SERIES',
		title: 'WINGFOILING',
		subtitle: 'FLY FREELY ABOVE THE WAVES',
		description:
			'Ultraleichte Carbon-Performance, sofortige Kraftentfaltung und intuitive Balance für grenzenlose Gleitflüge.',
		ctaText: 'Wingfoiling Entdecken',
		ctaLink: '/collections/wingfoilen',
		image: '/images/hero/wingfoiling-hero.jpg',
		thumb: '/images/hero/wingfoiling-hero.jpg',
	},
	{
		id: 'hydrofoils',
		tag: 'CARBON MASTS & GLIDE SERIES',
		title: 'HYDROFOILS',
		subtitle: 'EFFORTLESS GLIDE & CARVES',
		description:
			'Hydrodynamische Präzision für frühestes Abheben, messerscharfe Turns und maximale Effizienz auf dem Wasser.',
		ctaText: 'Foils Entdecken',
		ctaLink: '/collections/foils',
		image: '/images/hero/hydrofoils-hero.jpg',
		thumb: '/images/hero/hydrofoils-hero.jpg',
	},
	{
		id: 'twintips',
		tag: 'COMMANDER & MASTER SERIES',
		title: 'TWINTIP BOARDS',
		subtitle: 'EXPLOSIVE POP & CONTROL',
		description:
			'High-Tech Carbon-Layouts für radikale Absprünge, butterweiche Landungen und ultimativen Kantengrip.',
		ctaText: 'Boards Entdecken',
		ctaLink: '/collections/kitesurfen',
		image: '/images/hero/twintips-hero.jpg',
		thumb: '/images/hero/twintips-hero.jpg',
	},
];

export default component$(() => {
	const activeIndex = useSignal(0);
	const prevIndex = useSignal<number | null>(null);
	const isTransitioning = useSignal(false);
	const isPaused = useSignal(false);
	const progress = useSignal(0);

	const SLIDE_DURATION_MS = 6000;
	const TICK_INTERVAL_MS = 50;
	const STEP = (TICK_INTERVAL_MS / SLIDE_DURATION_MS) * 100;

	const switchSlide = $((newIndex: number) => {
		if (newIndex === activeIndex.value) return;
		prevIndex.value = activeIndex.value;
		activeIndex.value = newIndex;
		isTransitioning.value = true;
		progress.value = 0;

		setTimeout(() => {
			prevIndex.value = null;
			isTransitioning.value = false;
		}, 1850);
	});

	const nextSlide = $(() => {
		switchSlide((activeIndex.value + 1) % SLIDES.length);
	});

	const prevSlide = $(() => {
		switchSlide((activeIndex.value - 1 + SLIDES.length) % SLIDES.length);
	});

	const goToSlide = $((index: number) => {
		switchSlide(index);
	});

	useVisibleTask$(({ cleanup }) => {
		const interval = setInterval(() => {
			if (!isPaused.value) {
				progress.value += STEP;
				if (progress.value >= 100) {
					switchSlide((activeIndex.value + 1) % SLIDES.length);
				}
			}
		}, TICK_INTERVAL_MS);

		cleanup(() => clearInterval(interval));
	});

	return (
		<div
			class="relative w-full h-[88vh] min-h-[620px] max-h-[920px] overflow-hidden bg-sky-900 text-white select-none"
			onMouseEnter$={() => (isPaused.value = true)}
			onMouseLeave$={() => (isPaused.value = false)}
		>
			<style>{`
				.w-slide-box {
					position: absolute;
					inset: 0;
					width: 100%;
					height: 100%;
					overflow: hidden;
				}
				.w-slide-box img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					object-position: center;
					will-change: transform, opacity, filter;
				}
				/* Inactive / Dormant */
				.w-dormant {
					z-index: 0;
					opacity: 0;
					pointer-events: none;
					visibility: hidden;
				}
				.w-dormant img {
					transform: scale(4.5);
					filter: blur(12px);
					opacity: 0;
					transition: none !important;
				}
				/* Outgoing: Weitet sich über den View hinaus von 1.0 auf 4.5. Bleibt bis spät im Zoom sichtbar! */
				.w-outgoing {
					z-index: 10;
					pointer-events: none;
					visibility: visible;
				}
				.w-outgoing img {
					transform: scale(4.5);
					filter: blur(8px);
					opacity: 0;
					transition: transform 1800ms cubic-bezier(0.25, 1, 0.5, 1),
					            opacity 1800ms cubic-bezier(0.7, 0, 0.85, 0),
					            filter 1800ms ease-in;
				}
				/* Incoming: Komprimiert sich aus den Rändern des Views von 4.5 auf 1.0 */
				.w-incoming {
					z-index: 20;
					pointer-events: auto;
					visibility: visible;
				}
				.w-incoming img {
					transform: scale(1);
					filter: blur(0px);
					opacity: 1;
					transition: transform 1800ms cubic-bezier(0.16, 1, 0.3, 1),
					            opacity 1800ms cubic-bezier(0.4, 0, 0.2, 1),
					            filter 1800ms ease-out;
				}
				/* Active resting */
				.w-active {
					z-index: 15;
					pointer-events: auto;
					visibility: visible;
				}
				.w-active img {
					transform: scale(1);
					filter: blur(0px);
					opacity: 1;
					transition: none;
				}
			`}</style>

			{/* Wanderlix Background Scale/Blur Slides */}
			<div class="absolute inset-0 w-full h-full overflow-hidden">
				{SLIDES.map((slide, index) => {
					const isActive = index === activeIndex.value;
					const isPrev = index === prevIndex.value;

					let stateClass = 'w-dormant';
					if (isPrev) {
						stateClass = 'w-outgoing';
					} else if (isActive) {
						stateClass = isTransitioning.value ? 'w-incoming' : 'w-active';
					}

					return (
						<div key={slide.id} class={`w-slide-box ${stateClass}`}>
							<img
								width="1920"
								height="1080"
								src={slide.image}
								alt={slide.title}
								loading={index === 0 ? 'eager' : 'lazy'}
							/>
						</div>
					);
				})}
			</div>

			{/* Light & Airy Oceanic Daylight Overlays (keeps >75% of photo bright and vibrant) */}
			<div class="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-sky-950/60 via-sky-950/20 to-transparent" />
			<div class="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-sky-950/65 via-transparent to-sky-950/15" />

			{/* Main Content Layout */}
			<div class="relative z-30 max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex flex-col justify-between py-10 sm:py-14">
				{/* Top Branding / Partner Badge */}
				<div class="flex items-center space-x-3">
					<div class="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-medium tracking-widest uppercase text-white shadow-sm">
						<span class="w-2 h-2 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_8px_#67e8f9]" />
						<span>All For Wind // Official Eleveight Partner</span>
					</div>
				</div>

				{/* Middle Row: Left Active Slide Info + Right Thumbnails Slider */}
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto">
					{/* Left Column: Active Slide Details with Smooth Slide-Up */}
					<div class="lg:col-span-7 pr-0 lg:pr-8">
						<div class="relative min-h-[260px] sm:min-h-[290px] flex items-end">
							{SLIDES.map((slide, index) => {
								const isActive = index === activeIndex.value;
								return (
									<div
										key={slide.id}
										class={[
											'transition-all duration-700 ease-out',
											isActive
												? 'opacity-100 translate-y-0 scale-100 pointer-events-auto delay-200'
												: 'opacity-0 -translate-y-4 scale-95 pointer-events-none absolute inset-0',
										]}
									>
										<span class="inline-block px-3.5 py-1 mb-3 rounded-md bg-cyan-400/25 border border-cyan-300/40 backdrop-blur-md text-cyan-100 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-sm">
											{slide.tag}
										</span>
										<h1 class="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.0] drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]">
											{slide.title}
										</h1>
										<p class="mt-2 text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-sky-200 tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
											{slide.subtitle}
										</p>
										<p class="mt-4 text-sm sm:text-base text-white max-w-xl leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
											{slide.description}
										</p>
										<div class="mt-7 flex flex-wrap items-center gap-4">
											<a
												href={slide.ctaLink}
												class="group relative inline-flex items-center px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-300 via-sky-300 to-cyan-400 hover:from-white hover:to-cyan-200 shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
											>
												<span class="relative z-10 flex items-center space-x-2">
													<span>{slide.ctaText}</span>
													<svg
														class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2.5"
															d="M14 5l7 7m0 0l-7 7m7-7H3"
														/>
													</svg>
												</span>
											</a>
											<a
												href="/collections/kitesurfen"
												class="inline-flex items-center px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 shadow-sm transition-all duration-300"
											>
												Alle Kategorien
											</a>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Right Column: Wanderlix Thumbnail Slider */}
					<div class="lg:col-span-5 flex flex-col items-start lg:items-end">
						<div class="flex space-x-3 sm:space-x-4 overflow-x-auto pb-4 pt-2 max-w-full no-scrollbar">
							{SLIDES.map((slide, index) => {
								const isActive = index === activeIndex.value;
								return (
									<button
										key={slide.id}
										onClick$={() => goToSlide(index)}
										class={[
											'relative flex-shrink-0 w-28 sm:w-36 h-40 sm:h-48 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 text-left group',
											isActive
												? 'ring-2 ring-cyan-300 shadow-[0_0_30px_rgba(103,232,249,0.55)] scale-105'
												: 'opacity-85 hover:opacity-100 hover:scale-100 border border-white/35',
										]}
									>
										<img
											width="144"
											height="192"
											src={slide.thumb}
											alt={slide.title}
											class="absolute inset-0 w-full h-full object-cover brightness-105 transition-transform duration-500 group-hover:scale-110"
										/>
										<div class="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-sky-950/15 to-transparent" />
										<div class="relative z-10 h-full p-3 flex flex-col justify-between">
											<span class="text-[11px] font-mono tracking-wider font-bold text-cyan-200 px-2 py-0.5 rounded-md bg-sky-950/50 backdrop-blur-md self-start border border-white/25">
												0{index + 1}
											</span>
											<div>
												<p class="text-xs font-extrabold text-white tracking-wide uppercase line-clamp-1 drop-shadow">
													{slide.title}
												</p>
												<p class="text-[10px] text-cyan-200 font-semibold tracking-tight drop-shadow">
													Ansehen &rarr;
												</p>
											</div>
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</div>

				{/* Bottom Navigation & Live Progress Bar */}
				<div class="flex items-center justify-between pt-6 border-t border-white/25">
					{/* Prev / Next Glass Buttons */}
					<div class="flex items-center space-x-3">
						<button
							onClick$={prevSlide}
							aria-label="Previous Slide"
							class="w-11 h-11 rounded-full border border-white/35 bg-white/15 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cyan-300 shadow-sm"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<button
							onClick$={nextSlide}
							aria-label="Next Slide"
							class="w-11 h-11 rounded-full border border-white/35 bg-white/15 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cyan-300 shadow-sm"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>

					{/* Auto-play Progress Bar */}
					<div class="flex-1 max-w-md mx-6 hidden sm:flex items-center space-x-3">
						<div class="h-1.5 flex-1 bg-white/25 rounded-full overflow-hidden backdrop-blur-sm">
							<div
								class="h-full bg-gradient-to-r from-cyan-300 to-sky-400 rounded-full transition-all duration-75 shadow-[0_0_10px_#67e8f9]"
								style={{ width: `${progress.value}%` }}
							/>
						</div>
					</div>

					{/* Slide Counter (e.g. 01 / 04) */}
					<div class="flex items-baseline space-x-1 font-mono text-sm tracking-widest text-cyan-200 drop-shadow">
						<span class="text-lg font-extrabold text-white">0{activeIndex.value + 1}</span>
						<span class="text-white/60">/</span>
						<span class="text-white/80">0{SLIDES.length}</span>
					</div>
				</div>
			</div>
		</div>
	);
});
