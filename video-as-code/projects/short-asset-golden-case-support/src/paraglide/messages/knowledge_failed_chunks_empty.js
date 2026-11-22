/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Failed_Chunks_EmptyInputs */

const en_knowledge_failed_chunks_empty = /** @type {(inputs: Knowledge_Failed_Chunks_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No failed chunks in this document`)
};

const zh_knowledge_failed_chunks_empty = /** @type {(inputs: Knowledge_Failed_Chunks_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前文档没有失败分片`)
};

/**
* | output |
* | --- |
* | "No failed chunks in this document" |
*
* @param {Knowledge_Failed_Chunks_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunks_empty = /** @type {((inputs?: Knowledge_Failed_Chunks_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunks_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_failed_chunks_empty(inputs)
	return zh_knowledge_failed_chunks_empty(inputs)
});