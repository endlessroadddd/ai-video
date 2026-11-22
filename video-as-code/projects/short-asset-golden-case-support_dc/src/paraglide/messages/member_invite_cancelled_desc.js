/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Cancelled_DescInputs */

const en_member_invite_cancelled_desc = /** @type {(inputs: Member_Invite_Cancelled_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`An admin has cancelled this invitation. Ask them to send a new one.`)
};

const zh_member_invite_cancelled_desc = /** @type {(inputs: Member_Invite_Cancelled_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`管理员已经取消这条邀请，请联系对方重新发起。`)
};

/**
* | output |
* | --- |
* | "An admin has cancelled this invitation. Ask them to send a new one." |
*
* @param {Member_Invite_Cancelled_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_cancelled_desc = /** @type {((inputs?: Member_Invite_Cancelled_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Cancelled_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_cancelled_desc(inputs)
	return zh_member_invite_cancelled_desc(inputs)
});