/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ amount: NonNullable<unknown> }} Billing_Overage_Per_ActionInputs */

const en_billing_overage_per_action = /** @type {(inputs: Billing_Overage_Per_ActionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.amount} / action`)
};

const zh_billing_overage_per_action = /** @type {(inputs: Billing_Overage_Per_ActionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.amount} / 次`)
};

/**
* | output |
* | --- |
* | "{amount} / action" |
*
* @param {Billing_Overage_Per_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_overage_per_action = /** @type {((inputs: Billing_Overage_Per_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Overage_Per_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_overage_per_action(inputs)
	return zh_billing_overage_per_action(inputs)
});