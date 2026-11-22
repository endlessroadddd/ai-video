/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Stripe_Invoices_TitleInputs */

const en_billing_stripe_invoices_title = /** @type {(inputs: Billing_Stripe_Invoices_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stripe invoices`)
};

const zh_billing_stripe_invoices_title = /** @type {(inputs: Billing_Stripe_Invoices_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stripe 官方账单`)
};

/**
* | output |
* | --- |
* | "Stripe invoices" |
*
* @param {Billing_Stripe_Invoices_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_stripe_invoices_title = /** @type {((inputs?: Billing_Stripe_Invoices_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Stripe_Invoices_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_stripe_invoices_title(inputs)
	return zh_billing_stripe_invoices_title(inputs)
});