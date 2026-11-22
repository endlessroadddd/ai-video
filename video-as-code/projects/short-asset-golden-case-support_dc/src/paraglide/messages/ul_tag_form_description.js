/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Form_DescriptionInputs */

const en_ul_tag_form_description = /** @type {(inputs: Ul_Tag_Form_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Description`)
};

const zh_ul_tag_form_description = /** @type {(inputs: Ul_Tag_Form_DescriptionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`描述`)
};

/**
* | output |
* | --- |
* | "Description" |
*
* @param {Ul_Tag_Form_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_form_description = /** @type {((inputs?: Ul_Tag_Form_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Form_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_form_description(inputs)
	return zh_ul_tag_form_description(inputs)
});