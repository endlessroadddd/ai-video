/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Knowledge_Upload_CompletedInputs */

const en_knowledge_upload_completed = /** @type {(inputs: Knowledge_Upload_CompletedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} uploaded and processed successfully`)
};

const zh_knowledge_upload_completed = /** @type {(inputs: Knowledge_Upload_CompletedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.name} 上传并处理完成`)
};

/**
* | output |
* | --- |
* | "{name} uploaded and processed successfully" |
*
* @param {Knowledge_Upload_CompletedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_completed = /** @type {((inputs: Knowledge_Upload_CompletedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_CompletedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_completed(inputs)
	return zh_knowledge_upload_completed(inputs)
});