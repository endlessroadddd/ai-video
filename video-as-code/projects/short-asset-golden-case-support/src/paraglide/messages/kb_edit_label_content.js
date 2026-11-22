/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Edit_Label_ContentInputs */

const en_kb_edit_label_content = /** @type {(inputs: Kb_Edit_Label_ContentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Content`)
};

const zh_kb_edit_label_content = /** @type {(inputs: Kb_Edit_Label_ContentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`内容`)
};

/**
* | output |
* | --- |
* | "Content" |
*
* @param {Kb_Edit_Label_ContentInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_label_content = /** @type {((inputs?: Kb_Edit_Label_ContentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_Label_ContentInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_edit_label_content(inputs)
	return zh_kb_edit_label_content(inputs)
});