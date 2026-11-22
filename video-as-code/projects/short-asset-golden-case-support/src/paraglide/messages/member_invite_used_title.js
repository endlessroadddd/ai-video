/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Used_TitleInputs */

const en_member_invite_used_title = /** @type {(inputs: Member_Invite_Used_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite already handled`)
};

const zh_member_invite_used_title = /** @type {(inputs: Member_Invite_Used_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请已处理`)
};

/**
* | output |
* | --- |
* | "Invite already handled" |
*
* @param {Member_Invite_Used_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_used_title = /** @type {((inputs?: Member_Invite_Used_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Used_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_used_title(inputs)
	return zh_member_invite_used_title(inputs)
});