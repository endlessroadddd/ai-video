/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Ready_TitleInputs */

const en_member_invite_ready_title = /** @type {(inputs: Member_Invite_Ready_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Join this workspace`)
};

const zh_member_invite_ready_title = /** @type {(inputs: Member_Invite_Ready_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认加入工作区`)
};

/**
* | output |
* | --- |
* | "Join this workspace" |
*
* @param {Member_Invite_Ready_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_ready_title = /** @type {((inputs?: Member_Invite_Ready_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Ready_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_ready_title(inputs)
	return zh_member_invite_ready_title(inputs)
});