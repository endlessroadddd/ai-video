/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Init_SuccessInputs */

const en_ul_tag_init_success = /** @type {(inputs: Ul_Tag_Init_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Default tags synced`)
};

const zh_ul_tag_init_success = /** @type {(inputs: Ul_Tag_Init_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`默认标签已同步`)
};

/**
* | output |
* | --- |
* | "Default tags synced" |
*
* @param {Ul_Tag_Init_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_init_success = /** @type {((inputs?: Ul_Tag_Init_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Init_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_init_success(inputs)
	return zh_ul_tag_init_success(inputs)
});