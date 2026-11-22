/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Blocked_Actions_Desc_StopInputs */

const en_billing_export_blocked_actions_desc_stop = /** @type {(inputs: Billing_Export_Blocked_Actions_Desc_StopInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Blocked by the stop-service policy and not billed`)
};

const zh_billing_export_blocked_actions_desc_stop = /** @type {(inputs: Billing_Export_Blocked_Actions_Desc_StopInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已被达量停服策略拦截，不计费`)
};

/**
* | output |
* | --- |
* | "Blocked by the stop-service policy and not billed" |
*
* @param {Billing_Export_Blocked_Actions_Desc_StopInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_blocked_actions_desc_stop = /** @type {((inputs?: Billing_Export_Blocked_Actions_Desc_StopInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Blocked_Actions_Desc_StopInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_blocked_actions_desc_stop(inputs)
	return zh_billing_export_blocked_actions_desc_stop(inputs)
});