/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Cancel_InviteInputs */

const en_member_management_cancel_invite = /** @type {(inputs: Member_Management_Cancel_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cancel invite`)
};

const zh_member_management_cancel_invite = /** @type {(inputs: Member_Management_Cancel_InviteInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消邀请`)
};

/**
* | output |
* | --- |
* | "Cancel invite" |
*
* @param {Member_Management_Cancel_InviteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_cancel_invite = /** @type {((inputs?: Member_Management_Cancel_InviteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Cancel_InviteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_cancel_invite(inputs)
	return zh_member_management_cancel_invite(inputs)
});