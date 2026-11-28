import { component$, useSignal, useVisibleTask$, $, type QRL } from '@qwik.dev/core';

export interface Product360ViewerProps {
	videoUrl: string;
	onClose$?: QRL<() => void>;
}

export const Product360Viewer = component$<Product360ViewerProps>(({ videoUrl, onClose$ }) => {
	const videoRef = useSignal<HTMLVideoElement>();
	const isDraggingSig = useSignal(false);
	const startXSig = useSignal(0);
	const startTimeSig = useSignal(0);
	const showHintSig = useSignal(true);
	const isLoadedSig = useSignal(false);

	// Initial subtle teaser rotation to demonstrate 360 capability
	useVisibleTask$(({ track, cleanup }) => {
		track(() => videoUrl);
		const video = videoRef.value;
		if (!video) return;

		let frameId: number;
		let timeoutId: any;

		const handleLoaded = () => {
			isLoadedSig.value = true;
			// Smoothly animate ~0.4s forward and back to show interactivity
			let step = 0;
			const animate = () => {
				if (!isDraggingSig.value && video) {
					step += 0.015;
					if (step <= 0.4) {
						video.currentTime = step;
						frameId = requestAnimationFrame(animate);
					}
				}
			};
			timeoutId = setTimeout(() => {
				frameId = requestAnimationFrame(animate);
			}, 300);
		};

		if (video.readyState >= 1) {
			handleLoaded();
		} else {
			video.addEventListener('loadedmetadata', handleLoaded, { once: true });
		}

		cleanup(() => {
			cancelAnimationFrame(frameId);
			clearTimeout(timeoutId);
		});
	});

	const handlePointerDown$ = $((e: PointerEvent) => {
		const video = videoRef.value;
		if (!video) return;

		isDraggingSig.value = true;
		startXSig.value = e.clientX;
		startTimeSig.value = video.currentTime;
		showHintSig.value = false;

		const target = e.currentTarget as HTMLElement;
		if (target && target.setPointerCapture) {
			try {
				target.setPointerCapture(e.pointerId);
			} catch (err) {
				void err;
			}
		}
	});

	const handlePointerMove$ = $((e: PointerEvent) => {
		if (!isDraggingSig.value) return;
		const video = videoRef.value;
		if (!video) return;

		const duration = video.duration || 2.0;
		const deltaX = e.clientX - startXSig.value;
		// 350px drag width = full 360 degree rotation
		const sensitivity = duration / 350;
		let newTime = startTimeSig.value - deltaX * sensitivity;

		// Circular wrap-around
		while (newTime < 0) newTime += duration;
		newTime = newTime % duration;

		video.currentTime = newTime;
	});

	const handlePointerUp$ = $((e: PointerEvent) => {
		isDraggingSig.value = false;
		const target = e.currentTarget as HTMLElement;
		if (target && target.releasePointerCapture) {
			try {
				target.releasePointerCapture(e.pointerId);
			} catch (err) {
				void err;
			}
		}
	});

	// Derive WebM alternative if MP4 is provided
	const webmUrl = videoUrl.endsWith('.mp4') ? videoUrl.replace(/\.mp4$/, '.webm') : videoUrl;
	const mp4Url = videoUrl.endsWith('.webm') ? videoUrl.replace(/\.webm$/, '.mp4') : videoUrl;

	return (
		<div
			class="relative w-full h-full flex items-center justify-center bg-white dark:bg-gray-900 rounded-lg overflow-hidden select-none touch-none cursor-ew-resize group"
			onPointerDown$={handlePointerDown$}
			onPointerMove$={handlePointerMove$}
			onPointerUp$={handlePointerUp$}
			onPointerCancel$={handlePointerUp$}
		>
			<video
				ref={videoRef}
				playsInline
				muted
				loop
				preload="auto"
				class="w-full h-full object-contain pointer-events-none"
			>
				<source src={webmUrl} type="video/webm" />
				<source src={mp4Url} type="video/mp4" />
			</video>

			{/* Interactive Drag Hint Overlay */}
			{showHintSig.value && (
				<div class="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-500 bg-gray-900/80 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg border border-white/20">
					<svg
						class="w-4 h-4 animate-pulse text-primary-400"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="m9 18-6-6 6-6" />
						<path d="m15 6 6 6-6 6" />
					</svg>
					<span>Ziehen zum Drehen</span>
				</div>
			)}

			{/* Rotation Indicator Compass Badge */}
			<div class="absolute bottom-3 right-3 pointer-events-none bg-black/40 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-mono tracking-wider">
				360°
			</div>

			{/* Close / Return to Photos Button */}
			{onClose$ && (
				<button
					type="button"
					stoppropagation:click
					onClick$={$(() => {
						if (onClose$) onClose$();
					})}
					aria-label="360° Ansicht schließen und zur Fotogalerie zurückkehren"
					class="absolute top-2 right-2 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all bg-sky-700 text-white hover:bg-sky-800 hover:scale-105 active:scale-95 pointer-events-auto"
				>
					<svg
						class="w-3.5 h-3.5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
					<span>Fotos</span>
				</button>
			)}
		</div>
	);
});
