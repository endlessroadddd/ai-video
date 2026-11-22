/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Dislike_MessageInputs */

const en_client_chat_dislike_message = /** @type {(inputs: Client_Chat_Dislike_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dislike message`)
};

const zh_client_chat_dislike_message = /** @type {(inputs: Client_Chat_Dislike_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点踩回复`)
};

/**
* | output |
* | --- |
* | "Dislike message" |
*
* @param {Client_Chat_Dislike_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_dislike_message = /** @type {((inputs?: Client_Chat_Dislike_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Dislike_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_dislike_message(inputs)
	return zh_client_chat_dislike_message(inputs)
});