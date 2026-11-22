/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Used_Actions_Desc_IncludedInputs */

const en_billing_export_used_actions_desc_included = /** @type {(inputs: Billing_Export_Used_Actions_Desc_IncludedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Still within the included quota`)
};

const zh_billing_export_used_actions_desc_included = /** @type {(inputs: Billing_Export_Used_Actions_Desc_IncludedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前仍在 included 配额范围内`)
};

/**
* | output |
* | --- |
* | "Still within the included quota" |
*
* @param {Billing_Export_Used_Actions_Desc_IncludedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_used_actions_desc_included = /** @type {((inputs?: Billing_Export_Used_Actions_Desc_IncludedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Used_Actions_Desc_IncludedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_used_actions_desc_included(inputs)
	return zh_billing_export_used_actions_desc_included(inputs)
});