/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Doc_Drag_HintInputs */

const en_knowledge_upload_doc_drag_hint = /** @type {(inputs: Knowledge_Upload_Doc_Drag_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Or drag file here`)
};

const zh_knowledge_upload_doc_drag_hint = /** @type {(inputs: Knowledge_Upload_Doc_Drag_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`或拖拽文件到此处`)
};

/**
* | output |
* | --- |
* | "Or drag file here" |
*
* @param {Knowledge_Upload_Doc_Drag_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_doc_drag_hint = /** @type {((inputs?: Knowledge_Upload_Doc_Drag_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Doc_Drag_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_doc_drag_hint(inputs)
	return zh_knowledge_upload_doc_drag_hint(inputs)
});