/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ date: NonNullable<unknown> }} Billing_Ends_OnInputs */

const en_billing_ends_on = /** @type {(inputs: Billing_Ends_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Ends on ${i?.date}`)
};

const zh_billing_ends_on = /** @type {(inputs: Billing_Ends_OnInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`将于 ${i?.date} 到期`)
};

/**
* | output |
* | --- |
* | "Ends on {date}" |
*
* @param {Billing_Ends_OnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_ends_on = /** @type {((inputs: Billing_Ends_OnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Ends_OnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_ends_on(inputs)
	return zh_billing_ends_on(inputs)
});