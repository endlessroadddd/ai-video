/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Kb_Tab_DocsInputs */

const en_kb_tab_docs = /** @type {(inputs: Kb_Tab_DocsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Documents`)
};

const zh_kb_tab_docs = /** @type {(inputs: Kb_Tab_DocsInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`文档`)
};

/**
* | output |
* | --- |
* | "Documents" |
*
* @param {Kb_Tab_DocsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const kb_tab_docs = /** @type {((inputs?: Kb_Tab_DocsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Kb_Tab_DocsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_kb_tab_docs(inputs)
	return zh_kb_tab_docs(inputs)
});