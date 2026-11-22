/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Invoice_Status_PaidInputs */

const en_billing_invoice_status_paid = /** @type {(inputs: Billing_Invoice_Status_PaidInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paid`)
};

const zh_billing_invoice_status_paid = /** @type {(inputs: Billing_Invoice_Status_PaidInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已支付`)
};

/**
* | output |
* | --- |
* | "Paid" |
*
* @param {Billing_Invoice_Status_PaidInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_paid = /** @type {((inputs?: Billing_Invoice_Status_PaidInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_PaidInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_invoice_status_paid(inputs)
	return zh_billing_invoice_status_paid(inputs)
});