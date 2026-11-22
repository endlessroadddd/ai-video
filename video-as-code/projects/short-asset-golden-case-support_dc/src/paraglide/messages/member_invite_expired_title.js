/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Expired_TitleInputs */

const en_member_invite_expired_title = /** @type {(inputs: Member_Invite_Expired_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invite expired`)
};

const zh_member_invite_expired_title = /** @type {(inputs: Member_Invite_Expired_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请已过期`)
};

/**
* | output |
* | --- |
* | "Invite expired" |
*
* @param {Member_Invite_Expired_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_expired_title = /** @type {((inputs?: Member_Invite_Expired_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Expired_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_expired_title(inputs)
	return zh_member_invite_expired_title(inputs)
});