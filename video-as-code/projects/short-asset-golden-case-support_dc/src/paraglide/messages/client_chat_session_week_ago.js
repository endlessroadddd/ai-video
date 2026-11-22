/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Session_Week_AgoInputs */

const en_client_chat_session_week_ago = /** @type {(inputs: Client_Chat_Session_Week_AgoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A week ago`)
};

const zh_client_chat_session_week_ago = /** @type {(inputs: Client_Chat_Session_Week_AgoInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一周前`)
};

/**
* | output |
* | --- |
* | "A week ago" |
*
* @param {Client_Chat_Session_Week_AgoInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_session_week_ago = /** @type {((inputs?: Client_Chat_Session_Week_AgoInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Session_Week_AgoInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_session_week_ago(inputs)
	return zh_client_chat_session_week_ago(inputs)
});