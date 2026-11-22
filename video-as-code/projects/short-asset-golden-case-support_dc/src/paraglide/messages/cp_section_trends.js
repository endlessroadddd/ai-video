/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Section_TrendsInputs */

const en_cp_section_trends = /** @type {(inputs: Cp_Section_TrendsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Trend Insights`)
};

const zh_cp_section_trends = /** @type {(inputs: Cp_Section_TrendsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`趋势洞察`)
};

/**
* | output |
* | --- |
* | "Trend Insights" |
*
* @param {Cp_Section_TrendsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_section_trends = /** @type {((inputs?: Cp_Section_TrendsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Section_TrendsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_section_trends(inputs)
	return zh_cp_section_trends(inputs)
});