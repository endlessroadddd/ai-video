/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_SuccessInputs */

const en_billing_export_success = /** @type {(inputs: Billing_Export_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current period billing details have been exported.`)
};

const zh_billing_export_success = /** @type {(inputs: Billing_Export_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期账单明细已导出。`)
};

/**
* | output |
* | --- |
* | "The current period billing details have been exported." |
*
* @param {Billing_Export_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_success = /** @type {((inputs?: Billing_Export_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_success(inputs)
	return zh_billing_export_success(inputs)
});