/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Table_QuantityInputs */

const en_billing_table_quantity = /** @type {(inputs: Billing_Table_QuantityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Quantity`)
};

const zh_billing_table_quantity = /** @type {(inputs: Billing_Table_QuantityInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数量`)
};

/**
* | output |
* | --- |
* | "Quantity" |
*
* @param {Billing_Table_QuantityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_table_quantity = /** @type {((inputs?: Billing_Table_QuantityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Table_QuantityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_table_quantity(inputs)
	return zh_billing_table_quantity(inputs)
});