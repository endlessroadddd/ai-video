/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Create_LoadingInputs */

const en_ul_tag_create_loading = /** @type {(inputs: Ul_Tag_Create_LoadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Creating...`)
};

const zh_ul_tag_create_loading = /** @type {(inputs: Ul_Tag_Create_LoadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建中...`)
};

/**
* | output |
* | --- |
* | "Creating..." |
*
* @param {Ul_Tag_Create_LoadingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_loading = /** @type {((inputs?: Ul_Tag_Create_LoadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_LoadingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_create_loading(inputs)
	return zh_ul_tag_create_loading(inputs)
});