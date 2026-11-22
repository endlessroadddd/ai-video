/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Admin_Update_Member_OnlyInputs */

const en_member_management_admin_update_member_only = /** @type {(inputs: Member_Management_Admin_Update_Member_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin can only adjust Members`)
};

const zh_member_management_admin_update_member_only = /** @type {(inputs: Member_Management_Admin_Update_Member_OnlyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Admin 仅可调整 Member`)
};

/**
* | output |
* | --- |
* | "Admin can only adjust Members" |
*
* @param {Member_Management_Admin_Update_Member_OnlyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_admin_update_member_only = /** @type {((inputs?: Member_Management_Admin_Update_Member_OnlyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Admin_Update_Member_OnlyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_admin_update_member_only(inputs)
	return zh_member_management_admin_update_member_only(inputs)
});