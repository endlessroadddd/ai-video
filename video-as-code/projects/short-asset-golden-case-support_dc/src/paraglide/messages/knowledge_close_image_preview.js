/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Close_Image_PreviewInputs */

const en_knowledge_close_image_preview = /** @type {(inputs: Knowledge_Close_Image_PreviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close image preview`)
};

const zh_knowledge_close_image_preview = /** @type {(inputs: Knowledge_Close_Image_PreviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭图片预览`)
};

/**
* | output |
* | --- |
* | "Close image preview" |
*
* @param {Knowledge_Close_Image_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_close_image_preview = /** @type {((inputs?: Knowledge_Close_Image_PreviewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Close_Image_PreviewInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_close_image_preview(inputs)
	return zh_knowledge_close_image_preview(inputs)
});