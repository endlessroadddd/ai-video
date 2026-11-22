/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Upload_Doc_RequiredInputs */

const en_kb_upload_doc_required = /** @type {(inputs: Kb_Upload_Doc_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please select a document before uploading.`)
};

const zh_kb_upload_doc_required = /** @type {(inputs: Kb_Upload_Doc_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请先选择需要上传的文档。`)
};

/**
* | output |
* | --- |
* | "Please select a document before uploading." |
*
* @param {Kb_Upload_Doc_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_required = /** @type {((inputs?: Kb_Upload_Doc_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_doc_required(inputs)
	return zh_kb_upload_doc_required(inputs)
});