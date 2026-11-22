/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Invite_Dialog_DescInputs */

const en_member_management_invite_dialog_desc = /** @type {(inputs: Member_Management_Invite_Dialog_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose an invite method and set the role.`)
};

const zh_member_management_invite_dialog_desc = /** @type {(inputs: Member_Management_Invite_Dialog_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择邀请方式并设置权限。`)
};

/**
* | output |
* | --- |
* | "Choose an invite method and set the role." |
*
* @param {Member_Management_Invite_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_dialog_desc = /** @type {((inputs?: Member_Management_Invite_Dialog_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Dialog_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_invite_dialog_desc(inputs)
	return zh_member_management_invite_dialog_desc(inputs)
});