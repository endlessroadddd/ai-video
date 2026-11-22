/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Display_Promo_Only_BasicInputs */

const en_billing_display_promo_only_basic = /** @type {(inputs: Billing_Display_Promo_Only_BasicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Promo Basic`)
};

const zh_billing_display_promo_only_basic = /** @type {(inputs: Billing_Display_Promo_Only_BasicInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Promo Basic`)
};

/**
* | output |
* | --- |
* | "Promo Basic" |
*
* @param {Billing_Display_Promo_Only_BasicInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_display_promo_only_basic = /** @type {((inputs?: Billing_Display_Promo_Only_BasicInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Display_Promo_Only_BasicInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_display_promo_only_basic(inputs)
	return zh_billing_display_promo_only_basic(inputs)
});