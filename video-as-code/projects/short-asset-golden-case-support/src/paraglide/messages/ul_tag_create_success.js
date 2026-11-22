/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Create_SuccessInputs */

const en_ul_tag_create_success = /** @type {(inputs: Ul_Tag_Create_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tag created`)
};

const zh_ul_tag_create_success = /** @type {(inputs: Ul_Tag_Create_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签已创建`)
};

/**
* | output |
* | --- |
* | "Tag created" |
*
* @param {Ul_Tag_Create_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_success = /** @type {((inputs?: Ul_Tag_Create_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_create_success(inputs)
	return zh_ul_tag_create_success(inputs)
});