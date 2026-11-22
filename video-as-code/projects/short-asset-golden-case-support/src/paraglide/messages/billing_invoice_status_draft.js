/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Invoice_Status_DraftInputs */

const en_billing_invoice_status_draft = /** @type {(inputs: Billing_Invoice_Status_DraftInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Draft`)
};

const zh_billing_invoice_status_draft = /** @type {(inputs: Billing_Invoice_Status_DraftInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`草稿`)
};

/**
* | output |
* | --- |
* | "Draft" |
*
* @param {Billing_Invoice_Status_DraftInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_draft = /** @type {((inputs?: Billing_Invoice_Status_DraftInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_DraftInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_invoice_status_draft(inputs)
	return zh_billing_invoice_status_draft(inputs)
});