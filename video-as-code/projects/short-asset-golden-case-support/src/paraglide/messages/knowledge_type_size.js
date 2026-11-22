/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Type_SizeInputs */

const en_knowledge_type_size = /** @type {(inputs: Knowledge_Type_SizeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Type/Size`)
};

const zh_knowledge_type_size = /** @type {(inputs: Knowledge_Type_SizeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`类型/大小`)
};

/**
* | output |
* | --- |
* | "Type/Size" |
*
* @param {Knowledge_Type_SizeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_type_size = /** @type {((inputs?: Knowledge_Type_SizeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Type_SizeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_type_size(inputs)
	return zh_knowledge_type_size(inputs)
});