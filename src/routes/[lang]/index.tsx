import { component$, JSXChildren, JSXNode, Signal, useContext } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';
import CollectionCard from '~/components/collection-card/CollectionCard';
import { LocalizedLink } from '~/components/LocalizedLink';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID } from '~/constants';
import { getActiveCustomerQuery } from '~/providers/shop/customer/customer';
import { createRequestOptions } from '~/utils/api';
import desktopImg from '/src/rm.webp?https://allforwind.com/cdn-cgi/image/width=80,quality=75/1.jpg';

export const translations = {
	achievements: {
		customers: '15000+',
		experience: '10+',
		products: '500+',
		locations: '25+',
	},
};

const trustBadges = [
	{ icon: '🔒', title: `Secure Payment`, text: `SSL encrypted checkout` },
	{ icon: '⚡', title: `Fast Delivery`, text: `2-4 business days` },
	{ icon: '✨', title: `Quality Assured`, text: `All products certified` },
	{ icon: '🌍', title: `Global Shipping`, text: `Worldwide delivery` },
];

export default component$(() => {
	const appState = useContext(APP_STATE);
	const collections = useContext(APP_STATE).collections;
	const currentLang = appState.language || 'en';
	const rootCollections = appState.collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const products = useContext(APP_STATE).products;
	console.log('collections', collections);
	console.log('products', JSON.stringify(products, null, 2));

	return (
		<div class="min-h-screen bg-white">
			{/* Hero Section */}
			<div class="relative h-[85vh]">
				<Image
					src={desktopImg}
					format="auto"
					alt="Kitesurfing hero image"
					width={1920}
					height={1080}
					loading="eager"
					fetchpriority="high"
					decoding="sync"
					class="w-full h-full object-cover"
				/>
				<div class="absolute inset-0 flex items-center">
					<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center">
						<div class="max-w-xl" data-aos="fade-left">
							<h1 class="text-6xl font-bold text-white mb-6 flex justify-center">{$localize`Ride the Waves`}</h1>
							<p class="text-4xl font-bold text-white mb-8 flex justify-center">{$localize`Enjoy the Wind`}</p>
							<div class="flex justify-center gap-4 ">
								<nav class="hidden md:flex flex-row-reverse gap-8">
									{rootCollections.map((collection) => (
										<LocalizedLink
											class="border-2 border-white font-semibold text-white hover:bg-white/10 px-12 py-4 rounded-full transition-all duration-300"
											href={`/collections/${collection.slug}`}
											key={collection.id}
										>
											{collection.name}
										</LocalizedLink>
									))}
								</nav>

								{/*<LocalizedLink
									href="/shop"
									class="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full transition-all duration-300"
								>
									{$localize`Shop Now`}
								</LocalizedLink>
								<button class="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full transition-all duration-300">
									{$localize`Watch Demo`}
								</button>*/}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Features Bar */}
			<div class="bg-gray-50 border-y border-gray-200">
				<div class="max-w-7xl mx-auto px-4 py-6">
					<div class="flex flex-wrap gap-5 justify-center">
						<div class="flex items-center gap-3 p-4 border rounded-lg shadow-md">
							<span class="text-2xl">🚚</span>
							<div>
								<h3 class="font-semibold">{$localize`Free Shipping`}</h3>
								<p class="text-sm text-gray-600">{$localize`On orders over €500`}</p>
							</div>
						</div>

						<div class="flex items-center gap-3 p-4 border rounded-lg shadow-md">
							<span class="text-2xl">🔄</span>
							<div>
								<h3 class="font-semibold">{$localize`30-Day Returns`}</h3>
								<p class="text-sm text-gray-600">{$localize`No questions asked`}</p>
							</div>
						</div>

						<div class="flex items-center gap-3 p-4 border rounded-lg shadow-md">
							<span class="text-2xl">🛡️</span>
							<div>
								<h3 class="font-semibold">{$localize`2-Year Warranty`}</h3>
								<p class="text-sm text-gray-600">{$localize`On all equipment`}</p>
							</div>
						</div>

						<div class="flex items-center gap-3 p-4 border rounded-lg shadow-md">
							<span class="text-2xl">💬</span>
							<div>
								<h3 class="font-semibold">{$localize`Expert Support`}</h3>
								<p class="text-sm text-gray-600">{$localize`24/7 chat available`}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Achievement Numbers */}

			{/* Featured Collections */}
			<section class="pt-16 pb-16 md:pb-24 xl:max-w-7xl xl:mx-auto xl:px-8">
				<div class="mb-12">
					<h2 class="text-3xl font-bold text-gray-900 text-center mb-4">
						{$localize`Shop by Category`}
					</h2>
					<p class="text-gray-600 text-center max-w-2xl mx-auto">
						{$localize`Discover our curated collection of premium water sports equipment`}
					</p>
				</div>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 px-4 xl:px-0">
					{collections.map((collection, index) =>
						collection.featuredAsset ? (
							<div key={collection.id} data-aos="fade-up" data-aos-delay={index * 100}>
								<CollectionCard collection={collection} />
							</div>
						) : null
					)}
				</div>
			</section>

			<div class="bg-gradient-to-r from-lime-500 to-blue-600 py-16">
				<div class="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
					{[
						{ number: translations.achievements.customers, label: $localize`Happy Customers` },
						{ number: translations.achievements.experience, label: $localize`Years Experience` },
						{ number: translations.achievements.products, label: $localize`Products` },
						{ number: translations.achievements.locations, label: $localize`Shipping Locations` },
					].map((stat, index) => (
						<div key={index} class="space-y-3" data-aos="fade-up" data-aos-delay={index * 100}>
							<div class="text-5xl font-bold">{stat.number}</div>
							<div class="text-lg opacity-90">{stat.label}</div>
						</div>
					))}
				</div>
			</div>
			{/* Featured Products */}
			<section class="py-16 bg-gray-50" data-aos="fade-up">
				<div class="max-w-7xl mx-auto px-4">
					<h2 class="text-3xl font-bold text-center mb-4">{$localize`Featured Equipment`}</h2>
					<p class="text-gray-600 text-center max-w-2xl mx-auto mb-12">
						{$localize`Handpicked selection of our best-selling premium gear`}
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
						{products.slice(0, 3).map(
							(
								product: {
									id: string | number | null | undefined;
									featuredAsset: { preview: any };
									name:
										| string
										| number
										| boolean
										| Function
										| RegExp
										| JSXChildren[]
										| Promise<JSXChildren>
										| Signal<JSXChildren>
										| JSXNode<unknown>
										| null
										| undefined;
									description:
										| string
										| number
										| boolean
										| Function
										| RegExp
										| JSXChildren[]
										| Promise<JSXChildren>
										| Signal<JSXChildren>
										| JSXNode<unknown>
										| null
										| undefined;
									price:
										| string
										| number
										| boolean
										| Function
										| RegExp
										| JSXChildren[]
										| Promise<JSXChildren>
										| Signal<JSXChildren>
										| JSXNode<unknown>
										| null
										| undefined;
								},
								index: number
							) => (
								<div
									key={product.id}
									class="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
									data-aos="fade-up"
									data-aos-delay={index * 100}
								>
									<div class="relative">
										<Image
											src={product.featuredAsset?.preview || desktopImg}
											alt={product.name}
											width="600"
											height="400"
											class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
										/>
										<div class="absolute top-4 right-4">
											<span class="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">New</span>
										</div>
									</div>
									<div class="p-6">
										<div class="flex justify-between items-start mb-4">
											<div>
												<h3 class="text-xl font-semibold mb-2">{product.name}</h3>
												<p class="text-gray-600">{product.description}</p>
											</div>
											<span class="text-2xl font-bold text-blue-600">€{product.price}</span>
										</div>
										<button class="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
											{$localize`Add to Cart`}
										</button>
									</div>
								</div>
							)
						)}
					</div>
					<div class="text-center mt-8">
						<LocalizedLink
							href="/shop"
							class="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
						>
							{$localize`View All Products`}
						</LocalizedLink>
					</div>
				</div>
			</section>

			{/* Trust Badges */}

			<div class="bg-gray-50 border-y border-gray-200">
				<div class="max-w-7xl mx-auto px-4 py-6">
					<div class="flex flex-wrap gap-5 justify-center">
						<div class="flex items-center gap-3">
							<span class="text-2xl">🔒</span>
							<div>
								<h3 class="font-semibold">{$localize`Secure Payment`}</h3>
								<p class="text-sm text-gray-600">{$localize`SSL encrypted checkout`}</p>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<span class="text-2xl">⚡</span>
							<div>
								<h3 class="font-semibold">{$localize`Fast Delivery`}</h3>
								<p class="text-sm text-gray-600">{$localize`2-4 business days`}</p>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<span class="text-2xl">✨</span>
							<div>
								<h3 class="font-semibold">{$localize`Quality Assured`}</h3>
								<p class="text-sm text-gray-600">{$localize`All products certified`}</p>
							</div>
						</div>

						<div class="flex items-center gap-3">
							<span class="text-2xl">🌍</span>
							<div>
								<h3 class="font-semibold">{$localize`Global Shipping`}</h3>
								<p class="text-sm text-gray-600">{$localize`Worldwide delivery`}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/*			<section class="py-12 bg-white">
				<div class="max-w-7xl mx-auto px-4">
					<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
						{trustBadges.map((badge, index) => (
							<div key={index} class="flex flex-col items-center text-center">
								<span class="text-3xl mb-3">{badge.icon}</span>
								<h3 class="font-semibold mb-1">{badge.title}</h3>
								<p class="text-sm text-gray-600">{badge.text}</p>
							</div>
						))}
					</div>
				</div>
			</section> */}

			{/* Video Section */}
			<section class="py-16 bg-gray-50">
				<div class="max-w-7xl mx-auto px-4">
					<div class="grid md:grid-cols-2 gap-12 items-center">
						<div class="space-y-6" data-aos="fade-right">
							<h2 class="text-3xl font-bold">{$localize`Master Your Technique`}</h2>
							<p class="text-gray-600">
								{$localize`Watch our expert tutorials and learn from professional riders`}
							</p>
							<ul class="space-y-4">
								<li class="flex items-center gap-3">
									<span class="w-6 h-6 rounded-full bg-lime-500 flex items-center justify-center text-white">
										✓
									</span>
									<span>{$localize`Professional tutorials`}</span>
								</li>
								<li class="flex items-center gap-3">
									<span class="w-6 h-6 rounded-full bg-lime-500 flex items-center justify-center text-white">
										✓
									</span>
									<span>{$localize`Equipment guides`}</span>
								</li>
								<li class="flex items-center gap-3">
									<span class="w-6 h-6 rounded-full bg-lime-500 flex items-center justify-center text-white">
										✓
									</span>
									<span>{$localize`Safety tips`}</span>
								</li>
							</ul>
							<button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
								{$localize`Watch Tutorials`}
							</button>
						</div>
						<div
							class="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg"
							data-aos="fade-left"
						>
							<Image
								src={desktopImg}
								alt={$localize`Tutorial video`}
								width="1920"
								height="1080"
								class="w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section class="py-16 bg-gradient-to-br from-lime-50 to-blue-50" data-aos="fade-up">
				<div class="max-w-7xl mx-auto px-4">
					<h2 class="text-3xl font-bold text-center mb-4">{$localize`What Our Riders Say`}</h2>
					<p class="text-gray-600 text-center max-w-2xl mx-auto mb-12">
						{$localize`Hear from our community of passionate riders`}
					</p>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[
							{
								name: 'Sarah Johnson',
								role: $localize`Professional Kitesurfer`,
								quote: $localize`The quality of equipment from All For Wind is unmatched. Their expert advice helped me choose the perfect kit.`,
								image: desktopImg,
							},
							{
								name: 'Mike Thompson',
								role: $localize`Windfoiling Enthusiast`,
								quote: $localize`Outstanding selection of windfoiling gear. The customer service team really knows their stuff!`,
								image: desktopImg,
							},
							{
								name: 'Lisa Chen',
								role: $localize`Kite Instructor`,
								quote: $localize`I recommend All For Wind to all my students. Their beginner-friendly equipment is top-notch.`,
								image: desktopImg,
							},
						].map((testimonial, index) => (
							<div
								key={index}
								class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
								data-aos="fade-up"
								data-aos-delay={index * 100}
							>
								<div class="flex items-center mb-6">
									<Image
										src={testimonial.image}
										alt={testimonial.name}
										width="64"
										height="64"
										class="w-16 h-16 rounded-full object-cover mr-4 border-2 border-lime-500"
									/>
									<div>
										<h3 class="font-semibold text-lg">{testimonial.name}</h3>
										<p class="text-blue-600">{testimonial.role}</p>
									</div>
								</div>
								<p class="text-gray-700 italic text-lg leading-relaxed">{testimonial.quote}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Call to Action */}
			<section class="py-16 bg-blue-600">
				<div class="max-w-7xl mx-auto px-4 text-center">
					<h2 class="text-3xl font-bold text-white mb-4">{$localize`Ready to Start Your Journey?`}</h2>
					<p class="text-white/90 mb-8 text-lg">
						{$localize`Get expert guidance and premium equipment for your water sports adventure`}
					</p>
					<div class="flex justify-center gap-4">
						<LocalizedLink
							href="/shop"
							class="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
						>
							{$localize`Shop Equipment`}
						</LocalizedLink>
						<button class="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
							{$localize`Contact Us`}
						</button>
					</div>
				</div>
			</section>

			{/* Newsletter */}
			<section class="py-20 bg-gradient-to-r from-lime-600 to-blue-600" data-aos="fade-up">
				<div class="max-w-7xl mx-auto px-4 text-center">
					<h2 class="text-4xl font-bold mb-4 text-white">{$localize`Stay Updated`}</h2>
					<p class="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
						{$localize`Subscribe to our newsletter for the latest gear updates and special offers`}
					</p>
					<div class="max-w-md mx-auto">
						<div class="flex gap-4 mb-4">
							<input
								type="email"
								placeholder={$localize`Enter your email`}
								class="flex-1 px-6 py-3 rounded-full text-gray-900 focus:ring-2 focus:ring-lime-300 outline-none text-lg"
							/>
							{/* <button class="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full transition-colors duration-300 font-semibold text-lg">
								{$localize`Subscribe`}
							</button> */}
						</div>
						<p class="text-white/80 text-sm">{$localize`We respect your privacy. Unsubscribe at any time.`}</p>
					</div>
				</div>
			</section>

			{/* Trust Badges */}
		</div>
	);
});
