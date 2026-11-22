/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Csv_InfoInputs */

const en_billing_export_csv_info = /** @type {(inputs: Billing_Export_Csv_InfoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Info item`)
};

const zh_billing_export_csv_info = /** @type {(inputs: Billing_Export_Csv_InfoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`信息项`)
};

/**
* | output |
* | --- |
* | "Info item" |
*
* @param {Billing_Export_Csv_InfoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_info = /** @type {((inputs?: Billing_Export_Csv_InfoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_InfoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_csv_info(inputs)
	return zh_billing_export_csv_info(inputs)
});