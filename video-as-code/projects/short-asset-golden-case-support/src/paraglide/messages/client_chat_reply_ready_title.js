/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Reply_Ready_TitleInputs */

const en_client_chat_reply_ready_title = /** @type {(inputs: Client_Chat_Reply_Ready_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius has a new reply`)
};

/** @type {(inputs: Client_Chat_Reply_Ready_TitleInputs) => LocalizedString} */
const zh_client_chat_reply_ready_title = en_client_chat_reply_ready_title;

/**
* | output |
* | --- |
* | "Lucius has a new reply" |
*
* @param {Client_Chat_Reply_Ready_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_reply_ready_title = /** @type {((inputs?: Client_Chat_Reply_Ready_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Reply_Ready_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_reply_ready_title(inputs)
	return zh_client_chat_reply_ready_title(inputs)
});