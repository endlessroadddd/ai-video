/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Display_Pro_CancelingInputs */

const en_billing_display_pro_canceling = /** @type {(inputs: Billing_Display_Pro_CancelingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro set to cancel`)
};

const zh_billing_display_pro_canceling = /** @type {(inputs: Billing_Display_Pro_CancelingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro 已设为到期取消`)
};

/**
* | output |
* | --- |
* | "Pro set to cancel" |
*
* @param {Billing_Display_Pro_CancelingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_pro_canceling = /** @type {((inputs?: Billing_Display_Pro_CancelingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Pro_CancelingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_display_pro_canceling(inputs)
	return zh_billing_display_pro_canceling(inputs)
});