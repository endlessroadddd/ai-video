/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_New_SessionInputs */

const en_client_chat_new_session = /** @type {(inputs: Client_Chat_New_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`New chat`)
};

const zh_client_chat_new_session = /** @type {(inputs: Client_Chat_New_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新对话`)
};

/**
* | output |
* | --- |
* | "New chat" |
*
* @param {Client_Chat_New_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_new_session = /** @type {((inputs?: Client_Chat_New_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_New_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_new_session(inputs)
	return zh_client_chat_new_session(inputs)
});