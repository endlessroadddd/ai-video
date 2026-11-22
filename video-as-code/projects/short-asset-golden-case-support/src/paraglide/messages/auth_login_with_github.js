/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Login_With_GithubInputs */

const en_auth_login_with_github = /** @type {(inputs: Auth_Login_With_GithubInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Continue with GitHub`)
};

const zh_auth_login_with_github = /** @type {(inputs: Auth_Login_With_GithubInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通过 GitHub 账号登录`)
};

/**
* | output |
* | --- |
* | "Continue with GitHub" |
*
* @param {Auth_Login_With_GithubInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_login_with_github = /** @type {((inputs?: Auth_Login_With_GithubInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Login_With_GithubInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_login_with_github(inputs)
	return zh_auth_login_with_github(inputs)
});