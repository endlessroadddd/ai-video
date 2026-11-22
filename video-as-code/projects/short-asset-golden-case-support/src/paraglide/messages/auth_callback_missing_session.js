/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Auth_Callback_Missing_SessionInputs */

const en_auth_callback_missing_session = /** @type {(inputs: Auth_Callback_Missing_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No session was found. Please request a new magic link.`)
};

const zh_auth_callback_missing_session = /** @type {(inputs: Auth_Callback_Missing_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未获取到会话，请重新发送魔法链接。`)
};

/**
* | output |
* | --- |
* | "No session was found. Please request a new magic link." |
*
* @param {Auth_Callback_Missing_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const auth_callback_missing_session = /** @type {((inputs?: Auth_Callback_Missing_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Callback_Missing_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_auth_callback_missing_session(inputs)
	return zh_auth_callback_missing_session(inputs)
});