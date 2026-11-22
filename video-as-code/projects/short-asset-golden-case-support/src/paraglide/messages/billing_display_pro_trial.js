/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Display_Pro_TrialInputs */

const en_billing_display_pro_trial = /** @type {(inputs: Billing_Display_Pro_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro trial`)
};

const zh_billing_display_pro_trial = /** @type {(inputs: Billing_Display_Pro_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro 试用中`)
};

/**
* | output |
* | --- |
* | "Pro trial" |
*
* @param {Billing_Display_Pro_TrialInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_pro_trial = /** @type {((inputs?: Billing_Display_Pro_TrialInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Pro_TrialInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_display_pro_trial(inputs)
	return zh_billing_display_pro_trial(inputs)
});