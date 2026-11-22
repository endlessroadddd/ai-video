/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Manual_Knowledge_PrefixInputs */

const en_knowledge_manual_knowledge_prefix = /** @type {(inputs: Knowledge_Manual_Knowledge_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manual knowledge`)
};

const zh_knowledge_manual_knowledge_prefix = /** @type {(inputs: Knowledge_Manual_Knowledge_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`手动知识`)
};

/**
* | output |
* | --- |
* | "Manual knowledge" |
*
* @param {Knowledge_Manual_Knowledge_PrefixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_manual_knowledge_prefix = /** @type {((inputs?: Knowledge_Manual_Knowledge_PrefixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Manual_Knowledge_PrefixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_manual_knowledge_prefix(inputs)
	return zh_knowledge_manual_knowledge_prefix(inputs)
});