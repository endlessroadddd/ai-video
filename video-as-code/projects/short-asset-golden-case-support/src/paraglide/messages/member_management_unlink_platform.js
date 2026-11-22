/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Unlink_PlatformInputs */

const en_member_management_unlink_platform = /** @type {(inputs: Member_Management_Unlink_PlatformInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Unlink ${i?.platform}`)
};

const zh_member_management_unlink_platform = /** @type {(inputs: Member_Management_Unlink_PlatformInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`解绑 ${i?.platform}`)
};

/**
* | output |
* | --- |
* | "Unlink {platform}" |
*
* @param {Member_Management_Unlink_PlatformInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_unlink_platform = /** @type {((inputs: Member_Management_Unlink_PlatformInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Unlink_PlatformInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_unlink_platform(inputs)
	return zh_member_management_unlink_platform(inputs)
});