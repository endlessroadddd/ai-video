/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_AdminsInputs */

const en_billing_export_quantity_admins = /** @type {(inputs: Billing_Export_Quantity_AdminsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} seat(s)`)
};

const zh_billing_export_quantity_admins = /** @type {(inputs: Billing_Export_Quantity_AdminsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 位`)
};

/**
* | output |
* | --- |
* | "{count} seat(s)" |
*
* @param {Billing_Export_Quantity_AdminsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_quantity_admins = /** @type {((inputs: Billing_Export_Quantity_AdminsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Quantity_AdminsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_quantity_admins(inputs)
	return zh_billing_export_quantity_admins(inputs)
});