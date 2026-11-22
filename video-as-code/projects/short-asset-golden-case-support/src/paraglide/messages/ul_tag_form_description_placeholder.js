/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Form_Description_PlaceholderInputs */

const en_ul_tag_form_description_placeholder = /** @type {(inputs: Ul_Tag_Form_Description_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Describe the rule or operational use for this tag`)
};

const zh_ul_tag_form_description_placeholder = /** @type {(inputs: Ul_Tag_Form_Description_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`说明这个标签的判断标准或运营用途`)
};

/**
* | output |
* | --- |
* | "Describe the rule or operational use for this tag" |
*
* @param {Ul_Tag_Form_Description_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_form_description_placeholder = /** @type {((inputs?: Ul_Tag_Form_Description_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Form_Description_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_form_description_placeholder(inputs)
	return zh_ul_tag_form_description_placeholder(inputs)
});