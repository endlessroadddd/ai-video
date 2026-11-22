/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Unknown_Error_RetryInputs */

const en_auth_unknown_error_retry = /** @type {(inputs: Auth_Unknown_Error_RetryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown error. Please try again later.`)
};

const zh_auth_unknown_error_retry = /** @type {(inputs: Auth_Unknown_Error_RetryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知错误，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Unknown error. Please try again later." |
*
* @param {Auth_Unknown_Error_RetryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_unknown_error_retry = /** @type {((inputs?: Auth_Unknown_Error_RetryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Unknown_Error_RetryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_unknown_error_retry(inputs)
	return zh_auth_unknown_error_retry(inputs)
});