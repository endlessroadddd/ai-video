/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_No_Overage_FeeInputs */

const en_billing_no_overage_fee = /** @type {(inputs: Billing_No_Overage_FeeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No overage fee currently`)
};

const zh_billing_no_overage_fee = /** @type {(inputs: Billing_No_Overage_FeeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前未产生超额费用`)
};

/**
* | output |
* | --- |
* | "No overage fee currently" |
*
* @param {Billing_No_Overage_FeeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_no_overage_fee = /** @type {((inputs?: Billing_No_Overage_FeeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_No_Overage_FeeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_no_overage_fee(inputs)
	return zh_billing_no_overage_fee(inputs)
});