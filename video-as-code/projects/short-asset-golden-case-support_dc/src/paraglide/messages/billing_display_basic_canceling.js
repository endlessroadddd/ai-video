/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Display_Basic_CancelingInputs */

const en_billing_display_basic_canceling = /** @type {(inputs: Billing_Display_Basic_CancelingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic set to cancel`)
};

const zh_billing_display_basic_canceling = /** @type {(inputs: Billing_Display_Basic_CancelingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic 已设为到期取消`)
};

/**
* | output |
* | --- |
* | "Basic set to cancel" |
*
* @param {Billing_Display_Basic_CancelingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_basic_canceling = /** @type {((inputs?: Billing_Display_Basic_CancelingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Basic_CancelingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_display_basic_canceling(inputs)
	return zh_billing_display_basic_canceling(inputs)
});