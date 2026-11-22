/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Draft_SessionInputs */

const en_client_chat_draft_session = /** @type {(inputs: Client_Chat_Draft_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Untitled chat`)
};

const zh_client_chat_draft_session = /** @type {(inputs: Client_Chat_Draft_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未命名对话`)
};

/**
* | output |
* | --- |
* | "Untitled chat" |
*
* @param {Client_Chat_Draft_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_draft_session = /** @type {((inputs?: Client_Chat_Draft_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Draft_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_draft_session(inputs)
	return zh_client_chat_draft_session(inputs)
});