/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ mode: NonNullable<unknown> }} Billing_Export_Overage_Actions_DescInputs */

const en_billing_export_overage_actions_desc = /** @type {(inputs: Billing_Export_Overage_Actions_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Billed under the ${i?.mode} policy`)
};

const zh_billing_export_overage_actions_desc = /** @type {(inputs: Billing_Export_Overage_Actions_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`按 ${i?.mode} 规则计费`)
};

/**
* | output |
* | --- |
* | "Billed under the {mode} policy" |
*
* @param {Billing_Export_Overage_Actions_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_overage_actions_desc = /** @type {((inputs: Billing_Export_Overage_Actions_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Overage_Actions_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_overage_actions_desc(inputs)
	return zh_billing_export_overage_actions_desc(inputs)
});