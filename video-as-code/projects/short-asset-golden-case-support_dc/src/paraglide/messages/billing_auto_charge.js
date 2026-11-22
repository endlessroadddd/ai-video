/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Auto_ChargeInputs */

const en_billing_auto_charge = /** @type {(inputs: Billing_Auto_ChargeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auto charge`)
};

const zh_billing_auto_charge = /** @type {(inputs: Billing_Auto_ChargeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自动扣费`)
};

/**
* | output |
* | --- |
* | "Auto charge" |
*
* @param {Billing_Auto_ChargeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_auto_charge = /** @type {((inputs?: Billing_Auto_ChargeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Auto_ChargeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_auto_charge(inputs)
	return zh_billing_auto_charge(inputs)
});