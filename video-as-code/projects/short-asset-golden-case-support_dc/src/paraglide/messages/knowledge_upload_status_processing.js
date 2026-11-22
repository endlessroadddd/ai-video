/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Status_ProcessingInputs */

const en_knowledge_upload_status_processing = /** @type {(inputs: Knowledge_Upload_Status_ProcessingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`processing`)
};

const zh_knowledge_upload_status_processing = /** @type {(inputs: Knowledge_Upload_Status_ProcessingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`处理中`)
};

/**
* | output |
* | --- |
* | "processing" |
*
* @param {Knowledge_Upload_Status_ProcessingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_status_processing = /** @type {((inputs?: Knowledge_Upload_Status_ProcessingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Status_ProcessingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_status_processing(inputs)
	return zh_knowledge_upload_status_processing(inputs)
});