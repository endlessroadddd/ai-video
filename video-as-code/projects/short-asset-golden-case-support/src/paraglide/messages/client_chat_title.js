/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_TitleInputs */

const en_client_chat_title = /** @type {(inputs: Client_Chat_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chat`)
};

const zh_client_chat_title = /** @type {(inputs: Client_Chat_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`对话`)
};

/**
* | output |
* | --- |
* | "Chat" |
*
* @param {Client_Chat_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_title = /** @type {((inputs?: Client_Chat_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_title(inputs)
	return zh_client_chat_title(inputs)
});