/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Csv_PlanInputs */

const en_billing_export_csv_plan = /** @type {(inputs: Billing_Export_Csv_PlanInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plan`)
};

const zh_billing_export_csv_plan = /** @type {(inputs: Billing_Export_Csv_PlanInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`套餐`)
};

/**
* | output |
* | --- |
* | "Plan" |
*
* @param {Billing_Export_Csv_PlanInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_plan = /** @type {((inputs?: Billing_Export_Csv_PlanInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_PlanInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_csv_plan(inputs)
	return zh_billing_export_csv_plan(inputs)
});