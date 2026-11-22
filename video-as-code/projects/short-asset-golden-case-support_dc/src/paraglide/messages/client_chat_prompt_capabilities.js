/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Prompt_CapabilitiesInputs */

const en_client_chat_prompt_capabilities = /** @type {(inputs: Client_Chat_Prompt_CapabilitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What can Lucius do for me?`)
};

const zh_client_chat_prompt_capabilities = /** @type {(inputs: Client_Chat_Prompt_CapabilitiesInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lucius可以为我做什么？`)
};

/**
* | output |
* | --- |
* | "What can Lucius do for me?" |
*
* @param {Client_Chat_Prompt_CapabilitiesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_prompt_capabilities = /** @type {((inputs?: Client_Chat_Prompt_CapabilitiesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Prompt_CapabilitiesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_prompt_capabilities(inputs)
	return zh_client_chat_prompt_capabilities(inputs)
});