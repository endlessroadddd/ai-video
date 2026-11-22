/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Member_Management_Role_Update_ErrorInputs */

const en_member_management_role_update_error = /** @type {(inputs: Member_Management_Role_Update_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to update role. Please try again later.`)
};

const zh_member_management_role_update_error = /** @type {(inputs: Member_Management_Role_Update_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新角色失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to update role. Please try again later." |
*
* @param {Member_Management_Role_Update_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_role_update_error = /** @type {((inputs?: Member_Management_Role_Update_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Role_Update_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_role_update_error(inputs)
	return zh_member_management_role_update_error(inputs)
});