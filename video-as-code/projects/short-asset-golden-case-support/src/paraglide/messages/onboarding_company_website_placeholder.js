/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Onboarding_Company_Website_PlaceholderInputs */

const en_onboarding_company_website_placeholder = /** @type {(inputs: Onboarding_Company_Website_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`https://example.com`)
};

const zh_onboarding_company_website_placeholder = /** @type {(inputs: Onboarding_Company_Website_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`https://example.com`)
};

/**
* | output |
* | --- |
* | "https://example.com" |
*
* @param {Onboarding_Company_Website_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const onboarding_company_website_placeholder = /** @type {((inputs?: Onboarding_Company_Website_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Onboarding_Company_Website_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_onboarding_company_website_placeholder(inputs)
	return zh_onboarding_company_website_placeholder(inputs)
});