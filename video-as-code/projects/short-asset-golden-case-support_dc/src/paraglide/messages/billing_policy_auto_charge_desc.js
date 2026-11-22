/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Policy_Auto_Charge_DescInputs */

const en_billing_policy_auto_charge_desc = /** @type {(inputs: Billing_Policy_Auto_Charge_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Automatically bill overages within the current billing period.`)
};

const zh_billing_policy_auto_charge_desc = /** @type {(inputs: Billing_Policy_Auto_Charge_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超额部分按账期自动结算`)
};

/**
* | output |
* | --- |
* | "Automatically bill overages within the current billing period." |
*
* @param {Billing_Policy_Auto_Charge_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_policy_auto_charge_desc = /** @type {((inputs?: Billing_Policy_Auto_Charge_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Policy_Auto_Charge_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_policy_auto_charge_desc(inputs)
	return zh_billing_policy_auto_charge_desc(inputs)
});