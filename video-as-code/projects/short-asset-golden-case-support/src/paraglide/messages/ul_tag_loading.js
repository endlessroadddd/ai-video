/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_LoadingInputs */

const en_ul_tag_loading = /** @type {(inputs: Ul_Tag_LoadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading tags`)
};

const zh_ul_tag_loading = /** @type {(inputs: Ul_Tag_LoadingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加载标签中`)
};

/**
* | output |
* | --- |
* | "Loading tags" |
*
* @param {Ul_Tag_LoadingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_loading = /** @type {((inputs?: Ul_Tag_LoadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_LoadingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_loading(inputs)
	return zh_ul_tag_loading(inputs)
});