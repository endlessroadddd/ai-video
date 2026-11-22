/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Display_Free_ActiveInputs */

const en_billing_display_free_active = /** @type {(inputs: Billing_Display_Free_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Free`)
};

const zh_billing_display_free_active = /** @type {(inputs: Billing_Display_Free_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`免费版`)
};

/**
* | output |
* | --- |
* | "Free" |
*
* @param {Billing_Display_Free_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_free_active = /** @type {((inputs?: Billing_Display_Free_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Free_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_display_free_active(inputs)
	return zh_billing_display_free_active(inputs)
});