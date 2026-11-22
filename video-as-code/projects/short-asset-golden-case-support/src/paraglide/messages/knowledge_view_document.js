/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_View_DocumentInputs */

const en_knowledge_view_document = /** @type {(inputs: Knowledge_View_DocumentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View document`)
};

const zh_knowledge_view_document = /** @type {(inputs: Knowledge_View_DocumentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看文档`)
};

/**
* | output |
* | --- |
* | "View document" |
*
* @param {Knowledge_View_DocumentInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_view_document = /** @type {((inputs?: Knowledge_View_DocumentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_View_DocumentInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_view_document(inputs)
	return zh_knowledge_view_document(inputs)
});