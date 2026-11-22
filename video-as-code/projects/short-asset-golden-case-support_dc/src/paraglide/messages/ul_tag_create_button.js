/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Create_ButtonInputs */

const en_ul_tag_create_button = /** @type {(inputs: Ul_Tag_Create_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create Tag`)
};

const zh_ul_tag_create_button = /** @type {(inputs: Ul_Tag_Create_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建标签`)
};

/**
* | output |
* | --- |
* | "Create Tag" |
*
* @param {Ul_Tag_Create_ButtonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_button = /** @type {((inputs?: Ul_Tag_Create_ButtonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_ButtonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_create_button(inputs)
	return zh_ul_tag_create_button(inputs)
});