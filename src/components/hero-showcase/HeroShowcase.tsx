import { $, component$, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { _ } from 'compiled-i18n';

interface HeroSlide {
	id: string;
	tag: string;
	title: string;
	subtitle: string;
	description: string;
	ctaText: string;
	ctaLink: string;
	image: string;
	webpImage: string;
	thumb: string;
	thumbWebp: string;
}

export default component$(() => {
	const activeIndex = useSignal(0);
	const prevIndex = useSignal<number | null>(null);
	const isTransitioning = useSignal(false);
	const isPaused = useSignal(false);
	const progress = useSignal(0);

	const SLIDES: HeroSlide[] = [
		{
			id: 'kitesurfing',
			tag: _`ELEVEIGHT 2026 // RS+ & FS PERFORMANCE`,
			title: _`KITESURFING`,
			subtitle: _`LIMITLESS BIG AIR & SPEED`,
			description: _`Engineered for maximum hangtime, explosive acceleration and uncompromising control in any wind condition.`,
			ctaText: _`Explore Kites`,
			ctaLink: '/collections/kites',
			image: '/images/hero/kitesurfing-hero.jpg',
			webpImage: '/images/hero/kitesurfing-hero.webp',
			thumb: '/images/hero/kitesurfing-hero-thumb.jpg',
			thumbWebp: '/images/hero/kitesurfing-hero-thumb.webp',
		},
		{
			id: 'wingfoiling',
			tag: _`ELEVEIGHT 2026 // WFS PRO SERIES`,
			title: _`WINGFOILING`,
			subtitle: _`FLY FREELY ABOVE THE WAVES`,
			description: _`Ultra-lightweight carbon performance, instantaneous power delivery and intuitive balance for endless gliding flights.`,
			ctaText: _`Explore Wings`,
			ctaLink: '/collections/wings',
			image: '/images/hero/wingfoiling-hero.jpg',
			webpImage: '/images/hero/wingfoiling-hero.webp',
			thumb: '/images/hero/wingfoiling-hero-thumb.jpg',
			thumbWebp: '/images/hero/wingfoiling-hero-thumb.webp',
		},
		{
			id: 'hydrofoils',
			tag: _`CARBON MASTS & GLIDE SERIES`,
			title: _`HYDROFOILS`,
			subtitle: _`EFFORTLESS GLIDE & CARVES`,
			description: _`Hydrodynamic precision for early lift-off, razor-sharp turns and maximum efficiency across the water.`,
			ctaText: _`Explore Foils`,
			ctaLink: '/collections/foil-packages',
			image: '/images/hero/hydrofoils-hero.jpg',
			webpImage: '/images/hero/hydrofoils-hero.webp',
			thumb: '/images/hero/hydrofoils-hero-thumb.jpg',
			thumbWebp: '/images/hero/hydrofoils-hero-thumb.webp',
		},
		{
			id: 'twintips',
			tag: _`COMMANDER & MASTER SERIES`,
			title: _`TWINTIP BOARDS`,
			subtitle: _`EXPLOSIVE POP & CONTROL`,
			description: _`High-tech carbon layups for radical take-offs, buttery smooth landings and ultimate edge control.`,
			ctaText: _`Explore Twintips`,
			ctaLink: '/collections/twintips',
			image: '/images/hero/twintips-hero.jpg',
			webpImage: '/images/hero/twintips-hero.webp',
			thumb: '/images/hero/twintips-hero-thumb.jpg',
			thumbWebp: '/images/hero/twintips-hero-thumb.webp',
		},
	];

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
		if (
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			isPaused.value = true;
		}

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
			role="region"
			aria-roledescription="carousel"
			aria-label={_`Featured equipment`}
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
				.w-slide-box picture {
					width: 100%;
					height: 100%;
					display: block;
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
				/* Outgoing: Weitet sich über den View hinaus von 1.0 auf 4.5 */
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
					            opacity 1800ms cubic-bezier(0.3, 0, 0.8, 1) 400ms,
					            filter 1800ms ease;
				}
				/* Incoming: Komprimiert sich aus 4.5 in den View auf 1.0 */
				.w-incoming {
					z-index: 20;
					pointer-events: auto;
					visibility: visible;
				}
				.w-incoming img {
					transform: scale(1.0);
					filter: blur(0px);
					opacity: 1;
					transition: transform 1800ms cubic-bezier(0.16, 1, 0.3, 1),
					            opacity 700ms ease-out,
					            filter 1500ms ease-out;
				}
				/* Active resting */
				.w-active {
					z-index: 5;
					opacity: 1;
					pointer-events: auto;
					visibility: visible;
				}
				.w-active img {
					transform: scale(1.0);
					filter: blur(0px);
					opacity: 1;
				}
			`}</style>

			{/* Background Image Carousel Layers */}
			{SLIDES.map((slide, index) => {
				const isCurrent = index === activeIndex.value;
				const isPrevious = index === prevIndex.value;

				let statusClass = 'w-dormant';
				if (isCurrent && isTransitioning.value) {
					statusClass = 'w-incoming';
				} else if (isCurrent && !isTransitioning.value) {
					statusClass = 'w-active';
				} else if (isPrevious && isTransitioning.value) {
					statusClass = 'w-outgoing';
				}

				return (
					<div
						key={slide.id}
						class={['w-slide-box', statusClass, isCurrent ? 'cursor-pointer' : '']}
						aria-hidden={!isCurrent}
						onClick$={() => {
							if (isCurrent) {
								window.location.href = slide.ctaLink;
							}
						}}
					>
						<picture class="w-full h-full block">
							<source srcset={slide.webpImage} type="image/webp" />
							<img
								width="1920"
								height="1080"
								src={slide.image}
								alt={slide.title}
								loading={index === 0 ? 'eager' : 'lazy'}
								fetchPriority={index === 0 ? 'high' : 'auto'}
								decoding={index === 0 ? 'sync' : 'async'}
								class="brightness-95 contrast-105"
							/>
						</picture>
					</div>
				);
			})}

			{/* Soft Multi-Stop Gradient Overlays for High Contrast & Text Legibility */}
			<div class="absolute inset-0 bg-gradient-to-r from-sky-950/90 via-sky-900/60 to-transparent pointer-events-none z-20" />
			<div class="absolute inset-0 bg-gradient-to-t from-sky-950/85 via-transparent to-sky-950/30 pointer-events-none z-20" />

			{/* Content Container */}
			<div class="relative z-30 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-between pt-16 pb-10 pointer-events-none">
				{/* Top Status Bar: Partner Tag & Pill */}
				<div class="flex items-center justify-between pointer-events-auto">
					<div class="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 backdrop-blur-md border border-cyan-400/40 text-xs sm:text-sm font-bold tracking-wide text-cyan-300 shadow-sm">
						<span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
						<span>{_`All For Wind // Official Eleveight Partner`}</span>
					</div>
				</div>

				{/* Middle Row: Left Text Content + Right Wanderers Thumbnails */}
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto">
					{/* Left Column: Kinetic Text Reveal */}
					<div class="lg:col-span-7 space-y-4 max-w-2xl pointer-events-auto">
						<div class="relative min-h-[260px] sm:min-h-[290px] flex flex-col justify-center">
							{SLIDES.map((slide, index) => {
								const isActive = index === activeIndex.value;
								return (
									<div
										key={slide.id}
										role="group"
										aria-roledescription="slide"
										aria-label={_`Slide ${index + 1} of ${SLIDES.length}: ${slide.title}`}
										aria-hidden={!isActive}
										class={[
											'transition-all duration-700 absolute inset-x-0 bottom-0 top-0 flex flex-col justify-center',
											isActive
												? 'opacity-100 translate-y-0 pointer-events-auto z-10'
												: 'opacity-0 translate-y-6 pointer-events-none z-0',
										]}
									>
										<span class="text-xs sm:text-sm font-mono tracking-widest uppercase text-cyan-300 font-bold drop-shadow">
											{slide.tag}
										</span>
										<a href={slide.ctaLink} class="group inline-block cursor-pointer">
											{isActive ? (
												<h1 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none mt-2 text-white group-hover:text-cyan-300 transition-colors drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
													{slide.title}
												</h1>
											) : (
												<h2 class="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-none mt-2 text-white group-hover:text-cyan-300 transition-colors drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
													{slide.title}
												</h2>
											)}
										</a>
										<p class="text-base sm:text-xl font-bold tracking-wide uppercase text-cyan-100 mt-2 drop-shadow">
											{slide.subtitle}
										</p>
										<p class="text-sm sm:text-base text-white/90 font-medium leading-relaxed max-w-xl mt-3 drop-shadow">
											{slide.description}
										</p>

										<div class="flex flex-wrap items-center gap-4 pt-6">
											<a
												href={slide.ctaLink}
												class="inline-flex items-center px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-cyan-300 to-sky-400 hover:from-cyan-200 hover:to-sky-300 shadow-[0_0_25px_rgba(103,232,249,0.5)] hover:shadow-[0_0_35px_rgba(103,232,249,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
											>
												<span>{slide.ctaText}</span>
												<span class="ml-2.5">
													<svg
														class="w-4 h-4"
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
												class="inline-flex items-center px-6 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 shadow-sm transition-all duration-300 cursor-pointer"
											>
												{_`All Categories`}
											</a>
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* Right Column: Wanderlix Thumbnail Slider */}
					<div class="lg:col-span-5 flex flex-col items-start lg:items-end pointer-events-auto">
						<div class="flex space-x-3 sm:space-x-4 overflow-x-auto pb-4 pt-2 max-w-full no-scrollbar">
							{SLIDES.map((slide, index) => {
								const isActive = index === activeIndex.value;
								return (
									<div
										key={slide.id}
										role="button"
										tabIndex={0}
										aria-label={_`Select slide: ${slide.title}`}
										onClick$={() => {
											if (isActive) {
												window.location.href = slide.ctaLink;
											} else {
												goToSlide(index);
											}
										}}
										onKeyDown$={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												if (isActive) {
													window.location.href = slide.ctaLink;
												} else {
													goToSlide(index);
												}
											}
										}}
										class={[
											'relative flex-shrink-0 w-28 sm:w-36 h-40 sm:h-48 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 text-left group select-none',
											isActive
												? 'ring-2 ring-cyan-300 shadow-[0_0_30px_rgba(103,232,249,0.55)] scale-105'
												: 'opacity-85 hover:opacity-100 hover:scale-100 border border-white/35',
										]}
									>
										<picture class="absolute inset-0 w-full h-full block">
											<source srcset={slide.thumbWebp} type="image/webp" />
											<img
												width="144"
												height="192"
												src={slide.thumb}
												alt={slide.title}
												loading="lazy"
												decoding="async"
												class="w-full h-full object-cover brightness-105 transition-transform duration-500 group-hover:scale-110"
											/>
										</picture>
										<div class="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-sky-950/15 to-transparent" />
										<div class="relative z-10 h-full p-3 flex flex-col justify-between">
											<span class="text-xs font-mono tracking-wider font-bold text-cyan-300 px-2 py-0.5 rounded-md bg-sky-950/80 backdrop-blur-md self-start border border-cyan-400/30">
												0{index + 1}
											</span>
											<div>
												<p class="text-xs font-extrabold text-white tracking-wide uppercase line-clamp-1 drop-shadow">
													{slide.title}
												</p>
												<a
													href={slide.ctaLink}
													stoppropagation:click
													class="text-xs text-cyan-300 hover:text-white font-semibold tracking-tight drop-shadow inline-flex items-center min-h-[44px] py-2 underline"
												>
													{_`View`} &rarr;
												</a>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Bottom Navigation & Live Progress Bar */}
				<div class="flex items-center justify-between pt-6 border-t border-white/25 pointer-events-auto">
					{/* Prev / Next & Pause/Play Glass Buttons */}
					<div class="flex items-center space-x-3">
						<button
							onClick$={prevSlide}
							aria-label={_`Previous Slide`}
							class="w-11 h-11 rounded-full border border-white/35 bg-white/15 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cyan-300 shadow-sm cursor-pointer"
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
							aria-label={_`Next Slide`}
							class="w-11 h-11 rounded-full border border-white/35 bg-white/15 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cyan-300 shadow-sm cursor-pointer"
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
						<button
							onClick$={() => (isPaused.value = !isPaused.value)}
							aria-label={isPaused.value ? _`Resume slideshow` : _`Pause slideshow`}
							class="w-11 h-11 rounded-full border border-white/35 bg-white/15 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 hover:scale-105 active:scale-95 hover:border-cyan-300 shadow-sm cursor-pointer"
						>
							{isPaused.value ? (
								<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
									<path d="M8 5v14l11-7z" />
								</svg>
							) : (
								<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
									<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
								</svg>
							)}
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
					<div class="flex items-baseline space-x-1 font-mono text-sm tracking-widest text-cyan-300 drop-shadow">
						<span class="text-lg font-extrabold text-white">0{activeIndex.value + 1}</span>
						<span class="text-white/80">/</span>
						<span class="text-white/90">0{SLIDES.length}</span>
					</div>
				</div>
			</div>
		</div>
	);
});
