/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Switching_AccountInputs */

const en_member_invite_switching_account = /** @type {(inputs: Member_Invite_Switching_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Switching...`)
};

const zh_member_invite_switching_account = /** @type {(inputs: Member_Invite_Switching_AccountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换中...`)
};

/**
* | output |
* | --- |
* | "Switching..." |
*
* @param {Member_Invite_Switching_AccountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_switching_account = /** @type {((inputs?: Member_Invite_Switching_AccountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Switching_AccountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_switching_account(inputs)
	return zh_member_invite_switching_account(inputs)
});