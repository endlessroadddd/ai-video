/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Load_Attachments_FailedInputs */

const en_knowledge_load_attachments_failed = /** @type {(inputs: Knowledge_Load_Attachments_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load attachments`)
};

const zh_knowledge_load_attachments_failed = /** @type {(inputs: Knowledge_Load_Attachments_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载附件失败`)
};

/**
* | output |
* | --- |
* | "Failed to load attachments" |
*
* @param {Knowledge_Load_Attachments_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_load_attachments_failed = /** @type {((inputs?: Knowledge_Load_Attachments_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Load_Attachments_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_load_attachments_failed(inputs)
	return zh_knowledge_load_attachments_failed(inputs)
});