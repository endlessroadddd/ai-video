/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Csv_Period_StartInputs */

const en_billing_export_csv_period_start = /** @type {(inputs: Billing_Export_Csv_Period_StartInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Period start`)
};

const zh_billing_export_csv_period_start = /** @type {(inputs: Billing_Export_Csv_Period_StartInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`账期开始`)
};

/**
* | output |
* | --- |
* | "Period start" |
*
* @param {Billing_Export_Csv_Period_StartInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_period_start = /** @type {((inputs?: Billing_Export_Csv_Period_StartInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Period_StartInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_csv_period_start(inputs)
	return zh_billing_export_csv_period_start(inputs)
});