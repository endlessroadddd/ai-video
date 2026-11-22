/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Ul_Tag_Form_Name_RequiredInputs */

const en_ul_tag_form_name_required = /** @type {(inputs: Ul_Tag_Form_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a tag name`)
};

const zh_ul_tag_form_name_required = /** @type {(inputs: Ul_Tag_Form_Name_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入标签名`)
};

/**
* | output |
* | --- |
* | "Please enter a tag name" |
*
* @param {Ul_Tag_Form_Name_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const ul_tag_form_name_required = /** @type {((inputs?: Ul_Tag_Form_Name_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Ul_Tag_Form_Name_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_ul_tag_form_name_required(inputs)
	return zh_ul_tag_form_name_required(inputs)
});