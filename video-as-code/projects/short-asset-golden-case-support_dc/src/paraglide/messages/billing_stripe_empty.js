/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Stripe_EmptyInputs */

const en_billing_stripe_empty = /** @type {(inputs: Billing_Stripe_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No exportable Stripe invoices yet.`)
};

const zh_billing_stripe_empty = /** @type {(inputs: Billing_Stripe_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无可导出的 Stripe 官方账单。`)
};

/**
* | output |
* | --- |
* | "No exportable Stripe invoices yet." |
*
* @param {Billing_Stripe_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_stripe_empty = /** @type {((inputs?: Billing_Stripe_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Stripe_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_stripe_empty(inputs)
	return zh_billing_stripe_empty(inputs)
});