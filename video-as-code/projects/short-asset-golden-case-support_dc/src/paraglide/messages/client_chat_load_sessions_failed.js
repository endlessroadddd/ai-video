/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Load_Sessions_FailedInputs */

const en_client_chat_load_sessions_failed = /** @type {(inputs: Client_Chat_Load_Sessions_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load sessions`)
};

const zh_client_chat_load_sessions_failed = /** @type {(inputs: Client_Chat_Load_Sessions_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会话列表加载失败`)
};

/**
* | output |
* | --- |
* | "Failed to load sessions" |
*
* @param {Client_Chat_Load_Sessions_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_load_sessions_failed = /** @type {((inputs?: Client_Chat_Load_Sessions_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Load_Sessions_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_load_sessions_failed(inputs)
	return zh_client_chat_load_sessions_failed(inputs)
});