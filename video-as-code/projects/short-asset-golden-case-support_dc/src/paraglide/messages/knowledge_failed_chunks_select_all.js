/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Failed_Chunks_Select_AllInputs */

const en_knowledge_failed_chunks_select_all = /** @type {(inputs: Knowledge_Failed_Chunks_Select_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Select all failed chunks`)
};

const zh_knowledge_failed_chunks_select_all = /** @type {(inputs: Knowledge_Failed_Chunks_Select_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全选失败分片`)
};

/**
* | output |
* | --- |
* | "Select all failed chunks" |
*
* @param {Knowledge_Failed_Chunks_Select_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunks_select_all = /** @type {((inputs?: Knowledge_Failed_Chunks_Select_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunks_Select_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_failed_chunks_select_all(inputs)
	return zh_knowledge_failed_chunks_select_all(inputs)
});