/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Attachment_AltInputs */

const en_client_chat_attachment_alt = /** @type {(inputs: Client_Chat_Attachment_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chat attachment`)
};

const zh_client_chat_attachment_alt = /** @type {(inputs: Client_Chat_Attachment_AltInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`聊天附件`)
};

/**
* | output |
* | --- |
* | "Chat attachment" |
*
* @param {Client_Chat_Attachment_AltInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_attachment_alt = /** @type {((inputs?: Client_Chat_Attachment_AltInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Attachment_AltInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_attachment_alt(inputs)
	return zh_client_chat_attachment_alt(inputs)
});