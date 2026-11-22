/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Source_Official_DocInputs */

const en_knowledge_source_official_doc = /** @type {(inputs: Knowledge_Source_Official_DocInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Official Docs`)
};

const zh_knowledge_source_official_doc = /** @type {(inputs: Knowledge_Source_Official_DocInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`官方文档`)
};

/**
* | output |
* | --- |
* | "Official Docs" |
*
* @param {Knowledge_Source_Official_DocInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_source_official_doc = /** @type {((inputs?: Knowledge_Source_Official_DocInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Source_Official_DocInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_source_official_doc(inputs)
	return zh_knowledge_source_official_doc(inputs)
});