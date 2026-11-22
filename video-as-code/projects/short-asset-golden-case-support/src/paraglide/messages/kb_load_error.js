/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ message: NonNullable<unknown> }} Kb_Load_ErrorInputs */

const en_kb_load_error = /** @type {(inputs: Kb_Load_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Knowledge load failed: ${i?.message}`)
};

const zh_kb_load_error = /** @type {(inputs: Kb_Load_ErrorInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`知识库加载失败：${i?.message}`)
};

/**
* | output |
* | --- |
* | "Knowledge load failed: {message}" |
*
* @param {Kb_Load_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_load_error = /** @type {((inputs: Kb_Load_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Load_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_load_error(inputs)
	return zh_kb_load_error(inputs)
});