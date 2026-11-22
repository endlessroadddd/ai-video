/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Failed_Chunk_Heading_FallbackInputs */

const en_knowledge_failed_chunk_heading_fallback = /** @type {(inputs: Knowledge_Failed_Chunk_Heading_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Untitled chunk`)
};

const zh_knowledge_failed_chunk_heading_fallback = /** @type {(inputs: Knowledge_Failed_Chunk_Heading_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未命名分片`)
};

/**
* | output |
* | --- |
* | "Untitled chunk" |
*
* @param {Knowledge_Failed_Chunk_Heading_FallbackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunk_heading_fallback = /** @type {((inputs?: Knowledge_Failed_Chunk_Heading_FallbackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunk_Heading_FallbackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_failed_chunk_heading_fallback(inputs)
	return zh_knowledge_failed_chunk_heading_fallback(inputs)
});