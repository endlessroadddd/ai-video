/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Prompt_Role_DifferenceInputs */

const en_client_chat_prompt_role_difference = /** @type {(inputs: Client_Chat_Prompt_Role_DifferenceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What is the difference between Lucius Agent roles?`)
};

const zh_client_chat_prompt_role_difference = /** @type {(inputs: Client_Chat_Prompt_Role_DifferenceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不同角色的Lucius Agent有哪些区别`)
};

/**
* | output |
* | --- |
* | "What is the difference between Lucius Agent roles?" |
*
* @param {Client_Chat_Prompt_Role_DifferenceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_prompt_role_difference = /** @type {((inputs?: Client_Chat_Prompt_Role_DifferenceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Prompt_Role_DifferenceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_prompt_role_difference(inputs)
	return zh_client_chat_prompt_role_difference(inputs)
});