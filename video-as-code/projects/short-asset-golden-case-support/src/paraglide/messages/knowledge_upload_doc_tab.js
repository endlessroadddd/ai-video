/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Doc_TabInputs */

const en_knowledge_upload_doc_tab = /** @type {(inputs: Knowledge_Upload_Doc_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload Document`)
};

const zh_knowledge_upload_doc_tab = /** @type {(inputs: Knowledge_Upload_Doc_TabInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传文档`)
};

/**
* | output |
* | --- |
* | "Upload Document" |
*
* @param {Knowledge_Upload_Doc_TabInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_doc_tab = /** @type {((inputs?: Knowledge_Upload_Doc_TabInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Doc_TabInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_doc_tab(inputs)
	return zh_knowledge_upload_doc_tab(inputs)
});