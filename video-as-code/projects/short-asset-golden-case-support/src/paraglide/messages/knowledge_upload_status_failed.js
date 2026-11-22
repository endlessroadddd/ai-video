/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Status_FailedInputs */

const en_knowledge_upload_status_failed = /** @type {(inputs: Knowledge_Upload_Status_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`failed`)
};

const zh_knowledge_upload_status_failed = /** @type {(inputs: Knowledge_Upload_Status_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`失败`)
};

/**
* | output |
* | --- |
* | "failed" |
*
* @param {Knowledge_Upload_Status_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_status_failed = /** @type {((inputs?: Knowledge_Upload_Status_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Status_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_status_failed(inputs)
	return zh_knowledge_upload_status_failed(inputs)
});