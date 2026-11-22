/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Invite_Mode_LabelInputs */

const en_member_management_invite_mode_label = /** @type {(inputs: Member_Management_Invite_Mode_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite method`)
};

const zh_member_management_invite_mode_label = /** @type {(inputs: Member_Management_Invite_Mode_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请方式`)
};

/**
* | output |
* | --- |
* | "Invite method" |
*
* @param {Member_Management_Invite_Mode_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_mode_label = /** @type {((inputs?: Member_Management_Invite_Mode_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Mode_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_invite_mode_label(inputs)
	return zh_member_management_invite_mode_label(inputs)
});