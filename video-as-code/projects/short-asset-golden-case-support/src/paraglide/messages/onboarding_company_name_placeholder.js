/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Name_PlaceholderInputs */

const en_onboarding_company_name_placeholder = /** @type {(inputs: Onboarding_Company_Name_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter company name`)
};

const zh_onboarding_company_name_placeholder = /** @type {(inputs: Onboarding_Company_Name_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入公司名称`)
};

/**
* | output |
* | --- |
* | "Enter company name" |
*
* @param {Onboarding_Company_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_name_placeholder = /** @type {((inputs?: Onboarding_Company_Name_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Name_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_name_placeholder(inputs)
	return zh_onboarding_company_name_placeholder(inputs)
});