/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Kb_Result_Generated_CountInputs */

const en_kb_result_generated_count = /** @type {(inputs: Kb_Result_Generated_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Generated Knowledge (${i?.count})`)
};

const zh_kb_result_generated_count = /** @type {(inputs: Kb_Result_Generated_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`生成知识 (${i?.count})`)
};

/**
* | output |
* | --- |
* | "Generated Knowledge ({count})" |
*
* @param {Kb_Result_Generated_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_generated_count = /** @type {((inputs: Kb_Result_Generated_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_Generated_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_result_generated_count(inputs)
	return zh_kb_result_generated_count(inputs)
});