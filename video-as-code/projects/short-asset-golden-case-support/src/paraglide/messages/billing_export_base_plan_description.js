/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ planName: NonNullable<unknown> }} Billing_Export_Base_Plan_DescriptionInputs */

const en_billing_export_base_plan_description = /** @type {(inputs: Billing_Export_Base_Plan_DescriptionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.planName} monthly fee`)
};

const zh_billing_export_base_plan_description = /** @type {(inputs: Billing_Export_Base_Plan_DescriptionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.planName} 月费`)
};

/**
* | output |
* | --- |
* | "{planName} monthly fee" |
*
* @param {Billing_Export_Base_Plan_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_base_plan_description = /** @type {((inputs: Billing_Export_Base_Plan_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Base_Plan_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_base_plan_description(inputs)
	return zh_billing_export_base_plan_description(inputs)
});