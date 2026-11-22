/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Overage_Policy_SubtitleInputs */

const en_billing_overage_policy_subtitle = /** @type {(inputs: Billing_Overage_Policy_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How to handle usage after the included quota is reached`)
};

const zh_billing_overage_policy_subtitle = /** @type {(inputs: Billing_Overage_Policy_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`达量后的处理方式`)
};

/**
* | output |
* | --- |
* | "How to handle usage after the included quota is reached" |
*
* @param {Billing_Overage_Policy_SubtitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_overage_policy_subtitle = /** @type {((inputs?: Billing_Overage_Policy_SubtitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Overage_Policy_SubtitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_overage_policy_subtitle(inputs)
	return zh_billing_overage_policy_subtitle(inputs)
});