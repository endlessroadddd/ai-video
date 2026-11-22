/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_EmptyInputs */

const en_kb_empty = /** @type {(inputs: Kb_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No knowledge data`)
};

const zh_kb_empty = /** @type {(inputs: Kb_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无知识数据`)
};

/**
* | output |
* | --- |
* | "No knowledge data" |
*
* @param {Kb_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_empty = /** @type {((inputs?: Kb_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_empty(inputs)
	return zh_kb_empty(inputs)
});