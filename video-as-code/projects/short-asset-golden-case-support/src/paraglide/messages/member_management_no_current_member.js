/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_No_Current_MemberInputs */

const en_member_management_no_current_member = /** @type {(inputs: Member_Management_No_Current_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your current account has not been mapped to a company member yet, so account linking is unavailable.`)
};

const zh_member_management_no_current_member = /** @type {(inputs: Member_Management_No_Current_MemberInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前账号尚未映射到公司成员，暂无法执行账号关联。`)
};

/**
* | output |
* | --- |
* | "Your current account has not been mapped to a company member yet, so account linking is unavailable." |
*
* @param {Member_Management_No_Current_MemberInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_no_current_member = /** @type {((inputs?: Member_Management_No_Current_MemberInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_No_Current_MemberInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_no_current_member(inputs)
	return zh_member_management_no_current_member(inputs)
});