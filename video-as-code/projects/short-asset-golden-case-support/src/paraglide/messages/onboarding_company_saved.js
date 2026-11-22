/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_SavedInputs */

const en_onboarding_company_saved = /** @type {(inputs: Onboarding_Company_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Company information saved.`)
};

const zh_onboarding_company_saved = /** @type {(inputs: Onboarding_Company_SavedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公司信息已保存。`)
};

/**
* | output |
* | --- |
* | "Company information saved." |
*
* @param {Onboarding_Company_SavedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_saved = /** @type {((inputs?: Onboarding_Company_SavedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_SavedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_saved(inputs)
	return zh_onboarding_company_saved(inputs)
});