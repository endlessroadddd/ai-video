/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Upload_Doc_Format_HintInputs */

const en_kb_upload_doc_format_hint = /** @type {(inputs: Kb_Upload_Doc_Format_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supported file formats: pdf, doc, docx`)
};

const zh_kb_upload_doc_format_hint = /** @type {(inputs: Kb_Upload_Doc_Format_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`支持上传文件格式为：pdf, doc, docx`)
};

/**
* | output |
* | --- |
* | "Supported file formats: pdf, doc, docx" |
*
* @param {Kb_Upload_Doc_Format_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_format_hint = /** @type {((inputs?: Kb_Upload_Doc_Format_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_Format_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_doc_format_hint(inputs)
	return zh_kb_upload_doc_format_hint(inputs)
});