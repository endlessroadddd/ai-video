/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Missing_Current_Member_BindInputs */

const en_member_management_missing_current_member_bind = /** @type {(inputs: Member_Management_Missing_Current_Member_BindInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Current member identity could not be resolved. Account linking is unavailable for now.`)
};

const zh_member_management_missing_current_member_bind = /** @type {(inputs: Member_Management_Missing_Current_Member_BindInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未识别当前成员身份，暂无法绑定账号。`)
};

/**
* | output |
* | --- |
* | "Current member identity could not be resolved. Account linking is unavailable for now." |
*
* @param {Member_Management_Missing_Current_Member_BindInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_missing_current_member_bind = /** @type {((inputs?: Member_Management_Missing_Current_Member_BindInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Missing_Current_Member_BindInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_missing_current_member_bind(inputs)
	return zh_member_management_missing_current_member_bind(inputs)
});