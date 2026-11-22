/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Upload_Doc_Missing_Document_IdInputs */

const en_kb_upload_doc_missing_document_id = /** @type {(inputs: Kb_Upload_Doc_Missing_Document_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload succeeded but document_id is missing. Please try again.`)
};

const zh_kb_upload_doc_missing_document_id = /** @type {(inputs: Kb_Upload_Doc_Missing_Document_IdInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传成功但未返回 document_id，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Upload succeeded but document_id is missing. Please try again." |
*
* @param {Kb_Upload_Doc_Missing_Document_IdInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_missing_document_id = /** @type {((inputs?: Kb_Upload_Doc_Missing_Document_IdInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_Missing_Document_IdInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_doc_missing_document_id(inputs)
	return zh_kb_upload_doc_missing_document_id(inputs)
});