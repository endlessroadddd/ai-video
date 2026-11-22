/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Limit_ReachedInputs */

const en_billing_limit_reached = /** @type {(inputs: Billing_Limit_ReachedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Free quota limit reached`)
};

const zh_billing_limit_reached = /** @type {(inputs: Billing_Limit_ReachedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已达到免费额度上限`)
};

/**
* | output |
* | --- |
* | "Free quota limit reached" |
*
* @param {Billing_Limit_ReachedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_limit_reached = /** @type {((inputs?: Billing_Limit_ReachedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Limit_ReachedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_limit_reached(inputs)
	return zh_billing_limit_reached(inputs)
});