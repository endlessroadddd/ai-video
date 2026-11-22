/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Manage_Payment_MethodInputs */

const en_billing_manage_payment_method = /** @type {(inputs: Billing_Manage_Payment_MethodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manage payment method`)
};

const zh_billing_manage_payment_method = /** @type {(inputs: Billing_Manage_Payment_MethodInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`管理支付方式`)
};

/**
* | output |
* | --- |
* | "Manage payment method" |
*
* @param {Billing_Manage_Payment_MethodInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_manage_payment_method = /** @type {((inputs?: Billing_Manage_Payment_MethodInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Manage_Payment_MethodInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_manage_payment_method(inputs)
	return zh_billing_manage_payment_method(inputs)
});