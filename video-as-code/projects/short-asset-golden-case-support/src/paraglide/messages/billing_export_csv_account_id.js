/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Csv_Account_IdInputs */

const en_billing_export_csv_account_id = /** @type {(inputs: Billing_Export_Csv_Account_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Billing account ID`)
};

const zh_billing_export_csv_account_id = /** @type {(inputs: Billing_Export_Csv_Account_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`账单账号 ID`)
};

/**
* | output |
* | --- |
* | "Billing account ID" |
*
* @param {Billing_Export_Csv_Account_IdInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_csv_account_id = /** @type {((inputs?: Billing_Export_Csv_Account_IdInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Csv_Account_IdInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_csv_account_id(inputs)
	return zh_billing_export_csv_account_id(inputs)
});