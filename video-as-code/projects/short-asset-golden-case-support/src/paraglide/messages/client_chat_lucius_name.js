/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Lucius_NameInputs */

const en_client_chat_lucius_name = /** @type {(inputs: Client_Chat_Lucius_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius`)
};

const zh_client_chat_lucius_name = /** @type {(inputs: Client_Chat_Lucius_NameInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius`)
};

/**
* | output |
* | --- |
* | "Lucius" |
*
* @param {Client_Chat_Lucius_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_lucius_name = /** @type {((inputs?: Client_Chat_Lucius_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Lucius_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_lucius_name(inputs)
	return zh_client_chat_lucius_name(inputs)
});