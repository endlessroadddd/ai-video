/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Stripe_Invoices_HintInputs */

const en_billing_stripe_invoices_hint = /** @type {(inputs: Billing_Stripe_Invoices_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View hosted invoices directly, or download PDFs and receipts.`)
};

const zh_billing_stripe_invoices_hint = /** @type {(inputs: Billing_Stripe_Invoices_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可直接查看 Hosted Invoice、下载 PDF 和收据`)
};

/**
* | output |
* | --- |
* | "View hosted invoices directly, or download PDFs and receipts." |
*
* @param {Billing_Stripe_Invoices_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_stripe_invoices_hint = /** @type {((inputs?: Billing_Stripe_Invoices_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Stripe_Invoices_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_stripe_invoices_hint(inputs)
	return zh_billing_stripe_invoices_hint(inputs)
});