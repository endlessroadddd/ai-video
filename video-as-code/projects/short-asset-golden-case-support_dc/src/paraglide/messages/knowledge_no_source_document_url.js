/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_No_Source_Document_UrlInputs */

const en_knowledge_no_source_document_url = /** @type {(inputs: Knowledge_No_Source_Document_UrlInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Document URL not found`)
};

const zh_knowledge_no_source_document_url = /** @type {(inputs: Knowledge_No_Source_Document_UrlInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到可查看的文档地址`)
};

/**
* | output |
* | --- |
* | "Document URL not found" |
*
* @param {Knowledge_No_Source_Document_UrlInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_no_source_document_url = /** @type {((inputs?: Knowledge_No_Source_Document_UrlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_No_Source_Document_UrlInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_no_source_document_url(inputs)
	return zh_knowledge_no_source_document_url(inputs)
});