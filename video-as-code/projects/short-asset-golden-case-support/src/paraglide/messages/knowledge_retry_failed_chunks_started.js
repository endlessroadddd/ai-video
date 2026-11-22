/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Retry_Failed_Chunks_StartedInputs */

const en_knowledge_retry_failed_chunks_started = /** @type {(inputs: Knowledge_Retry_Failed_Chunks_StartedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry started for failed chunks in this document`)
};

const zh_knowledge_retry_failed_chunks_started = /** @type {(inputs: Knowledge_Retry_Failed_Chunks_StartedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已开始重试当前文档的失败分片`)
};

/**
* | output |
* | --- |
* | "Retry started for failed chunks in this document" |
*
* @param {Knowledge_Retry_Failed_Chunks_StartedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_retry_failed_chunks_started = /** @type {((inputs?: Knowledge_Retry_Failed_Chunks_StartedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Retry_Failed_Chunks_StartedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_retry_failed_chunks_started(inputs)
	return zh_knowledge_retry_failed_chunks_started(inputs)
});