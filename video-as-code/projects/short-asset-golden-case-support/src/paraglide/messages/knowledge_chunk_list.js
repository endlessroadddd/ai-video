/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Chunk_ListInputs */

const en_knowledge_chunk_list = /** @type {(inputs: Knowledge_Chunk_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Knowledge list`)
};

const zh_knowledge_chunk_list = /** @type {(inputs: Knowledge_Chunk_ListInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`知识列表`)
};

/**
* | output |
* | --- |
* | "Knowledge list" |
*
* @param {Knowledge_Chunk_ListInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_chunk_list = /** @type {((inputs?: Knowledge_Chunk_ListInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Chunk_ListInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_chunk_list(inputs)
	return zh_knowledge_chunk_list(inputs)
});