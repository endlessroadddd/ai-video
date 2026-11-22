/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Invite_Link_Copy_FailedInputs */

const en_member_management_invite_link_copy_failed = /** @type {(inputs: Member_Management_Invite_Link_Copy_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to copy the invite link. Please copy it manually.`)
};

const zh_member_management_invite_link_copy_failed = /** @type {(inputs: Member_Management_Invite_Link_Copy_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制邀请链接失败，请手动复制。`)
};

/**
* | output |
* | --- |
* | "Failed to copy the invite link. Please copy it manually." |
*
* @param {Member_Management_Invite_Link_Copy_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_link_copy_failed = /** @type {((inputs?: Member_Management_Invite_Link_Copy_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Link_Copy_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_invite_link_copy_failed(inputs)
	return zh_member_management_invite_link_copy_failed(inputs)
});