/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Search_PlaceholderInputs */

const en_knowledge_search_placeholder = /** @type {(inputs: Knowledge_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search knowledge`)
};

const zh_knowledge_search_placeholder = /** @type {(inputs: Knowledge_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索知识`)
};

/**
* | output |
* | --- |
* | "Search knowledge" |
*
* @param {Knowledge_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_search_placeholder = /** @type {((inputs?: Knowledge_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_search_placeholder(inputs)
	return zh_knowledge_search_placeholder(inputs)
});