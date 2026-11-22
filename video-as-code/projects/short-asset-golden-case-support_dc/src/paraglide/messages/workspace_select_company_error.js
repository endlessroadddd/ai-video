/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Workspace_Select_Company_ErrorInputs */

const en_workspace_select_company_error = /** @type {(inputs: Workspace_Select_Company_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company at the top of the page first.`)
};

const zh_workspace_select_company_error = /** @type {(inputs: Workspace_Select_Company_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先在页面顶部选择公司。`)
};

/**
* | output |
* | --- |
* | "Please select a company at the top of the page first." |
*
* @param {Workspace_Select_Company_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const workspace_select_company_error = /** @type {((inputs?: Workspace_Select_Company_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Workspace_Select_Company_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_workspace_select_company_error(inputs)
	return zh_workspace_select_company_error(inputs)
});