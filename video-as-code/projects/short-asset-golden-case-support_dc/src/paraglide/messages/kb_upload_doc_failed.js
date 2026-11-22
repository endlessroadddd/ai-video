/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ status: NonNullable<unknown> }} Kb_Upload_Doc_FailedInputs */

const en_kb_upload_doc_failed = /** @type {(inputs: Kb_Upload_Doc_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Document processing failed (status: ${i?.status}).`)
};

const zh_kb_upload_doc_failed = /** @type {(inputs: Kb_Upload_Doc_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`文档处理失败（状态：${i?.status}）。`)
};

/**
* | output |
* | --- |
* | "Document processing failed (status: {status})." |
*
* @param {Kb_Upload_Doc_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_failed = /** @type {((inputs: Kb_Upload_Doc_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_doc_failed(inputs)
	return zh_kb_upload_doc_failed(inputs)
});