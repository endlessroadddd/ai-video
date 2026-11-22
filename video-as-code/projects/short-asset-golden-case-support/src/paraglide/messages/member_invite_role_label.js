/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Role_LabelInputs */

const en_member_invite_role_label = /** @type {(inputs: Member_Invite_Role_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Invited role`)
};

const zh_member_invite_role_label = /** @type {(inputs: Member_Invite_Role_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邀请权限`)
};

/**
* | output |
* | --- |
* | "Invited role" |
*
* @param {Member_Invite_Role_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_role_label = /** @type {((inputs?: Member_Invite_Role_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Role_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_role_label(inputs)
	return zh_member_invite_role_label(inputs)
});