/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Upload_Doc_TodoInputs */

const en_kb_upload_doc_todo = /** @type {(inputs: Kb_Upload_Doc_TodoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Document upload will be wired to the upload endpoint next; manual mode is available now.`)
};

const zh_kb_upload_doc_todo = /** @type {(inputs: Kb_Upload_Doc_TodoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档上传功能下一步接入 upload 接口，当前先支持手动添加。`)
};

/**
* | output |
* | --- |
* | "Document upload will be wired to the upload endpoint next; manual mode is available now." |
*
* @param {Kb_Upload_Doc_TodoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_todo = /** @type {((inputs?: Kb_Upload_Doc_TodoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_TodoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_doc_todo(inputs)
	return zh_kb_upload_doc_todo(inputs)
});