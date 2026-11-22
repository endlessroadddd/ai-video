/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Edit_CloseInputs */

const en_kb_edit_close = /** @type {(inputs: Kb_Edit_CloseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close edit modal`)
};

const zh_kb_edit_close = /** @type {(inputs: Kb_Edit_CloseInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭编辑弹窗`)
};

/**
* | output |
* | --- |
* | "Close edit modal" |
*
* @param {Kb_Edit_CloseInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_edit_close = /** @type {((inputs?: Kb_Edit_CloseInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Edit_CloseInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_edit_close(inputs)
	return zh_kb_edit_close(inputs)
});