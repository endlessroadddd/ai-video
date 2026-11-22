/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Empty_SessionsInputs */

const en_client_chat_empty_sessions = /** @type {(inputs: Client_Chat_Empty_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No chats yet. Click “New chat” to begin.`)
};

const zh_client_chat_empty_sessions = /** @type {(inputs: Client_Chat_Empty_SessionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无对话，点击“新对话”开始。`)
};

/**
* | output |
* | --- |
* | "No chats yet. Click “New chat” to begin." |
*
* @param {Client_Chat_Empty_SessionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_empty_sessions = /** @type {((inputs?: Client_Chat_Empty_SessionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Empty_SessionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_empty_sessions(inputs)
	return zh_client_chat_empty_sessions(inputs)
});