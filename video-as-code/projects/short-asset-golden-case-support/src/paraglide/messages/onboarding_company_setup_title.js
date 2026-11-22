/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Setup_TitleInputs */

const en_onboarding_company_setup_title = /** @type {(inputs: Onboarding_Company_Setup_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set up company information`)
};

const zh_onboarding_company_setup_title = /** @type {(inputs: Onboarding_Company_Setup_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设置公司信息`)
};

/**
* | output |
* | --- |
* | "Set up company information" |
*
* @param {Onboarding_Company_Setup_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_setup_title = /** @type {((inputs?: Onboarding_Company_Setup_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Setup_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_setup_title(inputs)
	return zh_onboarding_company_setup_title(inputs)
});