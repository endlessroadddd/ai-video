/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Usage_TitleInputs */

const en_billing_usage_title = /** @type {(inputs: Billing_Usage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Usage History`)
};

const zh_billing_usage_title = /** @type {(inputs: Billing_Usage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用量历史`)
};

/**
* | output |
* | --- |
* | "Usage History" |
*
* @param {Billing_Usage_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_usage_title = /** @type {((inputs?: Billing_Usage_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Usage_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_usage_title(inputs)
	return zh_billing_usage_title(inputs)
});