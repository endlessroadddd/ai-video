/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Edit_Missing_TargetInputs */

const en_kb_edit_missing_target = /** @type {(inputs: Kb_Edit_Missing_TargetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No editable knowledge record found. Please try again.`)
};

const zh_kb_edit_missing_target = /** @type {(inputs: Kb_Edit_Missing_TargetInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未找到可编辑的知识记录，请重试。`)
};

/**
* | output |
* | --- |
* | "No editable knowledge record found. Please try again." |
*
* @param {Kb_Edit_Missing_TargetInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_missing_target = /** @type {((inputs?: Kb_Edit_Missing_TargetInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_Missing_TargetInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_edit_missing_target(inputs)
	return zh_kb_edit_missing_target(inputs)
});