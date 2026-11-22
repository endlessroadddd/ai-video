/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Csv_DescriptionInputs */

const en_billing_export_csv_description = /** @type {(inputs: Billing_Export_Csv_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Description`)
};

const zh_billing_export_csv_description = /** @type {(inputs: Billing_Export_Csv_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`描述`)
};

/**
* | output |
* | --- |
* | "Description" |
*
* @param {Billing_Export_Csv_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_description = /** @type {((inputs?: Billing_Export_Csv_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_csv_description(inputs)
	return zh_billing_export_csv_description(inputs)
});