/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Used_DescInputs */

const en_member_invite_used_desc = /** @type {(inputs: Member_Invite_Used_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This invitation has already been accepted and cannot be reused by the current account.`)
};

const zh_member_invite_used_desc = /** @type {(inputs: Member_Invite_Used_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这条邀请已经被接受，当前账号不能再次使用该链接。`)
};

/**
* | output |
* | --- |
* | "This invitation has already been accepted and cannot be reused by the current account." |
*
* @param {Member_Invite_Used_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_used_desc = /** @type {((inputs?: Member_Invite_Used_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Used_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_used_desc(inputs)
	return zh_member_invite_used_desc(inputs)
});