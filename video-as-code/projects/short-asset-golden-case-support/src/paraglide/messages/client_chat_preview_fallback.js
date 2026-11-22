/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Preview_FallbackInputs */

const en_client_chat_preview_fallback = /** @type {(inputs: Client_Chat_Preview_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Session`)
};

const zh_client_chat_preview_fallback = /** @type {(inputs: Client_Chat_Preview_FallbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会话`)
};

/**
* | output |
* | --- |
* | "Session" |
*
* @param {Client_Chat_Preview_FallbackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_preview_fallback = /** @type {((inputs?: Client_Chat_Preview_FallbackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Preview_FallbackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_preview_fallback(inputs)
	return zh_client_chat_preview_fallback(inputs)
});