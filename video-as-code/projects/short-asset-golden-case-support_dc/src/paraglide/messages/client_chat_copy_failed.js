/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Copy_FailedInputs */

const en_client_chat_copy_failed = /** @type {(inputs: Client_Chat_Copy_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to copy message. Please try again.`)
};

const zh_client_chat_copy_failed = /** @type {(inputs: Client_Chat_Copy_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制消息失败，请稍后重试。`)
};

/**
* | output |
* | --- |
* | "Failed to copy message. Please try again." |
*
* @param {Client_Chat_Copy_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_copy_failed = /** @type {((inputs?: Client_Chat_Copy_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Copy_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_copy_failed(inputs)
	return zh_client_chat_copy_failed(inputs)
});