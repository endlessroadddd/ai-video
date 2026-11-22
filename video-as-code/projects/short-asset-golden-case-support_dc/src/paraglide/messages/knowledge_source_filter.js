/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Source_FilterInputs */

const en_knowledge_source_filter = /** @type {(inputs: Knowledge_Source_FilterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Source`)
};

const zh_knowledge_source_filter = /** @type {(inputs: Knowledge_Source_FilterInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`来源`)
};

/**
* | output |
* | --- |
* | "Source" |
*
* @param {Knowledge_Source_FilterInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_source_filter = /** @type {((inputs?: Knowledge_Source_FilterInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Source_FilterInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_source_filter(inputs)
	return zh_knowledge_source_filter(inputs)
});