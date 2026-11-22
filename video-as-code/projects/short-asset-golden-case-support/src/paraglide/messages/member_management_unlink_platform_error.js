/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Unlink_Platform_ErrorInputs */

const en_member_management_unlink_platform_error = /** @type {(inputs: Member_Management_Unlink_Platform_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed to unlink ${i?.platform} account.`)
};

const zh_member_management_unlink_platform_error = /** @type {(inputs: Member_Management_Unlink_Platform_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`解绑 ${i?.platform} 账号失败。`)
};

/**
* | output |
* | --- |
* | "Failed to unlink {platform} account." |
*
* @param {Member_Management_Unlink_Platform_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_unlink_platform_error = /** @type {((inputs: Member_Management_Unlink_Platform_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Unlink_Platform_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_unlink_platform_error(inputs)
	return zh_member_management_unlink_platform_error(inputs)
});