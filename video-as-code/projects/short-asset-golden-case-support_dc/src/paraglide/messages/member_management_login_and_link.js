/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ platform: NonNullable<unknown> }} Member_Management_Login_And_LinkInputs */

const en_member_management_login_and_link = /** @type {(inputs: Member_Management_Login_And_LinkInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Sign in with ${i?.platform} and link`)
};

const zh_member_management_login_and_link = /** @type {(inputs: Member_Management_Login_And_LinkInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`使用 ${i?.platform} 登录并关联`)
};

/**
* | output |
* | --- |
* | "Sign in with {platform} and link" |
*
* @param {Member_Management_Login_And_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const member_management_login_and_link = /** @type {((inputs: Member_Management_Login_And_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Member_Management_Login_And_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_member_management_login_and_link(inputs)
	return zh_member_management_login_and_link(inputs)
});