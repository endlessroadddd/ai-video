/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Expired_DescInputs */

const en_member_invite_expired_desc = /** @type {(inputs: Member_Invite_Expired_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This link has passed its validity window. Ask an admin to generate a new invite link.`)
};

const zh_member_invite_expired_desc = /** @type {(inputs: Member_Invite_Expired_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`该链接已经超过有效期，请联系管理员重新生成邀请链接。`)
};

/**
* | output |
* | --- |
* | "This link has passed its validity window. Ask an admin to generate a new invite link." |
*
* @param {Member_Invite_Expired_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_expired_desc = /** @type {((inputs?: Member_Invite_Expired_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Expired_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_expired_desc(inputs)
	return zh_member_invite_expired_desc(inputs)
});