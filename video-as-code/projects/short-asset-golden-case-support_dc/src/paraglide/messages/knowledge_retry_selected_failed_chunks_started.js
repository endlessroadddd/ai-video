/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Retry_Selected_Failed_Chunks_StartedInputs */

const en_knowledge_retry_selected_failed_chunks_started = /** @type {(inputs: Knowledge_Retry_Selected_Failed_Chunks_StartedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Retry started for ${i?.count} failed chunk(s)`)
};

const zh_knowledge_retry_selected_failed_chunks_started = /** @type {(inputs: Knowledge_Retry_Selected_Failed_Chunks_StartedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已开始重试 ${i?.count} 个失败分片`)
};

/**
* | output |
* | --- |
* | "Retry started for {count} failed chunk(s)" |
*
* @param {Knowledge_Retry_Selected_Failed_Chunks_StartedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_retry_selected_failed_chunks_started = /** @type {((inputs: Knowledge_Retry_Selected_Failed_Chunks_StartedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Retry_Selected_Failed_Chunks_StartedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_retry_selected_failed_chunks_started(inputs)
	return zh_knowledge_retry_selected_failed_chunks_started(inputs)
});