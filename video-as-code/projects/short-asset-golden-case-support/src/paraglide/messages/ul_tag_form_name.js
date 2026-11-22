/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Form_NameInputs */

const en_ul_tag_form_name = /** @type {(inputs: Ul_Tag_Form_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tag Name`)
};

const zh_ul_tag_form_name = /** @type {(inputs: Ul_Tag_Form_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标签名`)
};

/**
* | output |
* | --- |
* | "Tag Name" |
*
* @param {Ul_Tag_Form_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_form_name = /** @type {((inputs?: Ul_Tag_Form_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Form_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_form_name(inputs)
	return zh_ul_tag_form_name(inputs)
});