/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_PlatformsInputs */

const en_billing_export_quantity_platforms = /** @type {(inputs: Billing_Export_Quantity_PlatformsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} platform(s)`)
};

const zh_billing_export_quantity_platforms = /** @type {(inputs: Billing_Export_Quantity_PlatformsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个`)
};

/**
* | output |
* | --- |
* | "{count} platform(s)" |
*
* @param {Billing_Export_Quantity_PlatformsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_quantity_platforms = /** @type {((inputs: Billing_Export_Quantity_PlatformsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Quantity_PlatformsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_quantity_platforms(inputs)
	return zh_billing_export_quantity_platforms(inputs)
});