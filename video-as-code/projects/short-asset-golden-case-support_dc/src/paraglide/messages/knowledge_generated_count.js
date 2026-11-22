/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Generated_CountInputs */

const en_knowledge_generated_count = /** @type {(inputs: Knowledge_Generated_CountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated Knowledge`)
};

const zh_knowledge_generated_count = /** @type {(inputs: Knowledge_Generated_CountInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成数量`)
};

/**
* | output |
* | --- |
* | "Generated Knowledge" |
*
* @param {Knowledge_Generated_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_generated_count = /** @type {((inputs?: Knowledge_Generated_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Generated_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_generated_count(inputs)
	return zh_knowledge_generated_count(inputs)
});