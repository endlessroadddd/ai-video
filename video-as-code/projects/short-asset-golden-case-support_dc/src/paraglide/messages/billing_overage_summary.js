/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown>, amount: NonNullable<unknown> }} Billing_Overage_SummaryInputs */

const en_billing_overage_summary = /** @type {(inputs: Billing_Overage_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} overage action(s), projected ${i?.amount}`)
};

const zh_billing_overage_summary = /** @type {(inputs: Billing_Overage_SummaryInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已超额 ${i?.count} 次，预计 ${i?.amount}`)
};

/**
* | output |
* | --- |
* | "{count} overage action(s), projected {amount}" |
*
* @param {Billing_Overage_SummaryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_overage_summary = /** @type {((inputs: Billing_Overage_SummaryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Overage_SummaryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_overage_summary(inputs)
	return zh_billing_overage_summary(inputs)
});