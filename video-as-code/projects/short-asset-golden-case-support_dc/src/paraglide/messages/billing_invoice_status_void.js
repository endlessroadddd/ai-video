/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Invoice_Status_VoidInputs */

const en_billing_invoice_status_void = /** @type {(inputs: Billing_Invoice_Status_VoidInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voided`)
};

const zh_billing_invoice_status_void = /** @type {(inputs: Billing_Invoice_Status_VoidInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已作废`)
};

/**
* | output |
* | --- |
* | "Voided" |
*
* @param {Billing_Invoice_Status_VoidInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_void = /** @type {((inputs?: Billing_Invoice_Status_VoidInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_VoidInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_invoice_status_void(inputs)
	return zh_billing_invoice_status_void(inputs)
});