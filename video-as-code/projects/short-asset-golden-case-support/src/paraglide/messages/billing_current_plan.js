/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Current_PlanInputs */

const en_billing_current_plan = /** @type {(inputs: Billing_Current_PlanInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current plan`)
};

const zh_billing_current_plan = /** @type {(inputs: Billing_Current_PlanInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前套餐`)
};

/**
* | output |
* | --- |
* | "Current plan" |
*
* @param {Billing_Current_PlanInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_current_plan = /** @type {((inputs?: Billing_Current_PlanInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Current_PlanInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_current_plan(inputs)
	return zh_billing_current_plan(inputs)
});