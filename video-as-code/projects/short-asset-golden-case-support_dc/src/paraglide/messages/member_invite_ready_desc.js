/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Ready_DescInputs */

const en_member_invite_ready_desc = /** @type {(inputs: Member_Invite_Ready_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current account is already signed in. We will auto-join it to the workspace, and you can retry manually if needed.`)
};

const zh_member_invite_ready_desc = /** @type {(inputs: Member_Invite_Ready_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号已登录，系统会自动把你加入当前组织；如果没有成功，可手动重试。`)
};

/**
* | output |
* | --- |
* | "The current account is already signed in. We will auto-join it to the workspace, and you can retry manually if needed." |
*
* @param {Member_Invite_Ready_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_ready_desc = /** @type {((inputs?: Member_Invite_Ready_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Ready_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_ready_desc(inputs)
	return zh_member_invite_ready_desc(inputs)
});