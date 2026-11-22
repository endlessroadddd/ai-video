/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Overage_Actions_LabelInputs */

const en_billing_export_overage_actions_label = /** @type {(inputs: Billing_Export_Overage_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overage actions`)
};

const zh_billing_export_overage_actions_label = /** @type {(inputs: Billing_Export_Overage_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超额 actions`)
};

/**
* | output |
* | --- |
* | "Overage actions" |
*
* @param {Billing_Export_Overage_Actions_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_overage_actions_label = /** @type {((inputs?: Billing_Export_Overage_Actions_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Overage_Actions_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_overage_actions_label(inputs)
	return zh_billing_export_overage_actions_label(inputs)
});