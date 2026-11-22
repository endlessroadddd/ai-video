/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_SendingInputs */

const en_client_chat_sending = /** @type {(inputs: Client_Chat_SendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sending`)
};

const zh_client_chat_sending = /** @type {(inputs: Client_Chat_SendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`发送中`)
};

/**
* | output |
* | --- |
* | "Sending" |
*
* @param {Client_Chat_SendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_sending = /** @type {((inputs?: Client_Chat_SendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_SendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_sending(inputs)
	return zh_client_chat_sending(inputs)
});