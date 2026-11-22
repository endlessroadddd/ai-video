/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Session_Not_FoundInputs */

const en_knowledge_session_not_found = /** @type {(inputs: Knowledge_Session_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No session messages found`)
};

const zh_knowledge_session_not_found = /** @type {(inputs: Knowledge_Session_Not_FoundInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未查询到该会话消息`)
};

/**
* | output |
* | --- |
* | "No session messages found" |
*
* @param {Knowledge_Session_Not_FoundInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_session_not_found = /** @type {((inputs?: Knowledge_Session_Not_FoundInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Session_Not_FoundInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_session_not_found(inputs)
	return zh_knowledge_session_not_found(inputs)
});