/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Invite_Link_LabelInputs */

const en_member_management_invite_link_label = /** @type {(inputs: Member_Management_Invite_Link_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite link`)
};

const zh_member_management_invite_link_label = /** @type {(inputs: Member_Management_Invite_Link_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请链接`)
};

/**
* | output |
* | --- |
* | "Invite link" |
*
* @param {Member_Management_Invite_Link_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_link_label = /** @type {((inputs?: Member_Management_Invite_Link_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Link_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_invite_link_label(inputs)
	return zh_member_management_invite_link_label(inputs)
});