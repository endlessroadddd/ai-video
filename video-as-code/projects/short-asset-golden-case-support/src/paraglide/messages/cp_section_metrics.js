/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Cp_Section_MetricsInputs */

const en_cp_section_metrics = /** @type {(inputs: Cp_Section_MetricsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Key Metrics`)
};

const zh_cp_section_metrics = /** @type {(inputs: Cp_Section_MetricsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`核心指标卡`)
};

/**
* | output |
* | --- |
* | "Key Metrics" |
*
* @param {Cp_Section_MetricsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const cp_section_metrics = /** @type {((inputs?: Cp_Section_MetricsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cp_Section_MetricsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_cp_section_metrics(inputs)
	return zh_cp_section_metrics(inputs)
});