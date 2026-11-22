/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Select_CompanyInputs */

const en_sidebar_select_company = /** @type {(inputs: Sidebar_Select_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select company`)
};

const zh_sidebar_select_company = /** @type {(inputs: Sidebar_Select_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择公司`)
};

/**
* | output |
* | --- |
* | "Select company" |
*
* @param {Sidebar_Select_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_select_company = /** @type {((inputs?: Sidebar_Select_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Select_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_select_company(inputs)
	return zh_sidebar_select_company(inputs)
});