/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Document_Status_Load_FailedInputs */

const en_knowledge_document_status_load_failed = /** @type {(inputs: Knowledge_Document_Status_Load_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load document status`)
};

const zh_knowledge_document_status_load_failed = /** @type {(inputs: Knowledge_Document_Status_Load_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载文档状态失败`)
};

/**
* | output |
* | --- |
* | "Failed to load document status" |
*
* @param {Knowledge_Document_Status_Load_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_document_status_load_failed = /** @type {((inputs?: Knowledge_Document_Status_Load_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Document_Status_Load_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_document_status_load_failed(inputs)
	return zh_knowledge_document_status_load_failed(inputs)
});