/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Billing_Overage_TitleInputs */

const en_billing_overage_title = /** @type {(inputs: Billing_Overage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated overage`)
};

const zh_billing_overage_title = /** @type {(inputs: Billing_Overage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已产生 overage`)
};

/**
* | output |
* | --- |
* | "Generated overage" |
*
* @param {Billing_Overage_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const billing_overage_title = /** @type {((inputs?: Billing_Overage_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Billing_Overage_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_billing_overage_title(inputs)
	return zh_billing_overage_title(inputs)
});