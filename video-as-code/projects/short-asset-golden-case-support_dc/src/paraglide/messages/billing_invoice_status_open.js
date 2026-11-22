/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Invoice_Status_OpenInputs */

const en_billing_invoice_status_open = /** @type {(inputs: Billing_Invoice_Status_OpenInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open`)
};

const zh_billing_invoice_status_open = /** @type {(inputs: Billing_Invoice_Status_OpenInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待支付`)
};

/**
* | output |
* | --- |
* | "Open" |
*
* @param {Billing_Invoice_Status_OpenInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_open = /** @type {((inputs?: Billing_Invoice_Status_OpenInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_OpenInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_invoice_status_open(inputs)
	return zh_billing_invoice_status_open(inputs)
});