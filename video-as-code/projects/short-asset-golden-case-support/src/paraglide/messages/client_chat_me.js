/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_MeInputs */

const en_client_chat_me = /** @type {(inputs: Client_Chat_MeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Me`)
};

const zh_client_chat_me = /** @type {(inputs: Client_Chat_MeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`我`)
};

/**
* | output |
* | --- |
* | "Me" |
*
* @param {Client_Chat_MeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_me = /** @type {((inputs?: Client_Chat_MeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_MeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_me(inputs)
	return zh_client_chat_me(inputs)
});