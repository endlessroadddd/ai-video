/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Invite_Mode_LinkInputs */

const en_member_management_invite_mode_link = /** @type {(inputs: Member_Management_Invite_Mode_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite link`)
};

const zh_member_management_invite_mode_link = /** @type {(inputs: Member_Management_Invite_Mode_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请链接`)
};

/**
* | output |
* | --- |
* | "Invite link" |
*
* @param {Member_Management_Invite_Mode_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_mode_link = /** @type {((inputs?: Member_Management_Invite_Mode_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Mode_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_invite_mode_link(inputs)
	return zh_member_management_invite_mode_link(inputs)
});