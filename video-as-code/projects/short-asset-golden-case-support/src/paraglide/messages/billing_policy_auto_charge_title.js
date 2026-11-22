/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Policy_Auto_Charge_TitleInputs */

const en_billing_policy_auto_charge_title = /** @type {(inputs: Billing_Policy_Auto_Charge_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auto charge`)
};

const zh_billing_policy_auto_charge_title = /** @type {(inputs: Billing_Policy_Auto_Charge_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自动扣费`)
};

/**
* | output |
* | --- |
* | "Auto charge" |
*
* @param {Billing_Policy_Auto_Charge_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_policy_auto_charge_title = /** @type {((inputs?: Billing_Policy_Auto_Charge_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Policy_Auto_Charge_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_policy_auto_charge_title(inputs)
	return zh_billing_policy_auto_charge_title(inputs)
});