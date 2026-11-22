/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Save_ErrorInputs */

const en_onboarding_company_save_error = /** @type {(inputs: Onboarding_Company_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to save company information. Please try again later.`)
};

const zh_onboarding_company_save_error = /** @type {(inputs: Onboarding_Company_Save_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公司信息保存失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to save company information. Please try again later." |
*
* @param {Onboarding_Company_Save_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_save_error = /** @type {((inputs?: Onboarding_Company_Save_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Save_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_save_error(inputs)
	return zh_onboarding_company_save_error(inputs)
});