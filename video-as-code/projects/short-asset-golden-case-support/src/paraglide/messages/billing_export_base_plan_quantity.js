/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Base_Plan_QuantityInputs */

const en_billing_export_base_plan_quantity = /** @type {(inputs: Billing_Export_Base_Plan_QuantityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1 plan`)
};

const zh_billing_export_base_plan_quantity = /** @type {(inputs: Billing_Export_Base_Plan_QuantityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`1 套`)
};

/**
* | output |
* | --- |
* | "1 plan" |
*
* @param {Billing_Export_Base_Plan_QuantityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_base_plan_quantity = /** @type {((inputs?: Billing_Export_Base_Plan_QuantityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Base_Plan_QuantityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_base_plan_quantity(inputs)
	return zh_billing_export_base_plan_quantity(inputs)
});