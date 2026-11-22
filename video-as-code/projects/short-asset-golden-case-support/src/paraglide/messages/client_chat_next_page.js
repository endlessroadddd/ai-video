/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Next_PageInputs */

const en_client_chat_next_page = /** @type {(inputs: Client_Chat_Next_PageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

const zh_client_chat_next_page = /** @type {(inputs: Client_Chat_Next_PageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一页`)
};

/**
* | output |
* | --- |
* | "Next" |
*
* @param {Client_Chat_Next_PageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_next_page = /** @type {((inputs?: Client_Chat_Next_PageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Next_PageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_next_page(inputs)
	return zh_client_chat_next_page(inputs)
});