/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Knowledge_Failed_Chunks_Selected_CountInputs */

const en_knowledge_failed_chunks_selected_count = /** @type {(inputs: Knowledge_Failed_Chunks_Selected_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} selected`)
};

const zh_knowledge_failed_chunks_selected_count = /** @type {(inputs: Knowledge_Failed_Chunks_Selected_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已选 ${i?.count}`)
};

/**
* | output |
* | --- |
* | "{count} selected" |
*
* @param {Knowledge_Failed_Chunks_Selected_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_failed_chunks_selected_count = /** @type {((inputs: Knowledge_Failed_Chunks_Selected_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Failed_Chunks_Selected_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_failed_chunks_selected_count(inputs)
	return zh_knowledge_failed_chunks_selected_count(inputs)
});