/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Total_Count_SuffixInputs */

const en_knowledge_total_count_suffix = /** @type {(inputs: Knowledge_Total_Count_SuffixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (``)
};

const zh_knowledge_total_count_suffix = /** @type {(inputs: Knowledge_Total_Count_SuffixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`条`)
};

/**
* | output |
* | --- |
* | "" |
*
* @param {Knowledge_Total_Count_SuffixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_total_count_suffix = /** @type {((inputs?: Knowledge_Total_Count_SuffixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Total_Count_SuffixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_total_count_suffix(inputs)
	return zh_knowledge_total_count_suffix(inputs)
});