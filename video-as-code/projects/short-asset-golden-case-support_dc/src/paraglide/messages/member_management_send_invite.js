/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Send_InviteInputs */

const en_member_management_send_invite = /** @type {(inputs: Member_Management_Send_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Send invite`)
};

const zh_member_management_send_invite = /** @type {(inputs: Member_Management_Send_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送邀请`)
};

/**
* | output |
* | --- |
* | "Send invite" |
*
* @param {Member_Management_Send_InviteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_send_invite = /** @type {((inputs?: Member_Management_Send_InviteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Send_InviteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_send_invite(inputs)
	return zh_member_management_send_invite(inputs)
});