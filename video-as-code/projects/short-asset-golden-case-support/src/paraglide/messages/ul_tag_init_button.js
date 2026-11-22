/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Init_ButtonInputs */

const en_ul_tag_init_button = /** @type {(inputs: Ul_Tag_Init_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Initialize Default Tags`)
};

const zh_ul_tag_init_button = /** @type {(inputs: Ul_Tag_Init_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`初始化默认标签`)
};

/**
* | output |
* | --- |
* | "Initialize Default Tags" |
*
* @param {Ul_Tag_Init_ButtonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_init_button = /** @type {((inputs?: Ul_Tag_Init_ButtonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Init_ButtonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_init_button(inputs)
	return zh_ul_tag_init_button(inputs)
});