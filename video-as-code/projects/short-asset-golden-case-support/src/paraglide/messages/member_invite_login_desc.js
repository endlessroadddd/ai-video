/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Login_DescInputs */

const en_member_invite_login_desc = /** @type {(inputs: Member_Invite_Login_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign up or sign in first. After authentication, the workspace join will continue automatically.`)
};

const zh_member_invite_login_desc = /** @type {(inputs: Member_Invite_Login_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`先注册或登录，系统会在成功登录后自动把你加入当前组织。`)
};

/**
* | output |
* | --- |
* | "Sign up or sign in first. After authentication, the workspace join will continue automatically." |
*
* @param {Member_Invite_Login_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_login_desc = /** @type {((inputs?: Member_Invite_Login_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Login_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_login_desc(inputs)
	return zh_member_invite_login_desc(inputs)
});