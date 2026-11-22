/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Invoice_Status_UnknownInputs */

const en_billing_invoice_status_unknown = /** @type {(inputs: Billing_Invoice_Status_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown status`)
};

const zh_billing_invoice_status_unknown = /** @type {(inputs: Billing_Invoice_Status_UnknownInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知状态`)
};

/**
* | output |
* | --- |
* | "Unknown status" |
*
* @param {Billing_Invoice_Status_UnknownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_unknown = /** @type {((inputs?: Billing_Invoice_Status_UnknownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_UnknownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_invoice_status_unknown(inputs)
	return zh_billing_invoice_status_unknown(inputs)
});