/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_View_InvoiceInputs */

const en_billing_view_invoice = /** @type {(inputs: Billing_View_InvoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View invoice`)
};

const zh_billing_view_invoice = /** @type {(inputs: Billing_View_InvoiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看账单`)
};

/**
* | output |
* | --- |
* | "View invoice" |
*
* @param {Billing_View_InvoiceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_view_invoice = /** @type {((inputs?: Billing_View_InvoiceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_View_InvoiceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_view_invoice(inputs)
	return zh_billing_view_invoice(inputs)
});