/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Create_ErrorInputs */

const en_ul_tag_create_error = /** @type {(inputs: Ul_Tag_Create_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to create tag`)
};

const zh_ul_tag_create_error = /** @type {(inputs: Ul_Tag_Create_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建标签失败`)
};

/**
* | output |
* | --- |
* | "Failed to create tag" |
*
* @param {Ul_Tag_Create_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_error = /** @type {((inputs?: Ul_Tag_Create_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_create_error(inputs)
	return zh_ul_tag_create_error(inputs)
});