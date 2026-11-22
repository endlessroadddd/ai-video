/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Pin_SessionInputs */

const en_client_chat_pin_session = /** @type {(inputs: Client_Chat_Pin_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Star chat`)
};

const zh_client_chat_pin_session = /** @type {(inputs: Client_Chat_Pin_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`星标对话`)
};

/**
* | output |
* | --- |
* | "Star chat" |
*
* @param {Client_Chat_Pin_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_pin_session = /** @type {((inputs?: Client_Chat_Pin_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Pin_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_pin_session(inputs)
	return zh_client_chat_pin_session(inputs)
});