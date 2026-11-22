/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Invite_Mode_Link_HintInputs */

const en_member_management_invite_mode_link_hint = /** @type {(inputs: Member_Management_Invite_Mode_Link_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This link stays valid for 24 hours. Anyone who signs up or signs in with it will join the current workspace.`)
};

const zh_member_management_invite_mode_link_hint = /** @type {(inputs: Member_Management_Invite_Mode_Link_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`该链接 24 小时内有效。拿到链接的人注册或登录后，会直接加入当前组织。`)
};

/**
* | output |
* | --- |
* | "This link stays valid for 24 hours. Anyone who signs up or signs in with it will join the current workspace." |
*
* @param {Member_Management_Invite_Mode_Link_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_mode_link_hint = /** @type {((inputs?: Member_Management_Invite_Mode_Link_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Mode_Link_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_invite_mode_link_hint(inputs)
	return zh_member_management_invite_mode_link_hint(inputs)
});