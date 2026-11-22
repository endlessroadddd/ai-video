/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Csv_Period_EndInputs */

const en_billing_export_csv_period_end = /** @type {(inputs: Billing_Export_Csv_Period_EndInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Period end`)
};

const zh_billing_export_csv_period_end = /** @type {(inputs: Billing_Export_Csv_Period_EndInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`账期结束`)
};

/**
* | output |
* | --- |
* | "Period end" |
*
* @param {Billing_Export_Csv_Period_EndInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_period_end = /** @type {((inputs?: Billing_Export_Csv_Period_EndInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Period_EndInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_csv_period_end(inputs)
	return zh_billing_export_csv_period_end(inputs)
});