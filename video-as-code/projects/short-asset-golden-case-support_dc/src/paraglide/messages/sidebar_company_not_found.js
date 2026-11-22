/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Company_Not_FoundInputs */

const en_sidebar_company_not_found = /** @type {(inputs: Sidebar_Company_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No company found`)
};

const zh_sidebar_company_not_found = /** @type {(inputs: Sidebar_Company_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到公司`)
};

/**
* | output |
* | --- |
* | "No company found" |
*
* @param {Sidebar_Company_Not_FoundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_company_not_found = /** @type {((inputs?: Sidebar_Company_Not_FoundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Company_Not_FoundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_company_not_found(inputs)
	return zh_sidebar_company_not_found(inputs)
});