/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Doc_Processing_TimeoutInputs */

const en_knowledge_doc_processing_timeout = /** @type {(inputs: Knowledge_Doc_Processing_TimeoutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Document processing timeout`)
};

const zh_knowledge_doc_processing_timeout = /** @type {(inputs: Knowledge_Doc_Processing_TimeoutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档处理超时`)
};

/**
* | output |
* | --- |
* | "Document processing timeout" |
*
* @param {Knowledge_Doc_Processing_TimeoutInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_doc_processing_timeout = /** @type {((inputs?: Knowledge_Doc_Processing_TimeoutInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Doc_Processing_TimeoutInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_doc_processing_timeout(inputs)
	return zh_knowledge_doc_processing_timeout(inputs)
});