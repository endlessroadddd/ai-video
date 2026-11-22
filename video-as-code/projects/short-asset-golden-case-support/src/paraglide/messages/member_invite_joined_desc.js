/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Joined_DescInputs */

const en_member_invite_joined_desc = /** @type {(inputs: Member_Invite_Joined_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current account is already in this workspace. You can go straight to the dashboard.`)
};

const zh_member_invite_joined_desc = /** @type {(inputs: Member_Invite_Joined_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号已经在这个工作区里，可以直接进入工作台继续操作。`)
};

/**
* | output |
* | --- |
* | "The current account is already in this workspace. You can go straight to the dashboard." |
*
* @param {Member_Invite_Joined_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_joined_desc = /** @type {((inputs?: Member_Invite_Joined_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Joined_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_joined_desc(inputs)
	return zh_member_invite_joined_desc(inputs)
});