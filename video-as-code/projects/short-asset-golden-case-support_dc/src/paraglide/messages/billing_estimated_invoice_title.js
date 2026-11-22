/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Estimated_Invoice_TitleInputs */

const en_billing_estimated_invoice_title = /** @type {(inputs: Billing_Estimated_Invoice_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projected invoice`)
};

const zh_billing_estimated_invoice_title = /** @type {(inputs: Billing_Estimated_Invoice_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预计账单`)
};

/**
* | output |
* | --- |
* | "Projected invoice" |
*
* @param {Billing_Estimated_Invoice_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_estimated_invoice_title = /** @type {((inputs?: Billing_Estimated_Invoice_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Estimated_Invoice_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_estimated_invoice_title(inputs)
	return zh_billing_estimated_invoice_title(inputs)
});