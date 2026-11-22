/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sidebar_Item_Knowledge_BaseInputs */

const en_sidebar_item_knowledge_base = /** @type {(inputs: Sidebar_Item_Knowledge_BaseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wiki`)
};

const zh_sidebar_item_knowledge_base = /** @type {(inputs: Sidebar_Item_Knowledge_BaseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`知识库`)
};

/**
* | output |
* | --- |
* | "Wiki" |
*
* @param {Sidebar_Item_Knowledge_BaseInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sidebar_item_knowledge_base = /** @type {((inputs?: Sidebar_Item_Knowledge_BaseInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_Item_Knowledge_BaseInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_sidebar_item_knowledge_base(inputs)
	return zh_sidebar_item_knowledge_base(inputs)
});