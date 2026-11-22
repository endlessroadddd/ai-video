/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Table_ProjectInputs */

const en_billing_table_project = /** @type {(inputs: Billing_Table_ProjectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Item`)
};

const zh_billing_table_project = /** @type {(inputs: Billing_Table_ProjectInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`项目`)
};

/**
* | output |
* | --- |
* | "Item" |
*
* @param {Billing_Table_ProjectInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_table_project = /** @type {((inputs?: Billing_Table_ProjectInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Table_ProjectInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_table_project(inputs)
	return zh_billing_table_project(inputs)
});