/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Accept_ActionInputs */

const en_member_invite_accept_action = /** @type {(inputs: Member_Invite_Accept_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Retry joining`)
};

const zh_member_invite_accept_action = /** @type {(inputs: Member_Invite_Accept_ActionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重试加入组织`)
};

/**
* | output |
* | --- |
* | "Retry joining" |
*
* @param {Member_Invite_Accept_ActionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_accept_action = /** @type {((inputs?: Member_Invite_Accept_ActionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Accept_ActionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_accept_action(inputs)
	return zh_member_invite_accept_action(inputs)
});