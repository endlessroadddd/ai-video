/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Init_ErrorInputs */

const en_onboarding_company_init_error = /** @type {(inputs: Onboarding_Company_Init_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Company created successfully, but onboarding could not be initialized.`)
};

const zh_onboarding_company_init_error = /** @type {(inputs: Onboarding_Company_Init_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公司创建成功，但未能初始化 onboarding。`)
};

/**
* | output |
* | --- |
* | "Company created successfully, but onboarding could not be initialized." |
*
* @param {Onboarding_Company_Init_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_init_error = /** @type {((inputs?: Onboarding_Company_Init_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Init_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_init_error(inputs)
	return zh_onboarding_company_init_error(inputs)
});