/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_AcceptingInputs */

const en_member_invite_accepting = /** @type {(inputs: Member_Invite_AcceptingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Joining...`)
};

const zh_member_invite_accepting = /** @type {(inputs: Member_Invite_AcceptingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`加入中...`)
};

/**
* | output |
* | --- |
* | "Joining..." |
*
* @param {Member_Invite_AcceptingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_accepting = /** @type {((inputs?: Member_Invite_AcceptingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_AcceptingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_accepting(inputs)
	return zh_member_invite_accepting(inputs)
});