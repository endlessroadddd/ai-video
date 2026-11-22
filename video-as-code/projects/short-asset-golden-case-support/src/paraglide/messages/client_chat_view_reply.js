/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_View_ReplyInputs */

const en_client_chat_view_reply = /** @type {(inputs: Client_Chat_View_ReplyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View`)
};

/** @type {(inputs: Client_Chat_View_ReplyInputs) => LocalizedString} */
const zh_client_chat_view_reply = en_client_chat_view_reply;

/**
* | output |
* | --- |
* | "View" |
*
* @param {Client_Chat_View_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_view_reply = /** @type {((inputs?: Client_Chat_View_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_View_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_view_reply(inputs)
	return zh_client_chat_view_reply(inputs)
});