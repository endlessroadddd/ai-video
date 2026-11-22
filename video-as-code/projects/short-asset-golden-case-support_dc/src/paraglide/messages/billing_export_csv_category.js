/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Csv_CategoryInputs */

const en_billing_export_csv_category = /** @type {(inputs: Billing_Export_Csv_CategoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Category`)
};

const zh_billing_export_csv_category = /** @type {(inputs: Billing_Export_Csv_CategoryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分类`)
};

/**
* | output |
* | --- |
* | "Category" |
*
* @param {Billing_Export_Csv_CategoryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_category = /** @type {((inputs?: Billing_Export_Csv_CategoryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_CategoryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_csv_category(inputs)
	return zh_billing_export_csv_category(inputs)
});