/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Role_AssistantInputs */

const en_knowledge_role_assistant = /** @type {(inputs: Knowledge_Role_AssistantInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assistant`)
};

const zh_knowledge_role_assistant = /** @type {(inputs: Knowledge_Role_AssistantInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`助手`)
};

/**
* | output |
* | --- |
* | "Assistant" |
*
* @param {Knowledge_Role_AssistantInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_role_assistant = /** @type {((inputs?: Knowledge_Role_AssistantInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Role_AssistantInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_role_assistant(inputs)
	return zh_knowledge_role_assistant(inputs)
});