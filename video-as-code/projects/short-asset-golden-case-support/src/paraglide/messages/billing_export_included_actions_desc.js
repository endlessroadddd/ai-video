/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Included_Actions_DescInputs */

const en_billing_export_included_actions_desc = /** @type {(inputs: Billing_Export_Included_Actions_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quota included in the current billing period`)
};

const zh_billing_export_included_actions_desc = /** @type {(inputs: Billing_Export_Included_Actions_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期套餐内含额度`)
};

/**
* | output |
* | --- |
* | "Quota included in the current billing period" |
*
* @param {Billing_Export_Included_Actions_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_included_actions_desc = /** @type {((inputs?: Billing_Export_Included_Actions_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Included_Actions_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_included_actions_desc(inputs)
	return zh_billing_export_included_actions_desc(inputs)
});