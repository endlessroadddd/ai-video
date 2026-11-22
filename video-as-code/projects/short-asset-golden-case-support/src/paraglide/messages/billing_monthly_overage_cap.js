/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Monthly_Overage_CapInputs */

const en_billing_monthly_overage_cap = /** @type {(inputs: Billing_Monthly_Overage_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monthly overage cap (USD)`)
};

const zh_billing_monthly_overage_cap = /** @type {(inputs: Billing_Monthly_Overage_CapInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`月度超额上限（USD）`)
};

/**
* | output |
* | --- |
* | "Monthly overage cap (USD)" |
*
* @param {Billing_Monthly_Overage_CapInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_monthly_overage_cap = /** @type {((inputs?: Billing_Monthly_Overage_CapInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Monthly_Overage_CapInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_monthly_overage_cap(inputs)
	return zh_billing_monthly_overage_cap(inputs)
});