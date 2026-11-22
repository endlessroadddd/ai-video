/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Source_Session_RecordInputs */

const en_knowledge_source_session_record = /** @type {(inputs: Knowledge_Source_Session_RecordInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Session Record`)
};

const zh_knowledge_source_session_record = /** @type {(inputs: Knowledge_Source_Session_RecordInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`会话记录`)
};

/**
* | output |
* | --- |
* | "Session Record" |
*
* @param {Knowledge_Source_Session_RecordInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_source_session_record = /** @type {((inputs?: Knowledge_Source_Session_RecordInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Source_Session_RecordInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_source_session_record(inputs)
	return zh_knowledge_source_session_record(inputs)
});