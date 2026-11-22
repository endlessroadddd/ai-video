/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Empty_Input_HintInputs */

const en_client_chat_empty_input_hint = /** @type {(inputs: Client_Chat_Empty_Input_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Which step should I click?`)
};

const zh_client_chat_empty_input_hint = /** @type {(inputs: Client_Chat_Empty_Input_HintInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这一步点哪里？`)
};

/**
* | output |
* | --- |
* | "Which step should I click?" |
*
* @param {Client_Chat_Empty_Input_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_empty_input_hint = /** @type {((inputs?: Client_Chat_Empty_Input_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Empty_Input_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_empty_input_hint(inputs)
	return zh_client_chat_empty_input_hint(inputs)
});