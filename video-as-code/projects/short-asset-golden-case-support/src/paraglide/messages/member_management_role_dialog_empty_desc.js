/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Role_Dialog_Empty_DescInputs */

const en_member_management_role_dialog_empty_desc = /** @type {(inputs: Member_Management_Role_Dialog_Empty_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose a new member role.`)
};

const zh_member_management_role_dialog_empty_desc = /** @type {(inputs: Member_Management_Role_Dialog_Empty_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择新的成员权限。`)
};

/**
* | output |
* | --- |
* | "Choose a new member role." |
*
* @param {Member_Management_Role_Dialog_Empty_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_role_dialog_empty_desc = /** @type {((inputs?: Member_Management_Role_Dialog_Empty_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Role_Dialog_Empty_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_role_dialog_empty_desc(inputs)
	return zh_member_management_role_dialog_empty_desc(inputs)
});