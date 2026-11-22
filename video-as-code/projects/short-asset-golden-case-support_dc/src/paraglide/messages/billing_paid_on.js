/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ date: NonNullable<unknown> }} Billing_Paid_OnInputs */

const en_billing_paid_on = /** @type {(inputs: Billing_Paid_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Paid on ${i?.date}`)
};

const zh_billing_paid_on = /** @type {(inputs: Billing_Paid_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`付款日期：${i?.date}`)
};

/**
* | output |
* | --- |
* | "Paid on {date}" |
*
* @param {Billing_Paid_OnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_paid_on = /** @type {((inputs: Billing_Paid_OnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Paid_OnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_paid_on(inputs)
	return zh_billing_paid_on(inputs)
});