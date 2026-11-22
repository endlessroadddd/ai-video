/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Setup_SubtitleInputs */

const en_onboarding_company_setup_subtitle = /** @type {(inputs: Onboarding_Company_Setup_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Complete your company profile first, then continue with your personal profile.`)
};

const zh_onboarding_company_setup_subtitle = /** @type {(inputs: Onboarding_Company_Setup_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先完善公司资料，下一步继续设置个人信息。`)
};

/**
* | output |
* | --- |
* | "Complete your company profile first, then continue with your personal profile." |
*
* @param {Onboarding_Company_Setup_SubtitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_setup_subtitle = /** @type {((inputs?: Onboarding_Company_Setup_SubtitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Setup_SubtitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_setup_subtitle(inputs)
	return zh_onboarding_company_setup_subtitle(inputs)
});