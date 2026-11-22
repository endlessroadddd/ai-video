/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_ErrorInputs */

const en_billing_export_error = /** @type {(inputs: Billing_Export_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to export billing details. Please try again later.`)
};

const zh_billing_export_error = /** @type {(inputs: Billing_Export_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`导出账单明细失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to export billing details. Please try again later." |
*
* @param {Billing_Export_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_error = /** @type {((inputs?: Billing_Export_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_error(inputs)
	return zh_billing_export_error(inputs)
});