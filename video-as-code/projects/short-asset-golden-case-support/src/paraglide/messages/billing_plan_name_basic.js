/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Plan_Name_BasicInputs */

const en_billing_plan_name_basic = /** @type {(inputs: Billing_Plan_Name_BasicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic`)
};

const zh_billing_plan_name_basic = /** @type {(inputs: Billing_Plan_Name_BasicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic`)
};

/**
* | output |
* | --- |
* | "Basic" |
*
* @param {Billing_Plan_Name_BasicInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_plan_name_basic = /** @type {((inputs?: Billing_Plan_Name_BasicInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Plan_Name_BasicInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_plan_name_basic(inputs)
	return zh_billing_plan_name_basic(inputs)
});