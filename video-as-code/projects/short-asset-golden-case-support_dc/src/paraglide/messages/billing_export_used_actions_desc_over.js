/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Used_Actions_Desc_OverInputs */

const en_billing_export_used_actions_desc_over = /** @type {(inputs: Billing_Export_Used_Actions_Desc_OverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exceeded the included quota`)
};

const zh_billing_export_used_actions_desc_over = /** @type {(inputs: Billing_Export_Used_Actions_Desc_OverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已超出 included 配额`)
};

/**
* | output |
* | --- |
* | "Exceeded the included quota" |
*
* @param {Billing_Export_Used_Actions_Desc_OverInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_used_actions_desc_over = /** @type {((inputs?: Billing_Export_Used_Actions_Desc_OverInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Used_Actions_Desc_OverInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_used_actions_desc_over(inputs)
	return zh_billing_export_used_actions_desc_over(inputs)
});