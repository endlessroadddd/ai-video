/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Kb_Result_Updated_CountInputs */

const en_kb_result_updated_count = /** @type {(inputs: Kb_Result_Updated_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Updated Knowledge (${i?.count})`)
};

const zh_kb_result_updated_count = /** @type {(inputs: Kb_Result_Updated_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`更新知识 (${i?.count})`)
};

/**
* | output |
* | --- |
* | "Updated Knowledge ({count})" |
*
* @param {Kb_Result_Updated_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_updated_count = /** @type {((inputs: Kb_Result_Updated_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_Updated_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_result_updated_count(inputs)
	return zh_kb_result_updated_count(inputs)
});