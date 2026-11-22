/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ email: NonNullable<unknown> }} Member_Management_Actions_Menu_AriaInputs */

const en_member_management_actions_menu_aria = /** @type {(inputs: Member_Management_Actions_Menu_AriaInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Action menu for ${i?.email}`)
};

const zh_member_management_actions_menu_aria = /** @type {(inputs: Member_Management_Actions_Menu_AriaInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.email} 的操作菜单`)
};

/**
* | output |
* | --- |
* | "Action menu for {email}" |
*
* @param {Member_Management_Actions_Menu_AriaInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_actions_menu_aria = /** @type {((inputs: Member_Management_Actions_Menu_AriaInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Actions_Menu_AriaInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_actions_menu_aria(inputs)
	return zh_member_management_actions_menu_aria(inputs)
});