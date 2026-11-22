/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Image_Preview_HintInputs */

const en_knowledge_image_preview_hint = /** @type {(inputs: Knowledge_Image_Preview_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Click to preview image`)
};

const zh_knowledge_image_preview_hint = /** @type {(inputs: Knowledge_Image_Preview_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点击缩略图可预览大图`)
};

/**
* | output |
* | --- |
* | "Click to preview image" |
*
* @param {Knowledge_Image_Preview_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_image_preview_hint = /** @type {((inputs?: Knowledge_Image_Preview_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Image_Preview_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_image_preview_hint(inputs)
	return zh_knowledge_image_preview_hint(inputs)
});