/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Actions_LabelInputs */

const en_billing_actions_label = /** @type {(inputs: Billing_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actions`)
};

const zh_billing_actions_label = /** @type {(inputs: Billing_Actions_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actions`)
};

/**
* | output |
* | --- |
* | "Actions" |
*
* @param {Billing_Actions_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_actions_label = /** @type {((inputs?: Billing_Actions_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Actions_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_actions_label(inputs)
	return zh_billing_actions_label(inputs)
});