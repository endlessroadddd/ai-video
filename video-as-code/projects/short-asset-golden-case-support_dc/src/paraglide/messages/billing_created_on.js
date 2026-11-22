/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ date: NonNullable<unknown> }} Billing_Created_OnInputs */

const en_billing_created_on = /** @type {(inputs: Billing_Created_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Created on ${i?.date}`)
};

const zh_billing_created_on = /** @type {(inputs: Billing_Created_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`创建于 ${i?.date}`)
};

/**
* | output |
* | --- |
* | "Created on {date}" |
*
* @param {Billing_Created_OnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_created_on = /** @type {((inputs: Billing_Created_OnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Created_OnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_created_on(inputs)
	return zh_billing_created_on(inputs)
});