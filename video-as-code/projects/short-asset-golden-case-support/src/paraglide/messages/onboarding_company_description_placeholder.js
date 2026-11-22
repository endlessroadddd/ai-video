/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Description_PlaceholderInputs */

const en_onboarding_company_description_placeholder = /** @type {(inputs: Onboarding_Company_Description_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Briefly describe your company and team.`)
};

const zh_onboarding_company_description_placeholder = /** @type {(inputs: Onboarding_Company_Description_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`简单介绍你的公司和团队。`)
};

/**
* | output |
* | --- |
* | "Briefly describe your company and team." |
*
* @param {Onboarding_Company_Description_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_description_placeholder = /** @type {((inputs?: Onboarding_Company_Description_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Description_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_description_placeholder(inputs)
	return zh_onboarding_company_description_placeholder(inputs)
});