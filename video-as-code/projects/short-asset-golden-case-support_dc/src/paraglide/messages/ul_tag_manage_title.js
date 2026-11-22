/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Manage_TitleInputs */

const en_ul_tag_manage_title = /** @type {(inputs: Ul_Tag_Manage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tag Management`)
};

const zh_ul_tag_manage_title = /** @type {(inputs: Ul_Tag_Manage_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签管理`)
};

/**
* | output |
* | --- |
* | "Tag Management" |
*
* @param {Ul_Tag_Manage_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_manage_title = /** @type {((inputs?: Ul_Tag_Manage_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Manage_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_manage_title(inputs)
	return zh_ul_tag_manage_title(inputs)
});