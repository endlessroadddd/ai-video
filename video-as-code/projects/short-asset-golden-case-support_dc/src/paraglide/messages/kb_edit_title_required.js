/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Edit_Title_RequiredInputs */

const en_kb_edit_title_required = /** @type {(inputs: Kb_Edit_Title_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter a title before saving.`)
};

const zh_kb_edit_title_required = /** @type {(inputs: Kb_Edit_Title_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入标题后再保存。`)
};

/**
* | output |
* | --- |
* | "Please enter a title before saving." |
*
* @param {Kb_Edit_Title_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_title_required = /** @type {((inputs?: Kb_Edit_Title_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_Title_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_edit_title_required(inputs)
	return zh_kb_edit_title_required(inputs)
});