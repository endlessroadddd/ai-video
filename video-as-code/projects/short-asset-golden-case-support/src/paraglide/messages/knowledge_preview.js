/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_PreviewInputs */

const en_knowledge_preview = /** @type {(inputs: Knowledge_PreviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preview`)
};

const zh_knowledge_preview = /** @type {(inputs: Knowledge_PreviewInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预览`)
};

/**
* | output |
* | --- |
* | "Preview" |
*
* @param {Knowledge_PreviewInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_preview = /** @type {((inputs?: Knowledge_PreviewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_PreviewInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_preview(inputs)
	return zh_knowledge_preview(inputs)
});