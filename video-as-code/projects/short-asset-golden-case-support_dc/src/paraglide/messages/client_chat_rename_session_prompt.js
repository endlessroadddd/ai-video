/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Rename_Session_PromptInputs */

const en_client_chat_rename_session_prompt = /** @type {(inputs: Client_Chat_Rename_Session_PromptInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter a new chat title`)
};

const zh_client_chat_rename_session_prompt = /** @type {(inputs: Client_Chat_Rename_Session_PromptInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入新的对话标题`)
};

/**
* | output |
* | --- |
* | "Enter a new chat title" |
*
* @param {Client_Chat_Rename_Session_PromptInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_rename_session_prompt = /** @type {((inputs?: Client_Chat_Rename_Session_PromptInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Rename_Session_PromptInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_rename_session_prompt(inputs)
	return zh_client_chat_rename_session_prompt(inputs)
});