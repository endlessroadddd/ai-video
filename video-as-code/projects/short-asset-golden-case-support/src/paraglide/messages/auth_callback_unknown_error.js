/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Callback_Unknown_ErrorInputs */

const en_auth_callback_unknown_error = /** @type {(inputs: Auth_Callback_Unknown_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unknown callback error`)
};

const zh_auth_callback_unknown_error = /** @type {(inputs: Auth_Callback_Unknown_ErrorInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未知回调错误`)
};

/**
* | output |
* | --- |
* | "Unknown callback error" |
*
* @param {Auth_Callback_Unknown_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_callback_unknown_error = /** @type {((inputs?: Auth_Callback_Unknown_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Callback_Unknown_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_callback_unknown_error(inputs)
	return zh_auth_callback_unknown_error(inputs)
});