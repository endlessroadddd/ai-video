/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_DeletingInputs */

const en_knowledge_deleting = /** @type {(inputs: Knowledge_DeletingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deleting...`)
};

const zh_knowledge_deleting = /** @type {(inputs: Knowledge_DeletingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除中...`)
};

/**
* | output |
* | --- |
* | "Deleting..." |
*
* @param {Knowledge_DeletingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_deleting = /** @type {((inputs?: Knowledge_DeletingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_DeletingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_deleting(inputs)
	return zh_knowledge_deleting(inputs)
});