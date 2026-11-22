/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Switch_Account_ErrorInputs */

const en_member_invite_switch_account_error = /** @type {(inputs: Member_Invite_Switch_Account_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to switch accounts. Please try again later.`)
};

const zh_member_invite_switch_account_error = /** @type {(inputs: Member_Invite_Switch_Account_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换账号失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to switch accounts. Please try again later." |
*
* @param {Member_Invite_Switch_Account_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_switch_account_error = /** @type {((inputs?: Member_Invite_Switch_Account_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Switch_Account_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_switch_account_error(inputs)
	return zh_member_invite_switch_account_error(inputs)
});