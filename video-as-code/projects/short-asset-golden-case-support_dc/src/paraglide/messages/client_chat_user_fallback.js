/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_User_FallbackInputs */

const en_client_chat_user_fallback = /** @type {(inputs: Client_Chat_User_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`User`)
};

const zh_client_chat_user_fallback = /** @type {(inputs: Client_Chat_User_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`用户`)
};

/**
* | output |
* | --- |
* | "User" |
*
* @param {Client_Chat_User_FallbackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_user_fallback = /** @type {((inputs?: Client_Chat_User_FallbackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_User_FallbackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_user_fallback(inputs)
	return zh_client_chat_user_fallback(inputs)
});