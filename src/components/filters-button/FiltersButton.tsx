import { $, component$, QRL } from '@qwik.dev/core';
import { _ } from 'compiled-i18n';
import FilterIcon from '../icons/FilterIcon';

export default component$<{ onToggleMenu$: QRL<() => void> }>(({ onToggleMenu$ }) => {
	return (
		<button
			type="button"
			class="flex space-x-2 items-center px-4 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-semibold transition-all shadow-sm hover:border-cyan-300 cursor-pointer lg:hidden"
			onClick$={$(async () => {
				onToggleMenu$();
			})}
		>
			<span class="text-slate-200">{_`Filters`}</span>
			<span class="text-cyan-300">
				<FilterIcon />
			</span>
		</button>
	);
});
