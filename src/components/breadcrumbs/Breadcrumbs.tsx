import { component$ } from '@qwik.dev/core';
import HomeIcon from '../icons/HomeIcon';
import SlashIcon from '../icons/SlashIcon';

export default component$<{
	items: { name: string; slug: string; id: string }[];
	darkMode?: boolean;
}>(({ items, darkMode = false }) => {
	return (
		<nav class="flex py-2">
			<ol class="flex items-center space-x-1 md:space-x-2 text-xs md:text-sm">
				<li>
					<div>
						<a
							href="/"
							class={
								darkMode
									? 'text-slate-400 hover:text-cyan-300 transition-colors flex items-center'
									: 'text-gray-600 hover:text-gray-900 flex items-center'
							}
						>
							<HomeIcon />
							<span class="sr-only">Home</span>
						</a>
					</div>
				</li>
				{items
					.filter((item) => item.name !== '__root_collection__')
					.map((item, idx, arr) => {
						const isLast = idx === arr.length - 1;
						return (
							<li key={item.name}>
								<div class="flex items-center">
									<span class={darkMode ? 'text-slate-600' : 'text-gray-400'}>
										<SlashIcon />
									</span>
									<a
										href={`/collections/${item.slug}`}
										class={`ml-1 md:ml-2 font-medium transition-colors ${
											darkMode
												? isLast
													? 'text-cyan-300 font-semibold'
													: 'text-slate-300 hover:text-cyan-300'
												: isLast
													? 'text-gray-900 font-semibold'
													: 'text-gray-600 hover:text-gray-900'
										}`}
									>
										{item.name}
									</a>
								</div>
							</li>
						);
					})}
			</ol>
		</nav>
	);
});
