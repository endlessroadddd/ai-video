/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Policy_Stop_Service_TitleInputs */

const en_billing_policy_stop_service_title = /** @type {(inputs: Billing_Policy_Stop_Service_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stop service`)
};

const zh_billing_policy_stop_service_title = /** @type {(inputs: Billing_Policy_Stop_Service_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`达量停服`)
};

/**
* | output |
* | --- |
* | "Stop service" |
*
* @param {Billing_Policy_Stop_Service_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_policy_stop_service_title = /** @type {((inputs?: Billing_Policy_Stop_Service_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Policy_Stop_Service_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_policy_stop_service_title(inputs)
	return zh_billing_policy_stop_service_title(inputs)
});