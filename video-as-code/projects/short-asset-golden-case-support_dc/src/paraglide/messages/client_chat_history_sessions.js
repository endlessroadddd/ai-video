/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_History_SessionsInputs */

const en_client_chat_history_sessions = /** @type {(inputs: Client_Chat_History_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`History`)
};

const zh_client_chat_history_sessions = /** @type {(inputs: Client_Chat_History_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`历史对话`)
};

/**
* | output |
* | --- |
* | "History" |
*
* @param {Client_Chat_History_SessionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_history_sessions = /** @type {((inputs?: Client_Chat_History_SessionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_History_SessionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_history_sessions(inputs)
	return zh_client_chat_history_sessions(inputs)
});