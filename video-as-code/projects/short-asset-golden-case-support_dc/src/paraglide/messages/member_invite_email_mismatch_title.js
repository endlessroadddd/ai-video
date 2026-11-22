/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Email_Mismatch_TitleInputs */

const en_member_invite_email_mismatch_title = /** @type {(inputs: Member_Invite_Email_Mismatch_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wrong account`)
};

const zh_member_invite_email_mismatch_title = /** @type {(inputs: Member_Invite_Email_Mismatch_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号不匹配`)
};

/**
* | output |
* | --- |
* | "Wrong account" |
*
* @param {Member_Invite_Email_Mismatch_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_email_mismatch_title = /** @type {((inputs?: Member_Invite_Email_Mismatch_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Email_Mismatch_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_email_mismatch_title(inputs)
	return zh_member_invite_email_mismatch_title(inputs)
});