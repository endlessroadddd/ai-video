/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Loading_Session_TitleInputs */

const en_client_chat_loading_session_title = /** @type {(inputs: Client_Chat_Loading_Session_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Loading chat title`)
};

const zh_client_chat_loading_session_title = /** @type {(inputs: Client_Chat_Loading_Session_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在加载对话标题`)
};

/**
* | output |
* | --- |
* | "Loading chat title" |
*
* @param {Client_Chat_Loading_Session_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_loading_session_title = /** @type {((inputs?: Client_Chat_Loading_Session_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Loading_Session_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_loading_session_title(inputs)
	return zh_client_chat_loading_session_title(inputs)
});