/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Manage_ButtonInputs */

const en_ul_tag_manage_button = /** @type {(inputs: Ul_Tag_Manage_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manage Tags`)
};

const zh_ul_tag_manage_button = /** @type {(inputs: Ul_Tag_Manage_ButtonInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签管理`)
};

/**
* | output |
* | --- |
* | "Manage Tags" |
*
* @param {Ul_Tag_Manage_ButtonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_manage_button = /** @type {((inputs?: Ul_Tag_Manage_ButtonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Manage_ButtonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_manage_button(inputs)
	return zh_ul_tag_manage_button(inputs)
});