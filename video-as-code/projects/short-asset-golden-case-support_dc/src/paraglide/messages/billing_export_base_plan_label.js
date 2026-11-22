/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Base_Plan_LabelInputs */

const en_billing_export_base_plan_label = /** @type {(inputs: Billing_Export_Base_Plan_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Base plan`)
};

const zh_billing_export_base_plan_label = /** @type {(inputs: Billing_Export_Base_Plan_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`基础套餐`)
};

/**
* | output |
* | --- |
* | "Base plan" |
*
* @param {Billing_Export_Base_Plan_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_base_plan_label = /** @type {((inputs?: Billing_Export_Base_Plan_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Base_Plan_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_base_plan_label(inputs)
	return zh_billing_export_base_plan_label(inputs)
});