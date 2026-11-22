/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Preview_EmptyInputs */

const en_client_chat_preview_empty = /** @type {(inputs: Client_Chat_Preview_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Empty message`)
};

const zh_client_chat_preview_empty = /** @type {(inputs: Client_Chat_Preview_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`空消息`)
};

/**
* | output |
* | --- |
* | "Empty message" |
*
* @param {Client_Chat_Preview_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_preview_empty = /** @type {((inputs?: Client_Chat_Preview_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Preview_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_preview_empty(inputs)
	return zh_client_chat_preview_empty(inputs)
});