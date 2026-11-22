/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Login_TitleInputs */

const en_auth_login_title = /** @type {(inputs: Auth_Login_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sign up / Log in`)
};

const zh_auth_login_title = /** @type {(inputs: Auth_Login_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`注册 / 登录`)
};

/**
* | output |
* | --- |
* | "Sign up / Log in" |
*
* @param {Auth_Login_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_login_title = /** @type {((inputs?: Auth_Login_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Login_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_login_title(inputs)
	return zh_auth_login_title(inputs)
});