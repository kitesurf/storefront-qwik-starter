import { $, component$, QRL } from '@qwik.dev/core';
import { _ } from 'compiled-i18n';
import { FacetWithValues } from '~/types';
import CloseIcon from '../icons/CloseIcon';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';

export default component$<{
	showMenu: boolean;
	facetsWithValues: FacetWithValues[];
	onToggleMenu$: QRL<() => void>;
	onFilterChange$: QRL<(id: string) => void>;
	onOpenCloseFilter$: QRL<(id: string) => void>;
}>(
	({
		showMenu = false,
		facetsWithValues: _facetsWithValues,
		onToggleMenu$,
		onFilterChange$,
		onOpenCloseFilter$,
	}) => {
		return (
			<div>
				{/* Desktop Filters Sidebar */}
				<div class="hidden lg:block bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
					<div class="pb-3 mb-2 border-b border-white/10 flex items-center justify-between">
						<span class="text-xs font-bold uppercase tracking-wider text-cyan-400">
							{_`Filters`}
						</span>
					</div>
					{_facetsWithValues.map((facet: FacetWithValues) => (
						<div key={facet.id} class="border-b border-white/10 last:border-b-0 py-4">
							<h3 class="-my-2 flow-root">
								<button
									class="py-2 bg-transparent w-full flex items-center justify-between text-sm text-slate-200 hover:text-cyan-300 transition-colors cursor-pointer"
									type="button"
									onClick$={() => {
										onOpenCloseFilter$(facet.id);
									}}
								>
									<span class="font-bold text-white uppercase text-xs tracking-wider">
										{facet.name}
									</span>
									<span class="ml-6 flex items-center text-cyan-400">
										{facet.open ? <MinusIcon /> : <PlusIcon />}
									</span>
								</button>
							</h3>
							{facet.open && (
								<div class="pt-4 pb-1">
									<div class="space-y-3">
										{facet.values.map((value) => (
											<div key={value.id} class="flex items-center cursor-pointer group">
												<label class="text-sm text-slate-300 group-hover:text-white flex items-center cursor-pointer select-none">
													<input
														class="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-slate-900 accent-cyan-400 cursor-pointer"
														type="checkbox"
														checked={value.selected}
														onClick$={() => onFilterChange$(value.id)}
													/>
													<span class="ml-3 group-hover:text-cyan-200 transition-colors">
														{value.name}
													</span>
												</label>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
					))}
				</div>

				{/* Mobile Filter Drawer */}
				{showMenu && (
					<div class="relative z-50 lg:hidden">
						<div
							class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
							onClick$={$(async () => {
								onToggleMenu$();
							})}
						/>
						<div class="fixed inset-0 flex z-50 justify-end">
							<div class="relative max-w-xs w-full h-full bg-slate-950/95 backdrop-blur-xl border-l border-white/15 shadow-2xl py-6 pb-12 flex flex-col overflow-y-auto">
								<div class="px-6 flex items-center justify-between border-b border-white/10 pb-4">
									<div class="flex items-center space-x-2">
										<span class="w-2 h-2 rounded-full bg-cyan-400" />
										<h2 class="text-lg font-bold text-white">{_`Filters`}</h2>
									</div>
									<button
										type="button"
										class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
										onClick$={$(async () => {
											onToggleMenu$();
										})}
									>
										<span class="sr-only">Close menu</span>
										<CloseIcon />
									</button>
								</div>
								<div class="mt-4 px-6 space-y-6">
									{_facetsWithValues.map((facet) => (
										<div key={facet.id} class="border-b border-white/10 pb-4">
											<button
												class="w-full flex items-center justify-between text-left py-2 text-white hover:text-cyan-300 transition-colors"
												type="button"
												onClick$={() => {
													onOpenCloseFilter$(facet.id);
												}}
											>
												<span class="font-bold text-sm uppercase tracking-wider text-slate-200">
													{facet.name}
												</span>
												<span class="text-cyan-400">
													{facet.open ? <MinusIcon /> : <PlusIcon />}
												</span>
											</button>
											{facet.open && (
												<div class="pt-3 space-y-3">
													{facet.values.map((value) => (
														<div key={value.id} class="flex items-center cursor-pointer">
															<input
																class="h-4 w-4 rounded border-slate-700 bg-slate-800 text-cyan-400 focus:ring-cyan-400 focus:ring-offset-slate-900 accent-cyan-400 cursor-pointer"
																type="checkbox"
																checked={value.selected}
																onClick$={() => onFilterChange$(value.id)}
															/>
															<label class="ml-3 text-sm text-slate-300 hover:text-white cursor-pointer">
																{value.name}
															</label>
														</div>
													))}
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
);
