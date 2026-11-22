/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Welcome_TitleInputs */

const en_onboarding_company_welcome_title = /** @type {(inputs: Onboarding_Company_Welcome_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create your first workspace`)
};

const zh_onboarding_company_welcome_title = /** @type {(inputs: Onboarding_Company_Welcome_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建你的首个工作区`)
};

/**
* | output |
* | --- |
* | "Create your first workspace" |
*
* @param {Onboarding_Company_Welcome_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_welcome_title = /** @type {((inputs?: Onboarding_Company_Welcome_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Welcome_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_welcome_title(inputs)
	return zh_onboarding_company_welcome_title(inputs)
});