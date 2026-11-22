/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Remove_MemberInputs */

const en_member_management_remove_member = /** @type {(inputs: Member_Management_Remove_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Remove member`)
};

const zh_member_management_remove_member = /** @type {(inputs: Member_Management_Remove_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除成员`)
};

/**
* | output |
* | --- |
* | "Remove member" |
*
* @param {Member_Management_Remove_MemberInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_remove_member = /** @type {((inputs?: Member_Management_Remove_MemberInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Remove_MemberInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_remove_member(inputs)
	return zh_member_management_remove_member(inputs)
});