/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Invite_Link_CopiedInputs */

const en_member_management_invite_link_copied = /** @type {(inputs: Member_Management_Invite_Link_CopiedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite link copied. It expires in 24 hours.`)
};

const zh_member_management_invite_link_copied = /** @type {(inputs: Member_Management_Invite_Link_CopiedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请链接已复制，24 小时内有效。`)
};

/**
* | output |
* | --- |
* | "Invite link copied. It expires in 24 hours." |
*
* @param {Member_Management_Invite_Link_CopiedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_link_copied = /** @type {((inputs?: Member_Management_Invite_Link_CopiedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Link_CopiedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_invite_link_copied(inputs)
	return zh_member_management_invite_link_copied(inputs)
});