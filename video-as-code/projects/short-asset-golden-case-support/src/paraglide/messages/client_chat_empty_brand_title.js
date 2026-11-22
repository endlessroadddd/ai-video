/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Empty_Brand_TitleInputs */

const en_client_chat_empty_brand_title = /** @type {(inputs: Client_Chat_Empty_Brand_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius Client Agent`)
};

const zh_client_chat_empty_brand_title = /** @type {(inputs: Client_Chat_Empty_Brand_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius Client Agent`)
};

/**
* | output |
* | --- |
* | "Lucius Client Agent" |
*
* @param {Client_Chat_Empty_Brand_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_empty_brand_title = /** @type {((inputs?: Client_Chat_Empty_Brand_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Empty_Brand_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_empty_brand_title(inputs)
	return zh_client_chat_empty_brand_title(inputs)
});