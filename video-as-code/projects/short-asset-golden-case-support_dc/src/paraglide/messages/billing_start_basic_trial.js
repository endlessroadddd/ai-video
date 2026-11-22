/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Start_Basic_TrialInputs */

const en_billing_start_basic_trial = /** @type {(inputs: Billing_Start_Basic_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start Basic trial`)
};

const zh_billing_start_basic_trial = /** @type {(inputs: Billing_Start_Basic_TrialInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开始 Basic 试用`)
};

/**
* | output |
* | --- |
* | "Start Basic trial" |
*
* @param {Billing_Start_Basic_TrialInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_start_basic_trial = /** @type {((inputs?: Billing_Start_Basic_TrialInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Start_Basic_TrialInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_start_basic_trial(inputs)
	return zh_billing_start_basic_trial(inputs)
});