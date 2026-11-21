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
			'Konstruiert für maximale Hangtime, explosive Beschleunigung und kompromisslose Kontrolle bei jedem Sturm.',
		ctaText: 'Kitesurfen Entdecken',
		ctaLink: '/collections/kitesurfing',
		image: '/images/hero/kitesurfing-hero.jpg',
		thumb: '/images/hero/kitesurfing-hero.jpg',
	},
	{
		id: 'wingfoiling',
		tag: 'ELEVEIGHT 2026 // WFS PRO SERIES',
		title: 'WINGFOILING',
		subtitle: 'FLY FREELY ABOVE THE WAVES',
		description:
			'Ultraleichte Carbon-Steifigkeit, sofortige Kraftentfaltung und intuitive Balance für grenzenlose Gleitflüge.',
		ctaText: 'Wingfoiling Entdecken',
		ctaLink: '/collections/wing-foiling',
		image: '/images/hero/wingfoiling-hero.jpg',
		thumb: '/images/hero/wingfoiling-hero.jpg',
	},
	{
		id: 'hydrofoils',
		tag: 'CARBON MASTS & ADVANCED WINGS',
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
		ctaLink: '/collections/kitesurfing',
		image: '/images/hero/twintips-hero.jpg',
		thumb: '/images/hero/twintips-hero.jpg',
	},
];

export default component$(() => {
	const activeIndex = useSignal(0);
	const prevIndex = useSignal<number | null>(null);
	const isPaused = useSignal(false);
	const progress = useSignal(0);

	const SLIDE_DURATION_MS = 6000;
	const TICK_INTERVAL_MS = 50;
	const STEP = (TICK_INTERVAL_MS / SLIDE_DURATION_MS) * 100;

	const switchSlide = $((newIndex: number) => {
		if (newIndex === activeIndex.value) return;
		prevIndex.value = activeIndex.value;
		activeIndex.value = newIndex;
		progress.value = 0;

		setTimeout(() => {
			if (prevIndex.value !== activeIndex.value) {
				prevIndex.value = null;
			}
		}, 1650);
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
			class="relative w-full h-[88vh] min-h-[620px] max-h-[920px] overflow-hidden bg-slate-950 text-white select-none"
			onMouseEnter$={() => (isPaused.value = true)}
			onMouseLeave$={() => (isPaused.value = false)}
		>
			{/* Wanderlix Background Scale/Blur Slides */}
			<div class="absolute inset-0 w-full h-full overflow-hidden">
				{SLIDES.map((slide, index) => {
					const isActive = index === activeIndex.value;
					const isPrev = index === prevIndex.value;

					let containerClasses = 'absolute inset-0 w-full h-full overflow-hidden';
					let imgClasses = 'w-full h-full object-cover object-center transform transition-all';

					if (isActive) {
						// Neues Bild komprimiert sich aus den Rändern des Views (scale 2.2 -> 1)
						containerClasses += ' z-20 pointer-events-auto';
						imgClasses +=
							' opacity-100 scale-100 blur-0 duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]';
					} else if (isPrev) {
						// Altes Bild weitet sich über den View hinaus (scale 1 -> 3.2)
						containerClasses += ' z-10 pointer-events-none';
						imgClasses += ' opacity-0 scale-[3.2] blur-[12px] duration-[1400ms] ease-in';
					} else {
						// Inaktive Bilder warten vergrößert im Hintergrund
						containerClasses += ' z-0 pointer-events-none opacity-0';
						imgClasses += ' scale-[2.2] blur-[8px] duration-0';
					}

					return (
						<div key={slide.id} class={containerClasses}>
							<img
								width="1920"
								height="1080"
								src={slide.image}
								alt={slide.title}
								class={imgClasses}
								loading={index === 0 ? 'eager' : 'lazy'}
							/>
						</div>
					);
				})}
			</div>

			{/* Cinematic Dark Gradient & Blur Overlays */}
			<div class="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/20" />
			<div class="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
			<div class="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-slate-950/80" />

			{/* Main Content Layout */}
			<div class="relative z-30 max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex flex-col justify-between py-10 sm:py-14">
				{/* Top Branding / Partner Badge */}
				<div class="flex items-center space-x-3">
					<div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wider uppercase text-cyan-300">
						<span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
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
										<span class="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-cyan-400 mb-2 drop-shadow">
											{slide.tag}
										</span>
										<h1 class="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-2xl">
											{slide.title}
										</h1>
										<p class="mt-2 text-lg sm:text-2xl font-light text-cyan-200/90 tracking-wide drop-shadow">
											{slide.subtitle}
										</p>
										<p class="mt-4 max-w-xl text-sm sm:text-base text-gray-300/95 leading-relaxed drop-shadow">
											{slide.description}
										</p>

										{/* Call-To-Action Buttons */}
										<div class="mt-8 flex flex-wrap gap-4 items-center">
											<a
												href={slide.ctaLink}
												class="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-sm sm:text-base text-white overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500"
											>
												<span class="relative z-10 flex items-center font-semibold tracking-wide">
													{slide.ctaText}
													<svg
														class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1.5"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M14 5l7 7m0 0l-7 7m7-7H3"
														/>
													</svg>
												</span>
												<div class="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-white/20" />
											</a>
											<a
												href="/collections"
												class="inline-flex items-center px-6 py-3.5 rounded-full text-sm sm:text-base font-medium text-gray-200 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 transition-all duration-300"
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
												? 'ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.45)] scale-105'
												: 'opacity-70 hover:opacity-100 hover:scale-100 border border-white/20',
										]}
									>
										<img
											width="144"
											height="192"
											src={slide.thumb}
											alt={slide.title}
											class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
										/>
										<div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
										<div class="relative z-10 h-full p-3 flex flex-col justify-between">
											<span class="text-[11px] font-mono tracking-wider font-semibold text-cyan-300 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm self-start border border-white/10">
												0{index + 1}
											</span>
											<div>
												<p class="text-xs font-bold text-white tracking-wide uppercase line-clamp-1 drop-shadow">
													{slide.title}
												</p>
												<p class="text-[10px] text-cyan-300 font-medium tracking-tight drop-shadow">
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
				<div class="flex items-center justify-between pt-6 border-t border-white/10">
					{/* Prev / Next Glass Buttons */}
					<div class="flex items-center space-x-3">
						<button
							onClick$={prevSlide}
							aria-label="Previous Slide"
							class="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cyan-400"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<button
							onClick$={nextSlide}
							aria-label="Next Slide"
							class="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cyan-400"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</div>

					{/* Auto-play Progress Bar */}
					<div class="flex-1 max-w-md mx-6 hidden sm:flex items-center space-x-3">
						<div class="h-1.5 flex-1 bg-white/15 rounded-full overflow-hidden backdrop-blur-sm">
							<div
								class="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-75"
								style={{ width: `${progress.value}%` }}
							/>
						</div>
					</div>

					{/* Slide Counter (e.g. 01 / 04) */}
					<div class="flex items-baseline space-x-1 font-mono text-sm tracking-widest text-cyan-300">
						<span class="text-lg font-bold text-white">0{activeIndex.value + 1}</span>
						<span class="text-white/40">/</span>
						<span class="text-white/60">0{SLIDES.length}</span>
					</div>
				</div>
			</div>
		</div>
	);
});
