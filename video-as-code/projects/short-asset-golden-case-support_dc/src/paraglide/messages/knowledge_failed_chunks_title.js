/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Failed_Chunks_TitleInputs */

const en_knowledge_failed_chunks_title = /** @type {(inputs: Knowledge_Failed_Chunks_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed Chunks`)
};

const zh_knowledge_failed_chunks_title = /** @type {(inputs: Knowledge_Failed_Chunks_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`失败分片`)
};

/**
* | output |
* | --- |
* | "Failed Chunks" |
*
* @param {Knowledge_Failed_Chunks_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunks_title = /** @type {((inputs?: Knowledge_Failed_Chunks_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunks_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_failed_chunks_title(inputs)
	return zh_knowledge_failed_chunks_title(inputs)
});