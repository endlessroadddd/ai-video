/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Result_RegenerateInputs */

const en_kb_result_regenerate = /** @type {(inputs: Kb_Result_RegenerateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Regenerate`)
};

const zh_kb_result_regenerate = /** @type {(inputs: Kb_Result_RegenerateInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`重新生成`)
};

/**
* | output |
* | --- |
* | "Regenerate" |
*
* @param {Kb_Result_RegenerateInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_result_regenerate = /** @type {((inputs?: Kb_Result_RegenerateInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Result_RegenerateInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_result_regenerate(inputs)
	return zh_kb_result_regenerate(inputs)
});