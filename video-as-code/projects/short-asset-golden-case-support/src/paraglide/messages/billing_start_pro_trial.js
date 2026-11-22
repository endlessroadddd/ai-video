/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Start_Pro_TrialInputs */

const en_billing_start_pro_trial = /** @type {(inputs: Billing_Start_Pro_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start Pro trial`)
};

const zh_billing_start_pro_trial = /** @type {(inputs: Billing_Start_Pro_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开始 Pro 试用`)
};

/**
* | output |
* | --- |
* | "Start Pro trial" |
*
* @param {Billing_Start_Pro_TrialInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_start_pro_trial = /** @type {((inputs?: Billing_Start_Pro_TrialInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Start_Pro_TrialInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_start_pro_trial(inputs)
	return zh_billing_start_pro_trial(inputs)
});