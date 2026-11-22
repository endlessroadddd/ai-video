/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Policy_Stop_Service_DescInputs */

const en_billing_policy_stop_service_desc = /** @type {(inputs: Billing_Policy_Stop_Service_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stop new billable actions after the included quota is reached.`)
};

const zh_billing_policy_stop_service_desc = /** @type {(inputs: Billing_Policy_Stop_Service_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`达到 included quota 后停止新的 billable action`)
};

/**
* | output |
* | --- |
* | "Stop new billable actions after the included quota is reached." |
*
* @param {Billing_Policy_Stop_Service_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_policy_stop_service_desc = /** @type {((inputs?: Billing_Policy_Stop_Service_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Policy_Stop_Service_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_policy_stop_service_desc(inputs)
	return zh_billing_policy_stop_service_desc(inputs)
});