/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ percent: NonNullable<unknown> }} Billing_Usage_RateInputs */

const en_billing_usage_rate = /** @type {(inputs: Billing_Usage_RateInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Usage ${i?.percent}%`)
};

const zh_billing_usage_rate = /** @type {(inputs: Billing_Usage_RateInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`使用率 ${i?.percent}%`)
};

/**
* | output |
* | --- |
* | "Usage {percent}%" |
*
* @param {Billing_Usage_RateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_usage_rate = /** @type {((inputs: Billing_Usage_RateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Usage_RateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_usage_rate(inputs)
	return zh_billing_usage_rate(inputs)
});