/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_ReplyingInputs */

const en_client_chat_replying = /** @type {(inputs: Client_Chat_ReplyingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius is replying`)
};

/** @type {(inputs: Client_Chat_ReplyingInputs) => LocalizedString} */
const zh_client_chat_replying = en_client_chat_replying;

/**
* | output |
* | --- |
* | "Lucius is replying" |
*
* @param {Client_Chat_ReplyingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_replying = /** @type {((inputs?: Client_Chat_ReplyingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_ReplyingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_replying(inputs)
	return zh_client_chat_replying(inputs)
});