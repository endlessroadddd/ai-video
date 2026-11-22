/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Close_Document_PopupInputs */

const en_knowledge_close_document_popup = /** @type {(inputs: Knowledge_Close_Document_PopupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close document popup`)
};

const zh_knowledge_close_document_popup = /** @type {(inputs: Knowledge_Close_Document_PopupInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭文档弹窗`)
};

/**
* | output |
* | --- |
* | "Close document popup" |
*
* @param {Knowledge_Close_Document_PopupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_close_document_popup = /** @type {((inputs?: Knowledge_Close_Document_PopupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Close_Document_PopupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_close_document_popup(inputs)
	return zh_knowledge_close_document_popup(inputs)
});