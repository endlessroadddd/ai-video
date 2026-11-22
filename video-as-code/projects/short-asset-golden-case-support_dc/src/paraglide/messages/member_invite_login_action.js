/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Login_ActionInputs */

const en_member_invite_login_action = /** @type {(inputs: Member_Invite_Login_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign in and continue`)
};

const zh_member_invite_login_action = /** @type {(inputs: Member_Invite_Login_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`登录并继续`)
};

/**
* | output |
* | --- |
* | "Sign in and continue" |
*
* @param {Member_Invite_Login_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_login_action = /** @type {((inputs?: Member_Invite_Login_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Login_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_login_action(inputs)
	return zh_member_invite_login_action(inputs)
});