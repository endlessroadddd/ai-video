/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Copy_MessageInputs */

const en_client_chat_copy_message = /** @type {(inputs: Client_Chat_Copy_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy message`)
};

const zh_client_chat_copy_message = /** @type {(inputs: Client_Chat_Copy_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制消息`)
};

/**
* | output |
* | --- |
* | "Copy message" |
*
* @param {Client_Chat_Copy_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_copy_message = /** @type {((inputs?: Client_Chat_Copy_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Copy_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_copy_message(inputs)
	return zh_client_chat_copy_message(inputs)
});