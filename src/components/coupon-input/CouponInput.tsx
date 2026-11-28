import { _ } from 'compiled-i18n';
import { $, component$, useContext, useSignal, useVisibleTask$ } from '@qwik.dev/core';
import { APP_STATE } from '~/constants';
import { Order } from '~/generated/graphql';
import { applyCouponCodeMutation } from '~/providers/shop/orders/order';
import { getPartner } from '~/config/partners';
import Alert from '../alert/Alert';
import Success from '../success/Success';

export default component$(() => {
	const appState = useContext(APP_STATE);
	const couponCodeSignal = useSignal('');
	const errorSignal = useSignal('');
	const successSignal = useSignal('');
	const partnerCouponSignal = useSignal('');
	const partnerNameSignal = useSignal('');
	// Translated label as a plain variable — the i18n tag cannot be transformed
	// reliably in JSX child position under the Qwik rc optimizer (key arrives
	// as a template literal, which the i18n plugin cannot parse).
	const applyLabel = _`Apply`;

	useVisibleTask$(() => {
		const match = document.cookie.match(/(?:^|;\s*)afw_partner=([^;]+)/);
		if (match && match[1]) {
			const partner = getPartner(match[1]);
			if (partner) {
				partnerCouponSignal.value = partner.couponCode;
				partnerNameSignal.value = partner.name;
			}
		}
	});

	const applyCoupon = $(async (codeToApply?: string) => {
		const code = codeToApply || couponCodeSignal.value;
		if (code) {
			successSignal.value = '';
			errorSignal.value = '';
			const res = await applyCouponCodeMutation(code);
			if (res.__typename == 'Order') {
				appState.activeOrder = res as Order;
				successSignal.value = _`Coupon code successfully applied`;
				couponCodeSignal.value = '';
			} else {
				errorSignal.value = res.message;
			}
		}
	});

	const isPartnerCouponApplied = appState.activeOrder?.couponCodes?.includes(
		partnerCouponSignal.value
	);

	return (
		<>
			{!!errorSignal.value && <Alert message={errorSignal.value} />}
			{!!successSignal.value && <Success message={successSignal.value} />}
			<div class="w-full py-2 mb-4">
				{partnerCouponSignal.value && !isPartnerCouponApplied && (
					<div class="mb-3 p-2.5 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-between text-xs">
						<span class="text-sky-900">
							🏄‍♂️ <strong>{partnerNameSignal.value}</strong> Schülervorteil verfügbar:
						</span>
						<button
							type="button"
							onClick$={() => applyCoupon(partnerCouponSignal.value)}
							class="px-2.5 py-1 rounded bg-sky-700 hover:bg-sky-800 text-white font-bold transition-colors shadow-xs"
						>
							{partnerCouponSignal.value} anwenden (-10 %)
						</button>
					</div>
				)}

				<form preventdefault:submit onSubmit$={() => applyCoupon()}>
					<div class="flex gap-2">
						<input
							type="text"
							placeholder={_`Enter a coupon code`}
							value={couponCodeSignal.value}
							onInput$={(_, el) => (couponCodeSignal.value = el.value)}
							class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
							required
						/>
						<button class="btn-primary max-w-24">{applyLabel}</button>
					</div>
				</form>
			</div>
		</>
	);
});
