/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_No_Image_AttachmentsInputs */

const en_knowledge_no_image_attachments = /** @type {(inputs: Knowledge_No_Image_AttachmentsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No previewable image attachments`)
};

const zh_knowledge_no_image_attachments = /** @type {(inputs: Knowledge_No_Image_AttachmentsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这个文档没有可预览的图片附件`)
};

/**
* | output |
* | --- |
* | "No previewable image attachments" |
*
* @param {Knowledge_No_Image_AttachmentsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_no_image_attachments = /** @type {((inputs?: Knowledge_No_Image_AttachmentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_No_Image_AttachmentsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_no_image_attachments(inputs)
	return zh_knowledge_no_image_attachments(inputs)
});