/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ message: NonNullable<unknown> }} Auth_Email_Login_FailedInputs */

const en_auth_email_login_failed = /** @type {(inputs: Auth_Email_Login_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Email sign-in failed: ${i?.message}`)
};

const zh_auth_email_login_failed = /** @type {(inputs: Auth_Email_Login_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`邮件登录失败：${i?.message}`)
};

/**
* | output |
* | --- |
* | "Email sign-in failed: {message}" |
*
* @param {Auth_Email_Login_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_email_login_failed = /** @type {((inputs: Auth_Email_Login_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Email_Login_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_email_login_failed(inputs)
	return zh_auth_email_login_failed(inputs)
});