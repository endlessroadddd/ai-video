/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ amount: NonNullable<unknown> }} Billing_Projected_OverageInputs */

const en_billing_projected_overage = /** @type {(inputs: Billing_Projected_OverageInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Projected overage fee ${i?.amount}`)
};

const zh_billing_projected_overage = /** @type {(inputs: Billing_Projected_OverageInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`预计超额费用 ${i?.amount}`)
};

/**
* | output |
* | --- |
* | "Projected overage fee {amount}" |
*
* @param {Billing_Projected_OverageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_projected_overage = /** @type {((inputs: Billing_Projected_OverageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Projected_OverageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_projected_overage(inputs)
	return zh_billing_projected_overage(inputs)
});