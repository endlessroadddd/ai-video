/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_No_Chunk_DataInputs */

const en_knowledge_no_chunk_data = /** @type {(inputs: Knowledge_No_Chunk_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No knowledge rows in this document`)
};

const zh_knowledge_no_chunk_data = /** @type {(inputs: Knowledge_No_Chunk_DataInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前文档没有知识数据`)
};

/**
* | output |
* | --- |
* | "No knowledge rows in this document" |
*
* @param {Knowledge_No_Chunk_DataInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_no_chunk_data = /** @type {((inputs?: Knowledge_No_Chunk_DataInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_No_Chunk_DataInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_no_chunk_data(inputs)
	return zh_knowledge_no_chunk_data(inputs)
});