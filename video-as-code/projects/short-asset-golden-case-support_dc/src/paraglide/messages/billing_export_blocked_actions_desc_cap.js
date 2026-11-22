/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Export_Blocked_Actions_Desc_CapInputs */

const en_billing_export_blocked_actions_desc_cap = /** @type {(inputs: Billing_Export_Blocked_Actions_Desc_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Blocked by the quota policy in the current period`)
};

const zh_billing_export_blocked_actions_desc_cap = /** @type {(inputs: Billing_Export_Blocked_Actions_Desc_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期被额度策略拦截`)
};

/**
* | output |
* | --- |
* | "Blocked by the quota policy in the current period" |
*
* @param {Billing_Export_Blocked_Actions_Desc_CapInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_export_blocked_actions_desc_cap = /** @type {((inputs?: Billing_Export_Blocked_Actions_Desc_CapInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Export_Blocked_Actions_Desc_CapInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_export_blocked_actions_desc_cap(inputs)
	return zh_billing_export_blocked_actions_desc_cap(inputs)
});