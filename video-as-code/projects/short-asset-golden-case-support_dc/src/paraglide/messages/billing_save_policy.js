/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Save_PolicyInputs */

const en_billing_save_policy = /** @type {(inputs: Billing_Save_PolicyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save policy`)
};

const zh_billing_save_policy = /** @type {(inputs: Billing_Save_PolicyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存策略`)
};

/**
* | output |
* | --- |
* | "Save policy" |
*
* @param {Billing_Save_PolicyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_save_policy = /** @type {((inputs?: Billing_Save_PolicyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Save_PolicyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_save_policy(inputs)
	return zh_billing_save_policy(inputs)
});