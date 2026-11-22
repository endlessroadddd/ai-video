/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Save_RoleInputs */

const en_member_management_save_role = /** @type {(inputs: Member_Management_Save_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save role`)
};

const zh_member_management_save_role = /** @type {(inputs: Member_Management_Save_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存权限`)
};

/**
* | output |
* | --- |
* | "Save role" |
*
* @param {Member_Management_Save_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_save_role = /** @type {((inputs?: Member_Management_Save_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Save_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_save_role(inputs)
	return zh_member_management_save_role(inputs)
});