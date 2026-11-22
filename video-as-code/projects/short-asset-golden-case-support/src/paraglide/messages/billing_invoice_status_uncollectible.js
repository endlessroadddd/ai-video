/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Invoice_Status_UncollectibleInputs */

const en_billing_invoice_status_uncollectible = /** @type {(inputs: Billing_Invoice_Status_UncollectibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Uncollectible`)
};

const zh_billing_invoice_status_uncollectible = /** @type {(inputs: Billing_Invoice_Status_UncollectibleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无法收款`)
};

/**
* | output |
* | --- |
* | "Uncollectible" |
*
* @param {Billing_Invoice_Status_UncollectibleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_invoice_status_uncollectible = /** @type {((inputs?: Billing_Invoice_Status_UncollectibleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Invoice_Status_UncollectibleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_invoice_status_uncollectible(inputs)
	return zh_billing_invoice_status_uncollectible(inputs)
});