/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Edit_Content_RequiredInputs */

const en_kb_edit_content_required = /** @type {(inputs: Kb_Edit_Content_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Please enter content before saving.`)
};

const zh_kb_edit_content_required = /** @type {(inputs: Kb_Edit_Content_RequiredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请输入内容后再保存。`)
};

/**
* | output |
* | --- |
* | "Please enter content before saving." |
*
* @param {Kb_Edit_Content_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_content_required = /** @type {((inputs?: Kb_Edit_Content_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_Content_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_edit_content_required(inputs)
	return zh_kb_edit_content_required(inputs)
});