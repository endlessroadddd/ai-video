/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Table_Unit_PriceInputs */

const en_billing_table_unit_price = /** @type {(inputs: Billing_Table_Unit_PriceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unit price`)
};

const zh_billing_table_unit_price = /** @type {(inputs: Billing_Table_Unit_PriceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`单价`)
};

/**
* | output |
* | --- |
* | "Unit price" |
*
* @param {Billing_Table_Unit_PriceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_table_unit_price = /** @type {((inputs?: Billing_Table_Unit_PriceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Table_Unit_PriceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_table_unit_price(inputs)
	return zh_billing_table_unit_price(inputs)
});