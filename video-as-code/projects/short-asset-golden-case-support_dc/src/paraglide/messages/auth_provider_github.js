/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Provider_GithubInputs */

const en_auth_provider_github = /** @type {(inputs: Auth_Provider_GithubInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub`)
};

const zh_auth_provider_github = /** @type {(inputs: Auth_Provider_GithubInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub`)
};

/**
* | output |
* | --- |
* | "GitHub" |
*
* @param {Auth_Provider_GithubInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_provider_github = /** @type {((inputs?: Auth_Provider_GithubInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Provider_GithubInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_provider_github(inputs)
	return zh_auth_provider_github(inputs)
});