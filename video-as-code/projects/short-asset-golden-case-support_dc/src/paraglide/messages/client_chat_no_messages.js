/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_No_MessagesInputs */

const en_client_chat_no_messages = /** @type {(inputs: Client_Chat_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No messages yet`)
};

const zh_client_chat_no_messages = /** @type {(inputs: Client_Chat_No_MessagesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无消息`)
};

/**
* | output |
* | --- |
* | "No messages yet" |
*
* @param {Client_Chat_No_MessagesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_no_messages = /** @type {((inputs?: Client_Chat_No_MessagesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_No_MessagesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_no_messages(inputs)
	return zh_client_chat_no_messages(inputs)
});