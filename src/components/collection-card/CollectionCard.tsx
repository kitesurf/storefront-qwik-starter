import { component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';
import { LocalizedLink } from '~/components/LocalizedLink';
import { Collection } from '~/generated/graphql';

interface CollectionCardProps {
	collection: Collection;
}

export default component$<CollectionCardProps>(({ collection }) => {
	if (!collection) return null;

	return (
		<LocalizedLink href={`/collections/${collection.slug}`} key={collection.id} class="block">
			<div class="group relative mx-auto max-w-[300px]">
				<div class="aspect-square w-full overflow-hidden">
					<Image
						layout="fixed"
						width={300}
						height={300}
						src={collection.featuredAsset?.preview}
						alt={collection.name}
						class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
						loading="lazy"
					/>
				</div>

				<div class="mt-4">
					<h3 class="font-helvetica text-xl font-bold tracking-tight text-neutral-900">
						{collection.name}
					</h3>
					<div class="mt-1 flex items-center justify-between">
						<p class="text-sm font-medium text-neutral-500">{$localize`browse`}</p>
						<svg
							class="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</div>
				</div>
			</div>
		</LocalizedLink>
	);
});

// import { component$ } from '@builder.io/qwik';

// import { Image } from "@unpic/qwik";
// import { LocalizedLink } from '~/components/LocalizedLink';
// import { Collection } from '~/generated/graphql';
// interface IProps {
// 	collection: Collection;
// }

// export default component$(({ collection }: IProps) => {
// 	return (
// 		<LocalizedLink href={`/collections/${collection.slug}`} key={collection.id}>
// 			<div class="max-w-[300px] relative rounded-lg overflow-hidden hover:opacity-75 xl:w-auto mx-auto">
// 				<div class="w-full h-full object-center object-cover">
// 					<Image
// 						layout="fixed"
// 						width="300"
// 						height="300"
// 						src={collection.featuredAsset?.preview}
// 						alt={collection.name}
// 					/>
// 				</div>
// 				<span class="absolute w-full bottom-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
// 				<span class="absolute w-full bottom-2 mt-auto text-center text-xl font-bold text-white">
// 					{collection.name}
// 				</span>
// 			</div>
// 		</LocalizedLink>
// 	);
// });
