/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Form_Name_PlaceholderInputs */

const en_ul_tag_form_name_placeholder = /** @type {(inputs: Ul_Tag_Form_Name_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`e.g. High-intent lead`)
};

const zh_ul_tag_form_name_placeholder = /** @type {(inputs: Ul_Tag_Form_Name_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`例如：高意向客户`)
};

/**
* | output |
* | --- |
* | "e.g. High-intent lead" |
*
* @param {Ul_Tag_Form_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_form_name_placeholder = /** @type {((inputs?: Ul_Tag_Form_Name_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Form_Name_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_form_name_placeholder(inputs)
	return zh_ul_tag_form_name_placeholder(inputs)
});