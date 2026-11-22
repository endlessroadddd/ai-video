/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Init_ErrorInputs */

const en_ul_tag_init_error = /** @type {(inputs: Ul_Tag_Init_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to initialize default tags`)
};

const zh_ul_tag_init_error = /** @type {(inputs: Ul_Tag_Init_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`初始化默认标签失败`)
};

/**
* | output |
* | --- |
* | "Failed to initialize default tags" |
*
* @param {Ul_Tag_Init_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_init_error = /** @type {((inputs?: Ul_Tag_Init_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Init_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_init_error(inputs)
	return zh_ul_tag_init_error(inputs)
});