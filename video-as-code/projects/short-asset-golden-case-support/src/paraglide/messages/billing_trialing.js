/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_TrialingInputs */

const en_billing_trialing = /** @type {(inputs: Billing_TrialingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Trial in progress`)
};

const zh_billing_trialing = /** @type {(inputs: Billing_TrialingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`试用中`)
};

/**
* | output |
* | --- |
* | "Trial in progress" |
*
* @param {Billing_TrialingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_trialing = /** @type {((inputs?: Billing_TrialingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_TrialingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_trialing(inputs)
	return zh_billing_trialing(inputs)
});