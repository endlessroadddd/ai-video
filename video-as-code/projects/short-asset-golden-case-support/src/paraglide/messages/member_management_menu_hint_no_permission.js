/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Menu_Hint_No_PermissionInputs */

const en_member_management_menu_hint_no_permission = /** @type {(inputs: Member_Management_Menu_Hint_No_PermissionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No permission`)
};

const zh_member_management_menu_hint_no_permission = /** @type {(inputs: Member_Management_Menu_Hint_No_PermissionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无权限`)
};

/**
* | output |
* | --- |
* | "No permission" |
*
* @param {Member_Management_Menu_Hint_No_PermissionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_menu_hint_no_permission = /** @type {((inputs?: Member_Management_Menu_Hint_No_PermissionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Menu_Hint_No_PermissionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_menu_hint_no_permission(inputs)
	return zh_member_management_menu_hint_no_permission(inputs)
});