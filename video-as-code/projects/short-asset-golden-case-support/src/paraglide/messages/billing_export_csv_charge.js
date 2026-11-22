/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Csv_ChargeInputs */

const en_billing_export_csv_charge = /** @type {(inputs: Billing_Export_Csv_ChargeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Charge item`)
};

const zh_billing_export_csv_charge = /** @type {(inputs: Billing_Export_Csv_ChargeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`收费项`)
};

/**
* | output |
* | --- |
* | "Charge item" |
*
* @param {Billing_Export_Csv_ChargeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_charge = /** @type {((inputs?: Billing_Export_Csv_ChargeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_ChargeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_csv_charge(inputs)
	return zh_billing_export_csv_charge(inputs)
});