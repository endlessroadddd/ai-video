/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Tab_ItemsInputs */

const en_knowledge_tab_items = /** @type {(inputs: Knowledge_Tab_ItemsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Knowledge`)
};

const zh_knowledge_tab_items = /** @type {(inputs: Knowledge_Tab_ItemsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有知识`)
};

/**
* | output |
* | --- |
* | "All Knowledge" |
*
* @param {Knowledge_Tab_ItemsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_tab_items = /** @type {((inputs?: Knowledge_Tab_ItemsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Tab_ItemsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_tab_items(inputs)
	return zh_knowledge_tab_items(inputs)
});