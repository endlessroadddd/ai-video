/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Input_PlaceholderInputs */

const en_client_chat_input_placeholder = /** @type {(inputs: Client_Chat_Input_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type a message...`)
};

const zh_client_chat_input_placeholder = /** @type {(inputs: Client_Chat_Input_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入消息...`)
};

/**
* | output |
* | --- |
* | "Type a message..." |
*
* @param {Client_Chat_Input_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_input_placeholder = /** @type {((inputs?: Client_Chat_Input_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Input_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_input_placeholder(inputs)
	return zh_client_chat_input_placeholder(inputs)
});