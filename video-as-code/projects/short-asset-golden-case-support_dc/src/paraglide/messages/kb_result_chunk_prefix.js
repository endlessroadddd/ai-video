/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ index: NonNullable<unknown> }} Kb_Result_Chunk_PrefixInputs */

const en_kb_result_chunk_prefix = /** @type {(inputs: Kb_Result_Chunk_PrefixInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Chunk #${i?.index}`)
};

const zh_kb_result_chunk_prefix = /** @type {(inputs: Kb_Result_Chunk_PrefixInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Chunk #${i?.index}`)
};

/**
* | output |
* | --- |
* | "Chunk #{index}" |
*
* @param {Kb_Result_Chunk_PrefixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_chunk_prefix = /** @type {((inputs: Kb_Result_Chunk_PrefixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_Chunk_PrefixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_result_chunk_prefix(inputs)
	return zh_kb_result_chunk_prefix(inputs)
});