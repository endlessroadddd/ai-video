/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_No_Overage_YetInputs */

const en_billing_no_overage_yet = /** @type {(inputs: Billing_No_Overage_YetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No overage fee has been generated in the current billing period.`)
};

const zh_billing_no_overage_yet = /** @type {(inputs: Billing_No_Overage_YetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账期尚未产生超额费用`)
};

/**
* | output |
* | --- |
* | "No overage fee has been generated in the current billing period." |
*
* @param {Billing_No_Overage_YetInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_no_overage_yet = /** @type {((inputs?: Billing_No_Overage_YetInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_No_Overage_YetInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_no_overage_yet(inputs)
	return zh_billing_no_overage_yet(inputs)
});