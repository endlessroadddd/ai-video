/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Menu_EditInputs */

const en_kb_menu_edit = /** @type {(inputs: Kb_Menu_EditInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit`)
};

const zh_kb_menu_edit = /** @type {(inputs: Kb_Menu_EditInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`修改`)
};

/**
* | output |
* | --- |
* | "Edit" |
*
* @param {Kb_Menu_EditInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_menu_edit = /** @type {((inputs?: Kb_Menu_EditInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Menu_EditInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_menu_edit(inputs)
	return zh_kb_menu_edit(inputs)
});