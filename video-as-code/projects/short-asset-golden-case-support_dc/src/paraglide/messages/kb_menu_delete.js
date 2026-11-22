/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Menu_DeleteInputs */

const en_kb_menu_delete = /** @type {(inputs: Kb_Menu_DeleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete`)
};

const zh_kb_menu_delete = /** @type {(inputs: Kb_Menu_DeleteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除`)
};

/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Kb_Menu_DeleteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_menu_delete = /** @type {((inputs?: Kb_Menu_DeleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Menu_DeleteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_menu_delete(inputs)
	return zh_kb_menu_delete(inputs)
});