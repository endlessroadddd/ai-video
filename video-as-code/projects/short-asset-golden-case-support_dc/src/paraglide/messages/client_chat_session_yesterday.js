/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Session_YesterdayInputs */

const en_client_chat_session_yesterday = /** @type {(inputs: Client_Chat_Session_YesterdayInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Yesterday`)
};

const zh_client_chat_session_yesterday = /** @type {(inputs: Client_Chat_Session_YesterdayInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`昨天`)
};

/**
* | output |
* | --- |
* | "Yesterday" |
*
* @param {Client_Chat_Session_YesterdayInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_session_yesterday = /** @type {((inputs?: Client_Chat_Session_YesterdayInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Session_YesterdayInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_session_yesterday(inputs)
	return zh_client_chat_session_yesterday(inputs)
});