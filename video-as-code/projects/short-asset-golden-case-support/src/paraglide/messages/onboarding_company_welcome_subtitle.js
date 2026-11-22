/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Welcome_SubtitleInputs */

const en_onboarding_company_welcome_subtitle = /** @type {(inputs: Onboarding_Company_Welcome_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Welcome to Lucius. Create your first workspace before continuing with your personal profile.`)
};

const zh_onboarding_company_welcome_subtitle = /** @type {(inputs: Onboarding_Company_Welcome_SubtitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`欢迎使用 Lucius，先创建一个工作区再继续设置个人信息。`)
};

/**
* | output |
* | --- |
* | "Welcome to Lucius. Create your first workspace before continuing with your personal profile." |
*
* @param {Onboarding_Company_Welcome_SubtitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_welcome_subtitle = /** @type {((inputs?: Onboarding_Company_Welcome_SubtitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Welcome_SubtitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_welcome_subtitle(inputs)
	return zh_onboarding_company_welcome_subtitle(inputs)
});