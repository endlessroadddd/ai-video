/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ title: NonNullable<unknown> }} Client_Chat_Reply_Ready_DescriptionInputs */

const en_client_chat_reply_ready_description = /** @type {(inputs: Client_Chat_Reply_Ready_DescriptionInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`A new reply is ready in “${i?.title}”.`)
};

/** @type {(inputs: Client_Chat_Reply_Ready_DescriptionInputs) => LocalizedString} */
const zh_client_chat_reply_ready_description = en_client_chat_reply_ready_description;

/**
* | output |
* | --- |
* | "A new reply is ready in “{title}”." |
*
* @param {Client_Chat_Reply_Ready_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_reply_ready_description = /** @type {((inputs: Client_Chat_Reply_Ready_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Reply_Ready_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_reply_ready_description(inputs)
	return zh_client_chat_reply_ready_description(inputs)
});