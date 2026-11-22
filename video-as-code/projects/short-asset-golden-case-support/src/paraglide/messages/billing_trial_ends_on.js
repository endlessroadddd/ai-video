/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ date: NonNullable<unknown> }} Billing_Trial_Ends_OnInputs */

const en_billing_trial_ends_on = /** @type {(inputs: Billing_Trial_Ends_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Trial ends on ${i?.date}`)
};

const zh_billing_trial_ends_on = /** @type {(inputs: Billing_Trial_Ends_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`试用将于 ${i?.date} 结束`)
};

/**
* | output |
* | --- |
* | "Trial ends on {date}" |
*
* @param {Billing_Trial_Ends_OnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_trial_ends_on = /** @type {((inputs: Billing_Trial_Ends_OnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Trial_Ends_OnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_trial_ends_on(inputs)
	return zh_billing_trial_ends_on(inputs)
});