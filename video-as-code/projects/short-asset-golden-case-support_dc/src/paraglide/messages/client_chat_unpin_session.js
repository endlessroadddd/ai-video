/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Unpin_SessionInputs */

const en_client_chat_unpin_session = /** @type {(inputs: Client_Chat_Unpin_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Remove star`)
};

const zh_client_chat_unpin_session = /** @type {(inputs: Client_Chat_Unpin_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`取消星标`)
};

/**
* | output |
* | --- |
* | "Remove star" |
*
* @param {Client_Chat_Unpin_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_unpin_session = /** @type {((inputs?: Client_Chat_Unpin_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Unpin_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_unpin_session(inputs)
	return zh_client_chat_unpin_session(inputs)
});