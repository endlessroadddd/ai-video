/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Upload_Status_UploadingInputs */

const en_knowledge_upload_status_uploading = /** @type {(inputs: Knowledge_Upload_Status_UploadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`uploading`)
};

const zh_knowledge_upload_status_uploading = /** @type {(inputs: Knowledge_Upload_Status_UploadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`上传中`)
};

/**
* | output |
* | --- |
* | "uploading" |
*
* @param {Knowledge_Upload_Status_UploadingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_upload_status_uploading = /** @type {((inputs?: Knowledge_Upload_Status_UploadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Upload_Status_UploadingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_upload_status_uploading(inputs)
	return zh_knowledge_upload_status_uploading(inputs)
});