/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Login_With_GoogleInputs */

const en_auth_login_with_google = /** @type {(inputs: Auth_Login_With_GoogleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Continue with Google`)
};

const zh_auth_login_with_google = /** @type {(inputs: Auth_Login_With_GoogleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通过 Google 账号登录`)
};

/**
* | output |
* | --- |
* | "Continue with Google" |
*
* @param {Auth_Login_With_GoogleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_login_with_google = /** @type {((inputs?: Auth_Login_With_GoogleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Login_With_GoogleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_login_with_google(inputs)
	return zh_auth_login_with_google(inputs)
});