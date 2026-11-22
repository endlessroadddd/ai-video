/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Image_AttachmentsInputs */

const en_knowledge_image_attachments = /** @type {(inputs: Knowledge_Image_AttachmentsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Image Attachments`)
};

const zh_knowledge_image_attachments = /** @type {(inputs: Knowledge_Image_AttachmentsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`图片附件`)
};

/**
* | output |
* | --- |
* | "Image Attachments" |
*
* @param {Knowledge_Image_AttachmentsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_image_attachments = /** @type {((inputs?: Knowledge_Image_AttachmentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Image_AttachmentsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_image_attachments(inputs)
	return zh_knowledge_image_attachments(inputs)
});