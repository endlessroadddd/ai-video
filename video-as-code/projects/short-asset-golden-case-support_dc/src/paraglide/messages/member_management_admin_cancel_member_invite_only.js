/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Admin_Cancel_Member_Invite_OnlyInputs */

const en_member_management_admin_cancel_member_invite_only = /** @type {(inputs: Member_Management_Admin_Cancel_Member_Invite_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin can only cancel Member invitations`)
};

const zh_member_management_admin_cancel_member_invite_only = /** @type {(inputs: Member_Management_Admin_Cancel_Member_Invite_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin 仅可取消 Member 邀请`)
};

/**
* | output |
* | --- |
* | "Admin can only cancel Member invitations" |
*
* @param {Member_Management_Admin_Cancel_Member_Invite_OnlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_cancel_member_invite_only = /** @type {((inputs?: Member_Management_Admin_Cancel_Member_Invite_OnlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Cancel_Member_Invite_OnlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_admin_cancel_member_invite_only(inputs)
	return zh_member_management_admin_cancel_member_invite_only(inputs)
});