/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Adjust_Invite_RoleInputs */

const en_member_management_adjust_invite_role = /** @type {(inputs: Member_Management_Adjust_Invite_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Adjust invite role`)
};

const zh_member_management_adjust_invite_role = /** @type {(inputs: Member_Management_Adjust_Invite_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`调整邀请权限`)
};

/**
* | output |
* | --- |
* | "Adjust invite role" |
*
* @param {Member_Management_Adjust_Invite_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_adjust_invite_role = /** @type {((inputs?: Member_Management_Adjust_Invite_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Adjust_Invite_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_adjust_invite_role(inputs)
	return zh_member_management_adjust_invite_role(inputs)
});