/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Doc_Format_HintInputs */

const en_knowledge_upload_doc_format_hint = /** @type {(inputs: Knowledge_Upload_Doc_Format_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Supports PDF / DOC / DOCX / MD`)
};

const zh_knowledge_upload_doc_format_hint = /** @type {(inputs: Knowledge_Upload_Doc_Format_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`支持 PDF / DOC / DOCX / MD`)
};

/**
* | output |
* | --- |
* | "Supports PDF / DOC / DOCX / MD" |
*
* @param {Knowledge_Upload_Doc_Format_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_doc_format_hint = /** @type {((inputs?: Knowledge_Upload_Doc_Format_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Doc_Format_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_doc_format_hint(inputs)
	return zh_knowledge_upload_doc_format_hint(inputs)
});