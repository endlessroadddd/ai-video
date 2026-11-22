/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Header_Action_MenuInputs */

const en_header_action_menu = /** @type {(inputs: Header_Action_MenuInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Menu`)
};

const zh_header_action_menu = /** @type {(inputs: Header_Action_MenuInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`菜单`)
};

/**
* | output |
* | --- |
* | "Menu" |
*
* @param {Header_Action_MenuInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const header_action_menu = /** @type {((inputs?: Header_Action_MenuInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Header_Action_MenuInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_header_action_menu(inputs)
	return zh_header_action_menu(inputs)
});