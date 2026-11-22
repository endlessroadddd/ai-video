/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Source_TitleInputs */

const en_knowledge_source_title = /** @type {(inputs: Knowledge_Source_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Knowledge Source`)
};

const zh_knowledge_source_title = /** @type {(inputs: Knowledge_Source_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`知识来源`)
};

/**
* | output |
* | --- |
* | "Knowledge Source" |
*
* @param {Knowledge_Source_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_source_title = /** @type {((inputs?: Knowledge_Source_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Source_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_source_title(inputs)
	return zh_knowledge_source_title(inputs)
});