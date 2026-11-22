/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_BadgeInputs */

const en_member_invite_badge = /** @type {(inputs: Member_Invite_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace Invite`)
};

const zh_member_invite_badge = /** @type {(inputs: Member_Invite_BadgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace Invite`)
};

/**
* | output |
* | --- |
* | "Workspace Invite" |
*
* @param {Member_Invite_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_badge = /** @type {((inputs?: Member_Invite_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_badge(inputs)
	return zh_member_invite_badge(inputs)
});