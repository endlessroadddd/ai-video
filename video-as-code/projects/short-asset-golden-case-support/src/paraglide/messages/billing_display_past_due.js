/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Display_Past_DueInputs */

const en_billing_display_past_due = /** @type {(inputs: Billing_Display_Past_DueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Payment issue`)
};

const zh_billing_display_past_due = /** @type {(inputs: Billing_Display_Past_DueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`支付异常`)
};

/**
* | output |
* | --- |
* | "Payment issue" |
*
* @param {Billing_Display_Past_DueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_past_due = /** @type {((inputs?: Billing_Display_Past_DueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Past_DueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_display_past_due(inputs)
	return zh_billing_display_past_due(inputs)
});