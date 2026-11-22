/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_SessionsInputs */

const en_client_chat_sessions = /** @type {(inputs: Client_Chat_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sessions`)
};

const zh_client_chat_sessions = /** @type {(inputs: Client_Chat_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会话`)
};

/**
* | output |
* | --- |
* | "Sessions" |
*
* @param {Client_Chat_SessionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_sessions = /** @type {((inputs?: Client_Chat_SessionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_SessionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_sessions(inputs)
	return zh_client_chat_sessions(inputs)
});