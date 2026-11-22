/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_More_ActionsInputs */

const en_client_chat_more_actions = /** @type {(inputs: Client_Chat_More_ActionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`More actions`)
};

const zh_client_chat_more_actions = /** @type {(inputs: Client_Chat_More_ActionsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更多操作`)
};

/**
* | output |
* | --- |
* | "More actions" |
*
* @param {Client_Chat_More_ActionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_more_actions = /** @type {((inputs?: Client_Chat_More_ActionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_More_ActionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_more_actions(inputs)
	return zh_client_chat_more_actions(inputs)
});