/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Prompt_Invite_AgentInputs */

const en_client_chat_prompt_invite_agent = /** @type {(inputs: Client_Chat_Prompt_Invite_AgentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How do I invite Lucius Agent into a user community?`)
};

const zh_client_chat_prompt_invite_agent = /** @type {(inputs: Client_Chat_Prompt_Invite_AgentInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`如何将Lucius Agent邀请至用户社群`)
};

/**
* | output |
* | --- |
* | "How do I invite Lucius Agent into a user community?" |
*
* @param {Client_Chat_Prompt_Invite_AgentInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_prompt_invite_agent = /** @type {((inputs?: Client_Chat_Prompt_Invite_AgentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Prompt_Invite_AgentInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_prompt_invite_agent(inputs)
	return zh_client_chat_prompt_invite_agent(inputs)
});