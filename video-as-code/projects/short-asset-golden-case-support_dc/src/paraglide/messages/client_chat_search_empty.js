/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Search_EmptyInputs */

const en_client_chat_search_empty = /** @type {(inputs: Client_Chat_Search_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No matching conversations`)
};

const zh_client_chat_search_empty = /** @type {(inputs: Client_Chat_Search_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`没有匹配的对话`)
};

/**
* | output |
* | --- |
* | "No matching conversations" |
*
* @param {Client_Chat_Search_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_search_empty = /** @type {((inputs?: Client_Chat_Search_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Search_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_search_empty(inputs)
	return zh_client_chat_search_empty(inputs)
});