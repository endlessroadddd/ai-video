/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Example_CapInputs */

const en_billing_example_cap = /** @type {(inputs: Billing_Example_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`e.g. 500`)
};

const zh_billing_example_cap = /** @type {(inputs: Billing_Example_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`例如 500`)
};

/**
* | output |
* | --- |
* | "e.g. 500" |
*
* @param {Billing_Example_CapInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_example_cap = /** @type {((inputs?: Billing_Example_CapInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Example_CapInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_example_cap(inputs)
	return zh_billing_example_cap(inputs)
});