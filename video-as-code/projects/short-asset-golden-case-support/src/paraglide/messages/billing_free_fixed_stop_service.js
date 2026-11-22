/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Free_Fixed_Stop_ServiceInputs */

const en_billing_free_fixed_stop_service = /** @type {(inputs: Billing_Free_Fixed_Stop_ServiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Free plan is fixed to stop service when the quota is reached.`)
};

const zh_billing_free_fixed_stop_service = /** @type {(inputs: Billing_Free_Fixed_Stop_ServiceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`免费版固定为达量停用。`)
};

/**
* | output |
* | --- |
* | "Free plan is fixed to stop service when the quota is reached." |
*
* @param {Billing_Free_Fixed_Stop_ServiceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_free_fixed_stop_service = /** @type {((inputs?: Billing_Free_Fixed_Stop_ServiceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Free_Fixed_Stop_ServiceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_free_fixed_stop_service(inputs)
	return zh_billing_free_fixed_stop_service(inputs)
});