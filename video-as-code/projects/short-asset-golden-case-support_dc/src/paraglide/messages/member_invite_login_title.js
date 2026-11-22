/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Login_TitleInputs */

const en_member_invite_login_title = /** @type {(inputs: Member_Invite_Login_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign in to continue`)
};

const zh_member_invite_login_title = /** @type {(inputs: Member_Invite_Login_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`登录后加入`)
};

/**
* | output |
* | --- |
* | "Sign in to continue" |
*
* @param {Member_Invite_Login_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_login_title = /** @type {((inputs?: Member_Invite_Login_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Login_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_login_title(inputs)
	return zh_member_invite_login_title(inputs)
});