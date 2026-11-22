/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_UnsupportedInputs */

const en_billing_unsupported = /** @type {(inputs: Billing_UnsupportedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unsupported`)
};

const zh_billing_unsupported = /** @type {(inputs: Billing_UnsupportedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不支持`)
};

/**
* | output |
* | --- |
* | "Unsupported" |
*
* @param {Billing_UnsupportedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_unsupported = /** @type {((inputs?: Billing_UnsupportedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_UnsupportedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_unsupported(inputs)
	return zh_billing_unsupported(inputs)
});