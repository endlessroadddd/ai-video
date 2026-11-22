/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Overage_Policy_TitleInputs */

const en_billing_overage_policy_title = /** @type {(inputs: Billing_Overage_Policy_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Overage policy`)
};

const zh_billing_overage_policy_title = /** @type {(inputs: Billing_Overage_Policy_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`超额策略`)
};

/**
* | output |
* | --- |
* | "Overage policy" |
*
* @param {Billing_Overage_Policy_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_overage_policy_title = /** @type {((inputs?: Billing_Overage_Policy_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Overage_Policy_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_overage_policy_title(inputs)
	return zh_billing_overage_policy_title(inputs)
});