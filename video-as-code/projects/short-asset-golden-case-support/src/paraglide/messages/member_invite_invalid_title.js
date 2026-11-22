/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Invalid_TitleInputs */

const en_member_invite_invalid_title = /** @type {(inputs: Member_Invite_Invalid_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite link unavailable`)
};

const zh_member_invite_invalid_title = /** @type {(inputs: Member_Invite_Invalid_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请链接不可用`)
};

/**
* | output |
* | --- |
* | "Invite link unavailable" |
*
* @param {Member_Invite_Invalid_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_invalid_title = /** @type {((inputs?: Member_Invite_Invalid_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Invalid_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_invalid_title(inputs)
	return zh_member_invite_invalid_title(inputs)
});