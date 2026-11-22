/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_KnowledgeInputs */

const en_knowledge_upload_knowledge = /** @type {(inputs: Knowledge_Upload_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Upload`)
};

const zh_knowledge_upload_knowledge = /** @type {(inputs: Knowledge_Upload_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传知识`)
};

/**
* | output |
* | --- |
* | "Upload" |
*
* @param {Knowledge_Upload_KnowledgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_knowledge = /** @type {((inputs?: Knowledge_Upload_KnowledgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_KnowledgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_knowledge(inputs)
	return zh_knowledge_upload_knowledge(inputs)
});