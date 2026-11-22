/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Submit_Create_ContinueInputs */

const en_onboarding_company_submit_create_continue = /** @type {(inputs: Onboarding_Company_Submit_Create_ContinueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create and continue`)
};

const zh_onboarding_company_submit_create_continue = /** @type {(inputs: Onboarding_Company_Submit_Create_ContinueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建并继续`)
};

/**
* | output |
* | --- |
* | "Create and continue" |
*
* @param {Onboarding_Company_Submit_Create_ContinueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_submit_create_continue = /** @type {((inputs?: Onboarding_Company_Submit_Create_ContinueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Submit_Create_ContinueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_submit_create_continue(inputs)
	return zh_onboarding_company_submit_create_continue(inputs)
});