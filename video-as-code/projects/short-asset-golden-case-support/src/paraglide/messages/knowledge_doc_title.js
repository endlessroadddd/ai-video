/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Doc_TitleInputs */

const en_knowledge_doc_title = /** @type {(inputs: Knowledge_Doc_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Title`)
};

const zh_knowledge_doc_title = /** @type {(inputs: Knowledge_Doc_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标题`)
};

/**
* | output |
* | --- |
* | "Title" |
*
* @param {Knowledge_Doc_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_doc_title = /** @type {((inputs?: Knowledge_Doc_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Doc_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_doc_title(inputs)
	return zh_knowledge_doc_title(inputs)
});