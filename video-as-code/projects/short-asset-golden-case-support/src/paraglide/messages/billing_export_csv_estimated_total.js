/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Csv_Estimated_TotalInputs */

const en_billing_export_csv_estimated_total = /** @type {(inputs: Billing_Export_Csv_Estimated_TotalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Estimated settlement total`)
};

const zh_billing_export_csv_estimated_total = /** @type {(inputs: Billing_Export_Csv_Estimated_TotalInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预计结算总计`)
};

/**
* | output |
* | --- |
* | "Estimated settlement total" |
*
* @param {Billing_Export_Csv_Estimated_TotalInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_estimated_total = /** @type {((inputs?: Billing_Export_Csv_Estimated_TotalInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Estimated_TotalInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_csv_estimated_total(inputs)
	return zh_billing_export_csv_estimated_total(inputs)
});