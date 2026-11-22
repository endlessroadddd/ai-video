/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Stop_ServiceInputs */

const en_billing_stop_service = /** @type {(inputs: Billing_Stop_ServiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stop service`)
};

const zh_billing_stop_service = /** @type {(inputs: Billing_Stop_ServiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`达量停服`)
};

/**
* | output |
* | --- |
* | "Stop service" |
*
* @param {Billing_Stop_ServiceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_stop_service = /** @type {((inputs?: Billing_Stop_ServiceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Stop_ServiceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_stop_service(inputs)
	return zh_billing_stop_service(inputs)
});