/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Invite_Link_GeneratingInputs */

const en_member_management_invite_link_generating = /** @type {(inputs: Member_Management_Invite_Link_GeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generating...`)
};

const zh_member_management_invite_link_generating = /** @type {(inputs: Member_Management_Invite_Link_GeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成中...`)
};

/**
* | output |
* | --- |
* | "Generating..." |
*
* @param {Member_Management_Invite_Link_GeneratingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_invite_link_generating = /** @type {((inputs?: Member_Management_Invite_Link_GeneratingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Invite_Link_GeneratingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_invite_link_generating(inputs)
	return zh_member_management_invite_link_generating(inputs)
});