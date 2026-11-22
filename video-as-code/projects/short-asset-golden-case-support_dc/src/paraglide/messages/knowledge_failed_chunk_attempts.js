/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Failed_Chunk_AttemptsInputs */

const en_knowledge_failed_chunk_attempts = /** @type {(inputs: Knowledge_Failed_Chunk_AttemptsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} attempt(s)`)
};

const zh_knowledge_failed_chunk_attempts = /** @type {(inputs: Knowledge_Failed_Chunk_AttemptsInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已尝试 ${i?.count} 次`)
};

/**
* | output |
* | --- |
* | "{count} attempt(s)" |
*
* @param {Knowledge_Failed_Chunk_AttemptsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunk_attempts = /** @type {((inputs: Knowledge_Failed_Chunk_AttemptsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunk_AttemptsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_failed_chunk_attempts(inputs)
	return zh_knowledge_failed_chunk_attempts(inputs)
});