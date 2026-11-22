/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs */

const en_knowledge_retry_selected_failed_chunks_required = /** @type {(inputs: Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select failed chunks to retry first`)
};

const zh_knowledge_retry_selected_failed_chunks_required = /** @type {(inputs: Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先勾选要重试的失败分片`)
};

/**
* | output |
* | --- |
* | "Select failed chunks to retry first" |
*
* @param {Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_retry_selected_failed_chunks_required = /** @type {((inputs?: Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Retry_Selected_Failed_Chunks_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_retry_selected_failed_chunks_required(inputs)
	return zh_knowledge_retry_selected_failed_chunks_required(inputs)
});