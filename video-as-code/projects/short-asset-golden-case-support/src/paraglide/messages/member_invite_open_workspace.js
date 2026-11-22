/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Invite_Open_WorkspaceInputs */

const en_member_invite_open_workspace = /** @type {(inputs: Member_Invite_Open_WorkspaceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open workspace`)
};

const zh_member_invite_open_workspace = /** @type {(inputs: Member_Invite_Open_WorkspaceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`进入工作台`)
};

/**
* | output |
* | --- |
* | "Open workspace" |
*
* @param {Member_Invite_Open_WorkspaceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_invite_open_workspace = /** @type {((inputs?: Member_Invite_Open_WorkspaceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Invite_Open_WorkspaceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_invite_open_workspace(inputs)
	return zh_member_invite_open_workspace(inputs)
});