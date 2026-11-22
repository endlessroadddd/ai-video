/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Current_PeriodInputs */

const en_billing_current_period = /** @type {(inputs: Billing_Current_PeriodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current billing period`)
};

const zh_billing_current_period = /** @type {(inputs: Billing_Current_PeriodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期`)
};

/**
* | output |
* | --- |
* | "Current billing period" |
*
* @param {Billing_Current_PeriodInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_current_period = /** @type {((inputs?: Billing_Current_PeriodInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Current_PeriodInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_current_period(inputs)
	return zh_billing_current_period(inputs)
});