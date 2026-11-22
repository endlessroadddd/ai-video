/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Doc_ClickInputs */

const en_knowledge_upload_doc_click = /** @type {(inputs: Knowledge_Upload_Doc_ClickInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Click to upload`)
};

const zh_knowledge_upload_doc_click = /** @type {(inputs: Knowledge_Upload_Doc_ClickInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点击上传`)
};

/**
* | output |
* | --- |
* | "Click to upload" |
*
* @param {Knowledge_Upload_Doc_ClickInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_doc_click = /** @type {((inputs?: Knowledge_Upload_Doc_ClickInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Doc_ClickInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_doc_click(inputs)
	return zh_knowledge_upload_doc_click(inputs)
});