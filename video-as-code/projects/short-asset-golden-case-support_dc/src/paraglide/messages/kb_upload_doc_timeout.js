/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Upload_Doc_TimeoutInputs */

const en_kb_upload_doc_timeout = /** @type {(inputs: Kb_Upload_Doc_TimeoutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Document processing timed out. Please check status in Documents later.`)
};

const zh_kb_upload_doc_timeout = /** @type {(inputs: Kb_Upload_Doc_TimeoutInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档处理超时，请稍后在文档列表查看状态。`)
};

/**
* | output |
* | --- |
* | "Document processing timed out. Please check status in Documents later." |
*
* @param {Kb_Upload_Doc_TimeoutInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_timeout = /** @type {((inputs?: Kb_Upload_Doc_TimeoutInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_TimeoutInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_doc_timeout(inputs)
	return zh_kb_upload_doc_timeout(inputs)
});