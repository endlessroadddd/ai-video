/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Invite_Mode_EmailInputs */

const en_member_management_invite_mode_email = /** @type {(inputs: Member_Management_Invite_Mode_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email invite`)
};

const zh_member_management_invite_mode_email = /** @type {(inputs: Member_Management_Invite_Mode_EmailInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮件邀请`)
};

/**
* | output |
* | --- |
* | "Email invite" |
*
* @param {Member_Management_Invite_Mode_EmailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_mode_email = /** @type {((inputs?: Member_Management_Invite_Mode_EmailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Mode_EmailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_invite_mode_email(inputs)
	return zh_member_management_invite_mode_email(inputs)
});