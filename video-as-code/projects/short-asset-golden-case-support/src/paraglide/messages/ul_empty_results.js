/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Empty_ResultsInputs */

const en_ul_empty_results = /** @type {(inputs: Ul_Empty_ResultsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No users found with current filters.`)
};

const zh_ul_empty_results = /** @type {(inputs: Ul_Empty_ResultsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前筛选条件下暂无用户结果。`)
};

/**
* | output |
* | --- |
* | "No users found with current filters." |
*
* @param {Ul_Empty_ResultsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_empty_results = /** @type {((inputs?: Ul_Empty_ResultsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Empty_ResultsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_empty_results(inputs)
	return zh_ul_empty_results(inputs)
});