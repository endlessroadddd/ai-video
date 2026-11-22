/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Email_LoginInputs */

const en_auth_email_login = /** @type {(inputs: Auth_Email_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Email Login`)
};

const zh_auth_email_login = /** @type {(inputs: Auth_Email_LoginInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`邮箱登录`)
};

/**
* | output |
* | --- |
* | "Email Login" |
*
* @param {Auth_Email_LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_email_login = /** @type {((inputs?: Auth_Email_LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Email_LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_email_login(inputs)
	return zh_auth_email_login(inputs)
});