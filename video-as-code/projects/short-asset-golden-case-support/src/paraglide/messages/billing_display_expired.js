/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Display_ExpiredInputs */

const en_billing_display_expired = /** @type {(inputs: Billing_Display_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Expired`)
};

const zh_billing_display_expired = /** @type {(inputs: Billing_Display_ExpiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已失效`)
};

/**
* | output |
* | --- |
* | "Expired" |
*
* @param {Billing_Display_ExpiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_expired = /** @type {((inputs?: Billing_Display_ExpiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_ExpiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_display_expired(inputs)
	return zh_billing_display_expired(inputs)
});