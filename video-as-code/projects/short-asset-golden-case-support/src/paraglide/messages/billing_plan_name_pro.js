/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Plan_Name_ProInputs */

const en_billing_plan_name_pro = /** @type {(inputs: Billing_Plan_Name_ProInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro`)
};

const zh_billing_plan_name_pro = /** @type {(inputs: Billing_Plan_Name_ProInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro`)
};

/**
* | output |
* | --- |
* | "Pro" |
*
* @param {Billing_Plan_Name_ProInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_plan_name_pro = /** @type {((inputs?: Billing_Plan_Name_ProInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Plan_Name_ProInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_plan_name_pro(inputs)
	return zh_billing_plan_name_pro(inputs)
});