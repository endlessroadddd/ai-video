/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ min: NonNullable<unknown>, max: NonNullable<unknown> }} Onboarding_Company_Name_Length_ErrorInputs */

const en_onboarding_company_name_length_error = /** @type {(inputs: Onboarding_Company_Name_Length_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Company name must be ${i?.min}-${i?.max} characters.`)
};

const zh_onboarding_company_name_length_error = /** @type {(inputs: Onboarding_Company_Name_Length_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`公司名称需为 ${i?.min}-${i?.max} 个字符。`)
};

/**
* | output |
* | --- |
* | "Company name must be {min}-{max} characters." |
*
* @param {Onboarding_Company_Name_Length_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_name_length_error = /** @type {((inputs: Onboarding_Company_Name_Length_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Name_Length_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_name_length_error(inputs)
	return zh_onboarding_company_name_length_error(inputs)
});