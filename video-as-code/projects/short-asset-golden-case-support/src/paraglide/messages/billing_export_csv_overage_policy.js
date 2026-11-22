/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Csv_Overage_PolicyInputs */

const en_billing_export_csv_overage_policy = /** @type {(inputs: Billing_Export_Csv_Overage_PolicyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overage policy`)
};

const zh_billing_export_csv_overage_policy = /** @type {(inputs: Billing_Export_Csv_Overage_PolicyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超额策略`)
};

/**
* | output |
* | --- |
* | "Overage policy" |
*
* @param {Billing_Export_Csv_Overage_PolicyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_overage_policy = /** @type {((inputs?: Billing_Export_Csv_Overage_PolicyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Overage_PolicyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_csv_overage_policy(inputs)
	return zh_billing_export_csv_overage_policy(inputs)
});