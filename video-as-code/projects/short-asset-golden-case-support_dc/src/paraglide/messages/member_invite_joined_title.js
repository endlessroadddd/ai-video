/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Joined_TitleInputs */

const en_member_invite_joined_title = /** @type {(inputs: Member_Invite_Joined_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite accepted`)
};

const zh_member_invite_joined_title = /** @type {(inputs: Member_Invite_Joined_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请已生效`)
};

/**
* | output |
* | --- |
* | "Invite accepted" |
*
* @param {Member_Invite_Joined_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_joined_title = /** @type {((inputs?: Member_Invite_Joined_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Joined_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_joined_title(inputs)
	return zh_member_invite_joined_title(inputs)
});