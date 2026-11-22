/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Description_LabelInputs */

const en_onboarding_company_description_label = /** @type {(inputs: Onboarding_Company_Description_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Company description (optional)`)
};

const zh_onboarding_company_description_label = /** @type {(inputs: Onboarding_Company_Description_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公司简介（可选）`)
};

/**
* | output |
* | --- |
* | "Company description (optional)" |
*
* @param {Onboarding_Company_Description_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_description_label = /** @type {((inputs?: Onboarding_Company_Description_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Description_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_description_label(inputs)
	return zh_onboarding_company_description_label(inputs)
});