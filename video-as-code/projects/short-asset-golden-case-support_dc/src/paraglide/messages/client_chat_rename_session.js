/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Rename_SessionInputs */

const en_client_chat_rename_session = /** @type {(inputs: Client_Chat_Rename_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rename`)
};

const zh_client_chat_rename_session = /** @type {(inputs: Client_Chat_Rename_SessionInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`修改标题`)
};

/**
* | output |
* | --- |
* | "Rename" |
*
* @param {Client_Chat_Rename_SessionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_rename_session = /** @type {((inputs?: Client_Chat_Rename_SessionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Rename_SessionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_rename_session(inputs)
	return zh_client_chat_rename_session(inputs)
});