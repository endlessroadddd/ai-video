/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Provider_GoogleInputs */

const en_auth_provider_google = /** @type {(inputs: Auth_Provider_GoogleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Google`)
};

const zh_auth_provider_google = /** @type {(inputs: Auth_Provider_GoogleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Google`)
};

/**
* | output |
* | --- |
* | "Google" |
*
* @param {Auth_Provider_GoogleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_provider_google = /** @type {((inputs?: Auth_Provider_GoogleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Provider_GoogleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_provider_google(inputs)
	return zh_auth_provider_google(inputs)
});