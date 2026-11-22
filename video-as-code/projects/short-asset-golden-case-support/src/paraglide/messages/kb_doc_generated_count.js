/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Doc_Generated_CountInputs */

const en_kb_doc_generated_count = /** @type {(inputs: Kb_Doc_Generated_CountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated Knowledge`)
};

const zh_kb_doc_generated_count = /** @type {(inputs: Kb_Doc_Generated_CountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成知识数量`)
};

/**
* | output |
* | --- |
* | "Generated Knowledge" |
*
* @param {Kb_Doc_Generated_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_doc_generated_count = /** @type {((inputs?: Kb_Doc_Generated_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Doc_Generated_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_doc_generated_count(inputs)
	return zh_kb_doc_generated_count(inputs)
});