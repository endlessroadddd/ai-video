/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Status_CompletedInputs */

const en_knowledge_upload_status_completed = /** @type {(inputs: Knowledge_Upload_Status_CompletedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`completed`)
};

const zh_knowledge_upload_status_completed = /** @type {(inputs: Knowledge_Upload_Status_CompletedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已完成`)
};

/**
* | output |
* | --- |
* | "completed" |
*
* @param {Knowledge_Upload_Status_CompletedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_status_completed = /** @type {((inputs?: Knowledge_Upload_Status_CompletedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Status_CompletedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_status_completed(inputs)
	return zh_knowledge_upload_status_completed(inputs)
});