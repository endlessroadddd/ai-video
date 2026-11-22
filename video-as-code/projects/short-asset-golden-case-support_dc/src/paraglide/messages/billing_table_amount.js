/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Table_AmountInputs */

const en_billing_table_amount = /** @type {(inputs: Billing_Table_AmountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Amount`)
};

const zh_billing_table_amount = /** @type {(inputs: Billing_Table_AmountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`金额`)
};

/**
* | output |
* | --- |
* | "Amount" |
*
* @param {Billing_Table_AmountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_table_amount = /** @type {((inputs?: Billing_Table_AmountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Table_AmountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_table_amount(inputs)
	return zh_billing_table_amount(inputs)
});