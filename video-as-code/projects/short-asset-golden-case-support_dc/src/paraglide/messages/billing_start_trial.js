/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Start_TrialInputs */

const en_billing_start_trial = /** @type {(inputs: Billing_Start_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start trial`)
};

const zh_billing_start_trial = /** @type {(inputs: Billing_Start_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开始试用`)
};

/**
* | output |
* | --- |
* | "Start trial" |
*
* @param {Billing_Start_TrialInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_start_trial = /** @type {((inputs?: Billing_Start_TrialInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Start_TrialInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_start_trial(inputs)
	return zh_billing_start_trial(inputs)
});