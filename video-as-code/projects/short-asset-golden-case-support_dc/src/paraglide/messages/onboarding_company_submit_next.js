/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Submit_NextInputs */

const en_onboarding_company_submit_next = /** @type {(inputs: Onboarding_Company_Submit_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

const zh_onboarding_company_submit_next = /** @type {(inputs: Onboarding_Company_Submit_NextInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一步`)
};

/**
* | output |
* | --- |
* | "Next" |
*
* @param {Onboarding_Company_Submit_NextInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_submit_next = /** @type {((inputs?: Onboarding_Company_Submit_NextInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Submit_NextInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_submit_next(inputs)
	return zh_onboarding_company_submit_next(inputs)
});