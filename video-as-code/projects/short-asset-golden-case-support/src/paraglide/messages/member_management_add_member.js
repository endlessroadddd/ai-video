/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Add_MemberInputs */

const en_member_management_add_member = /** @type {(inputs: Member_Management_Add_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add member`)
};

const zh_member_management_add_member = /** @type {(inputs: Member_Management_Add_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`添加人员`)
};

/**
* | output |
* | --- |
* | "Add member" |
*
* @param {Member_Management_Add_MemberInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_add_member = /** @type {((inputs?: Member_Management_Add_MemberInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Add_MemberInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_add_member(inputs)
	return zh_member_management_add_member(inputs)
});