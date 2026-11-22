/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Settings_Select_Company_FirstInputs */

const en_settings_select_company_first = /** @type {(inputs: Settings_Select_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a company first.`)
};

const zh_settings_select_company_first = /** @type {(inputs: Settings_Select_Company_FirstInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择公司。`)
};

/**
* | output |
* | --- |
* | "Please select a company first." |
*
* @param {Settings_Select_Company_FirstInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const settings_select_company_first = /** @type {((inputs?: Settings_Select_Company_FirstInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Settings_Select_Company_FirstInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_settings_select_company_first(inputs)
	return zh_settings_select_company_first(inputs)
});