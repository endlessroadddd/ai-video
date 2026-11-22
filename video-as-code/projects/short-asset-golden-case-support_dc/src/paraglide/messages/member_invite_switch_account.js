/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Switch_AccountInputs */

const en_member_invite_switch_account = /** @type {(inputs: Member_Invite_Switch_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign out and switch account`)
};

const zh_member_invite_switch_account = /** @type {(inputs: Member_Invite_Switch_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`退出并切换账号`)
};

/**
* | output |
* | --- |
* | "Sign out and switch account" |
*
* @param {Member_Invite_Switch_AccountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_switch_account = /** @type {((inputs?: Member_Invite_Switch_AccountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Switch_AccountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_switch_account(inputs)
	return zh_member_invite_switch_account(inputs)
});