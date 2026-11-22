/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ email: NonNullable<unknown> }} Member_Invite_Email_Mismatch_DescInputs */

const en_member_invite_email_mismatch_desc = /** @type {(inputs: Member_Invite_Email_Mismatch_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Please sign in with ${i?.email} before accepting this invite.`)
};

const zh_member_invite_email_mismatch_desc = /** @type {(inputs: Member_Invite_Email_Mismatch_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`请使用 ${i?.email} 登录后再接受邀请。`)
};

/**
* | output |
* | --- |
* | "Please sign in with {email} before accepting this invite." |
*
* @param {Member_Invite_Email_Mismatch_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_email_mismatch_desc = /** @type {((inputs: Member_Invite_Email_Mismatch_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Email_Mismatch_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_email_mismatch_desc(inputs)
	return zh_member_invite_email_mismatch_desc(inputs)
});