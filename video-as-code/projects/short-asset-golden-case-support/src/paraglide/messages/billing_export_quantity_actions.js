/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Billing_Export_Quantity_ActionsInputs */

const en_billing_export_quantity_actions = /** @type {(inputs: Billing_Export_Quantity_ActionsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} actions`)
};

const zh_billing_export_quantity_actions = /** @type {(inputs: Billing_Export_Quantity_ActionsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} actions`)
};

/**
* | output |
* | --- |
* | "{count} actions" |
*
* @param {Billing_Export_Quantity_ActionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_quantity_actions = /** @type {((inputs: Billing_Export_Quantity_ActionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Quantity_ActionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_quantity_actions(inputs)
	return zh_billing_export_quantity_actions(inputs)
});