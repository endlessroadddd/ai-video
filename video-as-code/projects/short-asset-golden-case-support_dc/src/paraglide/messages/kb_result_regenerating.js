/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Result_RegeneratingInputs */

const en_kb_result_regenerating = /** @type {(inputs: Kb_Result_RegeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Regenerating...`)
};

const zh_kb_result_regenerating = /** @type {(inputs: Kb_Result_RegeneratingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新生成中...`)
};

/**
* | output |
* | --- |
* | "Regenerating..." |
*
* @param {Kb_Result_RegeneratingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_regenerating = /** @type {((inputs?: Kb_Result_RegeneratingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_RegeneratingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_result_regenerating(inputs)
	return zh_kb_result_regenerating(inputs)
});