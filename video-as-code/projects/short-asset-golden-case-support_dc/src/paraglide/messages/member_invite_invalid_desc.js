/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Invalid_DescInputs */

const en_member_invite_invalid_desc = /** @type {(inputs: Member_Invite_Invalid_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This invite link is invalid, expired, or the underlying invitation no longer exists.`)
};

const zh_member_invite_invalid_desc = /** @type {(inputs: Member_Invite_Invalid_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这个邀请链接无效、已过期，或对应邀请已经不存在。`)
};

/**
* | output |
* | --- |
* | "This invite link is invalid, expired, or the underlying invitation no longer exists." |
*
* @param {Member_Invite_Invalid_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_invalid_desc = /** @type {((inputs?: Member_Invite_Invalid_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Invalid_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_invalid_desc(inputs)
	return zh_member_invite_invalid_desc(inputs)
});