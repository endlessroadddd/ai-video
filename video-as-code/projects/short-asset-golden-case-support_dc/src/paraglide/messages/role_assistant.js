/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Role_AssistantInputs */

const en_role_assistant = /** @type {(inputs: Role_AssistantInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Assistant`)
};

const zh_role_assistant = /** @type {(inputs: Role_AssistantInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`助手`)
};

/**
* | output |
* | --- |
* | "Assistant" |
*
* @param {Role_AssistantInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const role_assistant = /** @type {((inputs?: Role_AssistantInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Role_AssistantInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_role_assistant(inputs)
	return zh_role_assistant(inputs)
});