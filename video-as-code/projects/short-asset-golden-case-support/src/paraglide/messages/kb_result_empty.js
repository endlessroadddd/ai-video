/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ document_id: NonNullable<unknown> }} Kb_Result_EmptyInputs */

const en_kb_result_empty = /** @type {(inputs: Kb_Result_EmptyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`No result to display (Document ID: ${i?.document_id})`)
};

const zh_kb_result_empty = /** @type {(inputs: Kb_Result_EmptyInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`暂无可展示结果（文档 ID：${i?.document_id}）`)
};

/**
* | output |
* | --- |
* | "No result to display (Document ID: {document_id})" |
*
* @param {Kb_Result_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_empty = /** @type {((inputs: Kb_Result_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_result_empty(inputs)
	return zh_kb_result_empty(inputs)
});