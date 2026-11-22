/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Create_TitleInputs */

const en_ul_tag_create_title = /** @type {(inputs: Ul_Tag_Create_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create Tag`)
};

const zh_ul_tag_create_title = /** @type {(inputs: Ul_Tag_Create_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新建标签`)
};

/**
* | output |
* | --- |
* | "Create Tag" |
*
* @param {Ul_Tag_Create_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_create_title = /** @type {((inputs?: Ul_Tag_Create_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Create_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_create_title(inputs)
	return zh_ul_tag_create_title(inputs)
});