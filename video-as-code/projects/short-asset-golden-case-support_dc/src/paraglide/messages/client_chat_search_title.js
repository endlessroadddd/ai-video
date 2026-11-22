/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Search_TitleInputs */

const en_client_chat_search_title = /** @type {(inputs: Client_Chat_Search_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Search conversations`)
};

const zh_client_chat_search_title = /** @type {(inputs: Client_Chat_Search_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`搜索对话`)
};

/**
* | output |
* | --- |
* | "Search conversations" |
*
* @param {Client_Chat_Search_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_search_title = /** @type {((inputs?: Client_Chat_Search_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Search_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_search_title(inputs)
	return zh_client_chat_search_title(inputs)
});