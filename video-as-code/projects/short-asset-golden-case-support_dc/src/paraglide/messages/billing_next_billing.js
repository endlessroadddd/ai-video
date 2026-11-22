/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ date: NonNullable<unknown> }} Billing_Next_BillingInputs */

const en_billing_next_billing = /** @type {(inputs: Billing_Next_BillingInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Next billing ${i?.date}`)
};

const zh_billing_next_billing = /** @type {(inputs: Billing_Next_BillingInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`下次结算 ${i?.date}`)
};

/**
* | output |
* | --- |
* | "Next billing {date}" |
*
* @param {Billing_Next_BillingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_next_billing = /** @type {((inputs: Billing_Next_BillingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Next_BillingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_next_billing(inputs)
	return zh_billing_next_billing(inputs)
});