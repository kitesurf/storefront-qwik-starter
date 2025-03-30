import { component$, useContext } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';
import CollectionCard from '~/components/collection-card/CollectionCard';
import { LocalizedLink } from '~/components/LocalizedLink';
import { APP_STATE } from '~/constants';
import desktopImg from '/src/rm.webp?https://allforwind.com/cdn-cgi/image/width=80,quality=75/1.jpg';

export const translations = {
	achievements: {
		customers: '15000+',
		experience: '10+',
		products: '500+',
		locations: '25+',
	},
};


export default component$(() => {
	const appState = useContext(APP_STATE);
	const collections = useContext(APP_STATE).collections;
	const rootCollections = appState.collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const products = useContext(APP_STATE).products;
	console.log('collections', collections);
	console.log('products', JSON.stringify(products, null, 2));
	console.log('products', products);
	return (
		<div >
			{/* Hero Section */}


			<div class="relative w-full md:h-[85vh]">
				<Image
					src={desktopImg}
					// format="auto"
					alt="Kitesurfing hero image"
					width={1920}
					height={1080}
					loading="eager"
					fetchpriority="high"
					decoding="sync"
					class="w-full h-full object-cover"
				/>
				<div class="absolute inset-0 flex items-center">
					<div class="w-full px-3 sm:px-4 md:px-6 lg:px-8">
						<div class="w-full max-w-xs sm:max-w-sm md:max-w-xl mx-auto" data-aos="fade-left">
							<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-6 text-center">
								{$localize`Ride the Waves`}
							</h1>
							<p class="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-8 text-center">
								{$localize`Enjoy the Wind`}
							</p>
							<div class="w-full">
								{/* Mobile Layout (default) */}
								<nav class="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-3 md:gap-6 w-full md:hidden ">
									{rootCollections.map((collection) => (
										<LocalizedLink
											key={collection.id}
											href={`/collections/${collection.slug}`}
											class="border  sm:border-2   backdrop-blur-sm  bg-[#2D2D2D]/30  font-medium sm:font-semibold text-white hover:bg-white/10 text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-8 lg:px-12 py-2 sm:py-2 md:py-3 lg:py-4 rounded-full transition-all duration-300 text-center"
										>
											{collection.name}
										</LocalizedLink>
									))}
								</nav>

								{/* Desktop Layout */}
								<nav class="hidden md:flex w-full justify-center space-x-4">
									{rootCollections.map((collection, index) => (
										<LocalizedLink
											key={collection.id}
											href={`/collections/${collection.slug}`}
											class={`
                      border border-white/30 
                      backdrop-blur-sm 
                     bg-[#2D2D2D]/30
                      text-white 
                      font-semibold 
                      hover:bg-white/20 
                      px-8 lg:px-12 
                      py-3 lg:py-4 
                      rounded-full 
                      transition-all 
                      duration-300 
                      text-center 
                      w-1/2 
                      ${index === 0 ? 'mr-2' : 'ml-2'}
                    `}
										>
											{collection.name}
										</LocalizedLink>
									))}
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Features Bar */}
			<div class="bg-gray-50 border-y border-gray-200 py-4 sm:py-6">
				<div class="max-w-7xl mx-auto px-3 sm:px-4">
					<div class="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-5">
						<div class="flex items-center gap-2 p-2 sm:p-3 md:p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
							<span class="text-xl sm:text-2xl">🚚</span>
							<div class="min-w-0">
								<h3 class="font-semibold text-sm sm:text-base truncate">{$localize`Free Shipping`}</h3>
								<p class="text-xs sm:text-sm text-gray-600 truncate">{$localize`On orders over €500`}</p>
							</div>
						</div>

						<div class="flex items-center gap-2 p-2 sm:p-3 md:p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
							<span class="text-xl sm:text-2xl">🔄</span>
							<div class="min-w-0">
								<h3 class="font-semibold text-sm sm:text-base truncate">{$localize`30-Day Returns`}</h3>
								<p class="text-xs sm:text-sm text-gray-600 truncate">{$localize`No questions asked`}</p>
							</div>
						</div>

						<div class="flex items-center gap-2 p-2 sm:p-3 md:p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
							<span class="text-xl sm:text-2xl">🛡️</span>
							<div class="min-w-0">
								<h3 class="font-semibold text-sm sm:text-base truncate">{$localize`2-Year Warranty`}</h3>
								<p class="text-xs sm:text-sm text-gray-600 truncate">{$localize`On all equipment`}</p>
							</div>
						</div>

						<div class="flex items-center gap-2 p-2 sm:p-3 md:p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
							<span class="text-xl sm:text-2xl">💬</span>
							<div class="min-w-0">
								<h3 class="font-semibold text-sm sm:text-base truncate">{$localize`Expert Support`}</h3>
								<p class="text-xs sm:text-sm text-gray-600 truncate">{$localize`24/7 chat available`}</p>
							</div>
						</div>
					</div>
				</div>
			</div>



			{/* Featured Collections */}
			<section class="py-10 md:py-14">
				<div class="max-w-7xl mx-auto px-3 sm:px-4">
					<div class="mb-6 md:mb-8">
						<h2 class="text-2xl sm:text-3xl font-bold text-[#2D2D2D] text-center">
							{$localize`Shop by Category`}
						</h2>
						<p class="mt-2 text-gray-600 text-center max-w-2xl mx-auto text-sm sm:text-base">
							{$localize`Discover our curated collection of premium water sports equipment`}
						</p>
					</div>

					<div class="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
						{collections.map((collection, index) =>
							collection.featuredAsset ? (
								<div
									key={collection.id}
									data-aos="fade-up"
									data-aos-delay={index * 50}
								>
									<CollectionCard collection={collection} />
								</div>
							) : null
						)}
					</div>
				</div>
			</section>

			<div class="bg-[#2D2D2D] py-14 md:py-16">
				<div class="max-w-7xl mx-auto px-4 sm:px-6">
					<div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-white">
						{[
							{ number: translations.achievements.customers, label: $localize`Happy Customers` },
							{ number: translations.achievements.experience, label: $localize`Years Experience` },
							{ number: translations.achievements.products, label: $localize`Products` },
							{ number: translations.achievements.locations, label: $localize`Shipping Locations` },
						].map((stat, index) => (
							<div
								key={index}
								class="text-center"
								data-aos="fade-up"
								data-aos-delay={index * 100}
							>
								<div class="text-4xl sm:text-5xl font-bold mb-3 text-white">{stat.number}</div>
								<div class="text-base sm:text-lg font-medium text-white/80">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Trust Badges */}
			<div class="bg-white border-y border-gray-200">
				<div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
					<div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-[#2D2D2D]">

						<div class="flex flex-col items-center justify-center p-5 sm:p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white text-center min-h-[120px]">
							<span class="text-3xl sm:text-4xl">🔒</span>
							<h3 class="font-bold text-base sm:text-lg mt-2">{$localize`Secure Payment`}</h3>
							<p class="text-xs sm:text-sm text-gray-500">{$localize`SSL encrypted checkout`}</p>
						</div>

						<div class="flex flex-col items-center justify-center p-5 sm:p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white text-center min-h-[120px]">
							<span class="text-3xl sm:text-4xl">⚡</span>
							<h3 class="font-bold text-base sm:text-lg mt-2">{$localize`Fast Delivery`}</h3>
							<p class="text-xs sm:text-sm text-gray-500">{$localize`2-4 business days`}</p>
						</div>

						<div class="flex flex-col items-center justify-center p-5 sm:p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white text-center min-h-[120px]">
							<span class="text-3xl sm:text-4xl">✨</span>
							<h3 class="font-bold text-base sm:text-lg mt-2">{$localize`Quality Assured`}</h3>
							<p class="text-xs sm:text-sm text-gray-500">{$localize`All products certified`}</p>
						</div>

						<div class="flex flex-col items-center justify-center p-5 sm:p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white text-center min-h-[120px]">
							<span class="text-3xl sm:text-4xl">🌍</span>
							<h3 class="font-bold text-base sm:text-lg mt-2">{$localize`Global Shipping`}</h3>
							<p class="text-xs sm:text-sm text-gray-500">{$localize`Worldwide delivery`}</p>
						</div>

					</div>
				</div>
			</div>

			{/* Video Section */}
			<section class="py-20 bg-white border-t border-gray-200">
				<div class="max-w-7xl mx-auto px-6">
					<div class="grid md:grid-cols-2 gap-12 items-center">

						<div class="space-y-6" data-aos="fade-right">
							<h2 class="text-4xl font-extrabold text-[#2D2D2D] leading-tight">
								{$localize`Master Your Technique`}
							</h2>
							<p class="text-gray-600 text-lg leading-relaxed">
								{$localize`Watch our expert tutorials and learn from professional riders.`}
							</p>


							<div class="grid gap-4">
								<div class="flex items-center gap-4 p-4 bg-gray-100 border border-gray-300 rounded-[4px]">
									<span class="text-[#2D2D2D] text-2xl font-bold">✓</span>
									<span class="text-lg text-[#2D2D2D] font-medium">{$localize`Professional Tutorials`}</span>
								</div>
								<div class="flex items-center gap-4 p-4 bg-gray-100 border border-gray-300 rounded-[4px]">
									<span class="text-[#2D2D2D] text-2xl font-bold">✓</span>
									<span class="text-lg text-[#2D2D2D] font-medium">{$localize`Equipment Guides`}</span>
								</div>
								<div class="flex items-center gap-4 p-4 bg-gray-100 border border-gray-300 rounded-[4px]">
									<span class="text-[#2D2D2D] text-2xl font-bold">✓</span>
									<span class="text-lg text-[#2D2D2D] font-medium">{$localize`Safety Tips`}</span>
								</div>
							</div>

							<button class="bg-[#2D2D2D] text-white px-6 py-3 rounded-[4px] hover:bg-black transition-all text-lg font-semibold shadow-md">
								{$localize`Watch Tutorials`}
							</button>
						</div>


						<div class="relative group" data-aos="fade-left">
							<div class="relative aspect-video w-full bg-gray-100 border border-gray-300 rounded-[4px] overflow-hidden shadow-lg">
				
								<Image
									src={desktopImg}
									alt={$localize`Tutorial video`}
									width={1920}
									height={1080}
									class="w-full h-full object-cover"
								/>
							</div>
						</div>

					</div>
				</div>
			</section>

			<section class="py-20 bg-white border-t border-gray-200" data-aos="fade-up">
				<div class="max-w-7xl mx-auto px-6">
					<div class="text-center mb-12">
						<h2 class="text-4xl font-extrabold text-[#2D2D2D]">{$localize`What Our Riders Say`}</h2>
						<p class="text-gray-600 text-lg max-w-2xl mx-auto mt-3">
							{$localize`Hear from our community of passionate riders.`}
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[{
							name: 'Sarah Johnson',
							role: $localize`Professional Kitesurfer`,
							quote: $localize`The quality of equipment from All For Wind is unmatched. Their expert advice helped me choose the perfect kit.`,
						},
						{
							name: 'Mike Thompson',
							role: $localize`Windfoiling Enthusiast`,
							quote: $localize`Outstanding selection of windfoiling gear. The customer service team really knows their stuff!`,
						},
						{
							name: 'Lisa Chen',
							role: $localize`Kite Instructor`,
							quote: $localize`I recommend All For Wind to all my students. Their beginner-friendly equipment is top-notch.`,
						},
						].map((testimonial, index) => (
							<div
								key={index}
								class="border border-gray-300 p-6 rounded-[4px] shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
								data-aos="fade-up"
								data-aos-delay={index * 100}
							>
								<div class="flex items-center mb-6">
									<div class="w-16 h-16 flex items-center justify-center rounded-full bg-gray-300 text-xl font-bold text-[#2D2D2D] mr-4">
										{testimonial.name.charAt(0)}
									</div>
									<div>
										<h3 class="text-lg font-semibold text-[#2D2D2D]">{testimonial.name}</h3>
										<p class="text-[#2D2D2D] text-sm font-medium">{testimonial.role}</p>
									</div>
								</div>
								<p class="text-gray-700 text-lg leading-relaxed border-l-4 border-[#2D2D2D] pl-4 italic">
									"{testimonial.quote}"
								</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
});

