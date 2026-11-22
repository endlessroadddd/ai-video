/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ status: NonNullable<unknown> }} Knowledge_Session_Load_FailedInputs */

const en_knowledge_session_load_failed = /** @type {(inputs: Knowledge_Session_Load_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Failed to load session: ${i?.status}`)
};

const zh_knowledge_session_load_failed = /** @type {(inputs: Knowledge_Session_Load_FailedInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`会话加载失败：${i?.status}`)
};

/**
* | output |
* | --- |
* | "Failed to load session: {status}" |
*
* @param {Knowledge_Session_Load_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_session_load_failed = /** @type {((inputs: Knowledge_Session_Load_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Session_Load_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_session_load_failed(inputs)
	return zh_knowledge_session_load_failed(inputs)
});