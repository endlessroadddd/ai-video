/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Account_LabelInputs */

const en_billing_account_label = /** @type {(inputs: Billing_Account_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Billing account`)
};

const zh_billing_account_label = /** @type {(inputs: Billing_Account_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`账单账户`)
};

/**
* | output |
* | --- |
* | "Billing account" |
*
* @param {Billing_Account_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_account_label = /** @type {((inputs?: Billing_Account_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Account_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_account_label(inputs)
	return zh_billing_account_label(inputs)
});