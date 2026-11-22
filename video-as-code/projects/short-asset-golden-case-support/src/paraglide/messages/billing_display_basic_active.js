/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Display_Basic_ActiveInputs */

const en_billing_display_basic_active = /** @type {(inputs: Billing_Display_Basic_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic active`)
};

const zh_billing_display_basic_active = /** @type {(inputs: Billing_Display_Basic_ActiveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basic 生效中`)
};

/**
* | output |
* | --- |
* | "Basic active" |
*
* @param {Billing_Display_Basic_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_basic_active = /** @type {((inputs?: Billing_Display_Basic_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Basic_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_display_basic_active(inputs)
	return zh_billing_display_basic_active(inputs)
});