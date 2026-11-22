/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Edit_Label_TitleInputs */

const en_kb_edit_label_title = /** @type {(inputs: Kb_Edit_Label_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Title`)
};

const zh_kb_edit_label_title = /** @type {(inputs: Kb_Edit_Label_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`标题`)
};

/**
* | output |
* | --- |
* | "Title" |
*
* @param {Kb_Edit_Label_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_label_title = /** @type {((inputs?: Kb_Edit_Label_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_Label_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_edit_label_title(inputs)
	return zh_kb_edit_label_title(inputs)
});