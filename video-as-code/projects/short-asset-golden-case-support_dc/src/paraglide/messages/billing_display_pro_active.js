/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Display_Pro_ActiveInputs */

const en_billing_display_pro_active = /** @type {(inputs: Billing_Display_Pro_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro active`)
};

const zh_billing_display_pro_active = /** @type {(inputs: Billing_Display_Pro_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pro 生效中`)
};

/**
* | output |
* | --- |
* | "Pro active" |
*
* @param {Billing_Display_Pro_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_pro_active = /** @type {((inputs?: Billing_Display_Pro_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Pro_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_display_pro_active(inputs)
	return zh_billing_display_pro_active(inputs)
});