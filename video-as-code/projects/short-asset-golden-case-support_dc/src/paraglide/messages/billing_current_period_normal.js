/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Current_Period_NormalInputs */

const en_billing_current_period_normal = /** @type {(inputs: Billing_Current_Period_NormalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current billing period is normal`)
};

const zh_billing_current_period_normal = /** @type {(inputs: Billing_Current_Period_NormalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期正常`)
};

/**
* | output |
* | --- |
* | "Current billing period is normal" |
*
* @param {Billing_Current_Period_NormalInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_current_period_normal = /** @type {((inputs?: Billing_Current_Period_NormalInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Current_Period_NormalInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_current_period_normal(inputs)
	return zh_billing_current_period_normal(inputs)
});