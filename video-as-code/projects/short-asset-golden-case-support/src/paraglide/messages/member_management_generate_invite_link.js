/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Generate_Invite_LinkInputs */

const en_member_management_generate_invite_link = /** @type {(inputs: Member_Management_Generate_Invite_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate invite link`)
};

const zh_member_management_generate_invite_link = /** @type {(inputs: Member_Management_Generate_Invite_LinkInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成邀请链接`)
};

/**
* | output |
* | --- |
* | "Generate invite link" |
*
* @param {Member_Management_Generate_Invite_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_generate_invite_link = /** @type {((inputs?: Member_Management_Generate_Invite_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Generate_Invite_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_generate_invite_link(inputs)
	return zh_member_management_generate_invite_link(inputs)
});