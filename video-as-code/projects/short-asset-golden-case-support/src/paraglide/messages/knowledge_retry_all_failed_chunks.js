/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Retry_All_Failed_ChunksInputs */

const en_knowledge_retry_all_failed_chunks = /** @type {(inputs: Knowledge_Retry_All_Failed_ChunksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry all failed chunks`)
};

const zh_knowledge_retry_all_failed_chunks = /** @type {(inputs: Knowledge_Retry_All_Failed_ChunksInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重试全部失败分片`)
};

/**
* | output |
* | --- |
* | "Retry all failed chunks" |
*
* @param {Knowledge_Retry_All_Failed_ChunksInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_retry_all_failed_chunks = /** @type {((inputs?: Knowledge_Retry_All_Failed_ChunksInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Retry_All_Failed_ChunksInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_retry_all_failed_chunks(inputs)
	return zh_knowledge_retry_all_failed_chunks(inputs)
});