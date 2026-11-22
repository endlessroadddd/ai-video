/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Change_RoleInputs */

const en_member_management_change_role = /** @type {(inputs: Member_Management_Change_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Change role`)
};

const zh_member_management_change_role = /** @type {(inputs: Member_Management_Change_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`变更权限`)
};

/**
* | output |
* | --- |
* | "Change role" |
*
* @param {Member_Management_Change_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_change_role = /** @type {((inputs?: Member_Management_Change_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Change_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_change_role(inputs)
	return zh_member_management_change_role(inputs)
});