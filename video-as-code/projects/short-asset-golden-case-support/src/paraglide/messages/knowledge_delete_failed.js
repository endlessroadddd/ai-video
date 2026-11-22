/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Delete_FailedInputs */

const en_knowledge_delete_failed = /** @type {(inputs: Knowledge_Delete_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete failed`)
};

const zh_knowledge_delete_failed = /** @type {(inputs: Knowledge_Delete_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除失败`)
};

/**
* | output |
* | --- |
* | "Delete failed" |
*
* @param {Knowledge_Delete_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_delete_failed = /** @type {((inputs?: Knowledge_Delete_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Delete_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_delete_failed(inputs)
	return zh_knowledge_delete_failed(inputs)
});