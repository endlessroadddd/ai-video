/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_View_SourceInputs */

const en_knowledge_view_source = /** @type {(inputs: Knowledge_View_SourceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View source`)
};

const zh_knowledge_view_source = /** @type {(inputs: Knowledge_View_SourceInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看来源`)
};

/**
* | output |
* | --- |
* | "View source" |
*
* @param {Knowledge_View_SourceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_view_source = /** @type {((inputs?: Knowledge_View_SourceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_View_SourceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_view_source(inputs)
	return zh_knowledge_view_source(inputs)
});