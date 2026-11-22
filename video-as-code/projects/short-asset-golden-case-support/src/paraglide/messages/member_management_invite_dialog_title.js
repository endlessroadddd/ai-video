/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Invite_Dialog_TitleInputs */

const en_member_management_invite_dialog_title = /** @type {(inputs: Member_Management_Invite_Dialog_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite member`)
};

const zh_member_management_invite_dialog_title = /** @type {(inputs: Member_Management_Invite_Dialog_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请成员`)
};

/**
* | output |
* | --- |
* | "Invite member" |
*
* @param {Member_Management_Invite_Dialog_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_dialog_title = /** @type {((inputs?: Member_Management_Invite_Dialog_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Dialog_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_invite_dialog_title(inputs)
	return zh_member_management_invite_dialog_title(inputs)
});