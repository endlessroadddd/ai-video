/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Plan_Name_FreeInputs */

const en_billing_plan_name_free = /** @type {(inputs: Billing_Plan_Name_FreeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Free`)
};

const zh_billing_plan_name_free = /** @type {(inputs: Billing_Plan_Name_FreeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`免费版`)
};

/**
* | output |
* | --- |
* | "Free" |
*
* @param {Billing_Plan_Name_FreeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_plan_name_free = /** @type {((inputs?: Billing_Plan_Name_FreeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Plan_Name_FreeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_plan_name_free(inputs)
	return zh_billing_plan_name_free(inputs)
});