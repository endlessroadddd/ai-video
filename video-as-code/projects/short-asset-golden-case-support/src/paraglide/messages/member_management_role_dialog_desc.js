/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ email: NonNullable<unknown>, role: NonNullable<unknown> }} Member_Management_Role_Dialog_DescInputs */

const en_member_management_role_dialog_desc = /** @type {(inputs: Member_Management_Role_Dialog_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.email} is currently ${i?.role}.`)
};

const zh_member_management_role_dialog_desc = /** @type {(inputs: Member_Management_Role_Dialog_DescInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.email} 当前为 ${i?.role}。`)
};

/**
* | output |
* | --- |
* | "{email} is currently {role}." |
*
* @param {Member_Management_Role_Dialog_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_role_dialog_desc = /** @type {((inputs: Member_Management_Role_Dialog_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Role_Dialog_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_role_dialog_desc(inputs)
	return zh_member_management_role_dialog_desc(inputs)
});