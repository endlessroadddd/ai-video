/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Display_Free_Limit_ReachedInputs */

const en_billing_display_free_limit_reached = /** @type {(inputs: Billing_Display_Free_Limit_ReachedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Free limit reached`)
};

const zh_billing_display_free_limit_reached = /** @type {(inputs: Billing_Display_Free_Limit_ReachedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已达免费额度`)
};

/**
* | output |
* | --- |
* | "Free limit reached" |
*
* @param {Billing_Display_Free_Limit_ReachedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_free_limit_reached = /** @type {((inputs?: Billing_Display_Free_Limit_ReachedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Free_Limit_ReachedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_display_free_limit_reached(inputs)
	return zh_billing_display_free_limit_reached(inputs)
});