/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Copy_SuccessInputs */

const en_client_chat_copy_success = /** @type {(inputs: Client_Chat_Copy_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Message copied.`)
};

const zh_client_chat_copy_success = /** @type {(inputs: Client_Chat_Copy_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已复制消息。`)
};

/**
* | output |
* | --- |
* | "Message copied." |
*
* @param {Client_Chat_Copy_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_copy_success = /** @type {((inputs?: Client_Chat_Copy_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Copy_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_copy_success(inputs)
	return zh_client_chat_copy_success(inputs)
});