/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Integration_Empty_Without_CompanyInputs */

const en_integration_empty_without_company = /** @type {(inputs: Integration_Empty_Without_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company first, then add a community.`)
};

const zh_integration_empty_without_company = /** @type {(inputs: Integration_Empty_Without_CompanyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司后再添加社区。`)
};

/**
* | output |
* | --- |
* | "Please select a company first, then add a community." |
*
* @param {Integration_Empty_Without_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const integration_empty_without_company = /** @type {((inputs?: Integration_Empty_Without_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Integration_Empty_Without_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_integration_empty_without_company(inputs)
	return zh_integration_empty_without_company(inputs)
});