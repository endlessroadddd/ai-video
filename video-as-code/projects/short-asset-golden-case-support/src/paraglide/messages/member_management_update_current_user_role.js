/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Update_Current_User_RoleInputs */

const en_member_management_update_current_user_role = /** @type {(inputs: Member_Management_Update_Current_User_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current signed-in account role cannot be changed`)
};

const zh_member_management_update_current_user_role = /** @type {(inputs: Member_Management_Update_Current_User_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前登录账号不可修改权限`)
};

/**
* | output |
* | --- |
* | "The current signed-in account role cannot be changed" |
*
* @param {Member_Management_Update_Current_User_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_update_current_user_role = /** @type {((inputs?: Member_Management_Update_Current_User_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Update_Current_User_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_update_current_user_role(inputs)
	return zh_member_management_update_current_user_role(inputs)
});