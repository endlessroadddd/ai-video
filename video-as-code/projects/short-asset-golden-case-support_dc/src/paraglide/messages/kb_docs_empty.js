/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Docs_EmptyInputs */

const en_kb_docs_empty = /** @type {(inputs: Kb_Docs_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No document data`)
};

const zh_kb_docs_empty = /** @type {(inputs: Kb_Docs_EmptyInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无文档数据`)
};

/**
* | output |
* | --- |
* | "No document data" |
*
* @param {Kb_Docs_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_docs_empty = /** @type {((inputs?: Kb_Docs_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Docs_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_docs_empty(inputs)
	return zh_kb_docs_empty(inputs)
});