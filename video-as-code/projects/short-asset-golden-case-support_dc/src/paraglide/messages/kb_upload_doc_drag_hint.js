/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Upload_Doc_Drag_HintInputs */

const en_kb_upload_doc_drag_hint = /** @type {(inputs: Kb_Upload_Doc_Drag_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Or drag and drop files here`)
};

const zh_kb_upload_doc_drag_hint = /** @type {(inputs: Kb_Upload_Doc_Drag_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`或将文件拖放至此处`)
};

/**
* | output |
* | --- |
* | "Or drag and drop files here" |
*
* @param {Kb_Upload_Doc_Drag_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_upload_doc_drag_hint = /** @type {((inputs?: Kb_Upload_Doc_Drag_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Upload_Doc_Drag_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_upload_doc_drag_hint(inputs)
	return zh_kb_upload_doc_drag_hint(inputs)
});