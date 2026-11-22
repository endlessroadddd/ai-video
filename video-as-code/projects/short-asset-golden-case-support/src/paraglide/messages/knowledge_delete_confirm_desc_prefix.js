/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Delete_Confirm_Desc_PrefixInputs */

const en_knowledge_delete_confirm_desc_prefix = /** @type {(inputs: Knowledge_Delete_Confirm_Desc_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This action cannot be undone: `)
};

const zh_knowledge_delete_confirm_desc_prefix = /** @type {(inputs: Knowledge_Delete_Confirm_Desc_PrefixInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`删除后不可恢复：`)
};

/**
* | output |
* | --- |
* | "This action cannot be undone:" |
*
* @param {Knowledge_Delete_Confirm_Desc_PrefixInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_delete_confirm_desc_prefix = /** @type {((inputs?: Knowledge_Delete_Confirm_Desc_PrefixInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Delete_Confirm_Desc_PrefixInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_delete_confirm_desc_prefix(inputs)
	return zh_knowledge_delete_confirm_desc_prefix(inputs)
});