/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Like_MessageInputs */

const en_client_chat_like_message = /** @type {(inputs: Client_Chat_Like_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Like message`)
};

const zh_client_chat_like_message = /** @type {(inputs: Client_Chat_Like_MessageInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`点赞回复`)
};

/**
* | output |
* | --- |
* | "Like message" |
*
* @param {Client_Chat_Like_MessageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_like_message = /** @type {((inputs?: Client_Chat_Like_MessageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Like_MessageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_like_message(inputs)
	return zh_client_chat_like_message(inputs)
});