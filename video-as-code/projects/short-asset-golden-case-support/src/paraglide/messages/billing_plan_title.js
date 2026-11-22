/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Plan_TitleInputs */

const en_billing_plan_title = /** @type {(inputs: Billing_Plan_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plan`)
};

const zh_billing_plan_title = /** @type {(inputs: Billing_Plan_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`套餐`)
};

/**
* | output |
* | --- |
* | "Plan" |
*
* @param {Billing_Plan_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_plan_title = /** @type {((inputs?: Billing_Plan_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Plan_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_plan_title(inputs)
	return zh_billing_plan_title(inputs)
});