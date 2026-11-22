/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Platform_Bind_FailedInputs */

const en_member_management_platform_bind_failed = /** @type {(inputs: Member_Management_Platform_Bind_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} account linking failed. Please try again later.`)
};

const zh_member_management_platform_bind_failed = /** @type {(inputs: Member_Management_Platform_Bind_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.platform} 账号绑定失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "{platform} account linking failed. Please try again later." |
*
* @param {Member_Management_Platform_Bind_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_platform_bind_failed = /** @type {((inputs: Member_Management_Platform_Bind_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Platform_Bind_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_platform_bind_failed(inputs)
	return zh_member_management_platform_bind_failed(inputs)
});