/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Tab_DocsInputs */

const en_knowledge_tab_docs = /** @type {(inputs: Knowledge_Tab_DocsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Documents`)
};

const zh_knowledge_tab_docs = /** @type {(inputs: Knowledge_Tab_DocsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档`)
};

/**
* | output |
* | --- |
* | "Documents" |
*
* @param {Knowledge_Tab_DocsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_tab_docs = /** @type {((inputs?: Knowledge_Tab_DocsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Tab_DocsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_tab_docs(inputs)
	return zh_knowledge_tab_docs(inputs)
});