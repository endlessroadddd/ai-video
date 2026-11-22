/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Session_TodayInputs */

const en_client_chat_session_today = /** @type {(inputs: Client_Chat_Session_TodayInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Today`)
};

const zh_client_chat_session_today = /** @type {(inputs: Client_Chat_Session_TodayInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`今天`)
};

/**
* | output |
* | --- |
* | "Today" |
*
* @param {Client_Chat_Session_TodayInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_session_today = /** @type {((inputs?: Client_Chat_Session_TodayInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Session_TodayInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_session_today(inputs)
	return zh_client_chat_session_today(inputs)
});