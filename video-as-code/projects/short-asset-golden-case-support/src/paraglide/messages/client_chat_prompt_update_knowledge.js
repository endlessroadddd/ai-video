/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Client_Chat_Prompt_Update_KnowledgeInputs */

const en_client_chat_prompt_update_knowledge = /** @type {(inputs: Client_Chat_Prompt_Update_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How do I update knowledge in the knowledge base?`)
};

const zh_client_chat_prompt_update_knowledge = /** @type {(inputs: Client_Chat_Prompt_Update_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`如何修改知识库中的知识`)
};

/**
* | output |
* | --- |
* | "How do I update knowledge in the knowledge base?" |
*
* @param {Client_Chat_Prompt_Update_KnowledgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const client_chat_prompt_update_knowledge = /** @type {((inputs?: Client_Chat_Prompt_Update_KnowledgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Client_Chat_Prompt_Update_KnowledgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_client_chat_prompt_update_knowledge(inputs)
	return zh_client_chat_prompt_update_knowledge(inputs)
});