/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Joined_BadgeInputs */

const en_member_invite_joined_badge = /** @type {(inputs: Member_Invite_Joined_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This account already belongs to the workspace`)
};

const zh_member_invite_joined_badge = /** @type {(inputs: Member_Invite_Joined_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号已加入该工作区`)
};

/**
* | output |
* | --- |
* | "This account already belongs to the workspace" |
*
* @param {Member_Invite_Joined_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_joined_badge = /** @type {((inputs?: Member_Invite_Joined_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Joined_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_joined_badge(inputs)
	return zh_member_invite_joined_badge(inputs)
});