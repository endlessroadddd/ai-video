/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Update_Owner_RoleInputs */

const en_member_management_update_owner_role = /** @type {(inputs: Member_Management_Update_Owner_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner role cannot be changed`)
};

const zh_member_management_update_owner_role = /** @type {(inputs: Member_Management_Update_Owner_RoleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Owner 权限不可修改`)
};

/**
* | output |
* | --- |
* | "Owner role cannot be changed" |
*
* @param {Member_Management_Update_Owner_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_update_owner_role = /** @type {((inputs?: Member_Management_Update_Owner_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Update_Owner_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_update_owner_role(inputs)
	return zh_member_management_update_owner_role(inputs)
});