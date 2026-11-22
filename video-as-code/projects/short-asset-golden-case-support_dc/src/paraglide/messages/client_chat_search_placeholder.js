/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Search_PlaceholderInputs */

const en_client_chat_search_placeholder = /** @type {(inputs: Client_Chat_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enter keyword`)
};

const zh_client_chat_search_placeholder = /** @type {(inputs: Client_Chat_Search_PlaceholderInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`输入关键词`)
};

/**
* | output |
* | --- |
* | "Enter keyword" |
*
* @param {Client_Chat_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_search_placeholder = /** @type {((inputs?: Client_Chat_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_search_placeholder(inputs)
	return zh_client_chat_search_placeholder(inputs)
});