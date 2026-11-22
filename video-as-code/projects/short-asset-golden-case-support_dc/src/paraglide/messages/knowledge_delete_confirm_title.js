/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Knowledge_Delete_Confirm_TitleInputs */

const en_knowledge_delete_confirm_title = /** @type {(inputs: Knowledge_Delete_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Delete knowledge?`)
};

const zh_knowledge_delete_confirm_title = /** @type {(inputs: Knowledge_Delete_Confirm_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`确认删除知识？`)
};

/**
* | output |
* | --- |
* | "Delete knowledge?" |
*
* @param {Knowledge_Delete_Confirm_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const knowledge_delete_confirm_title = /** @type {((inputs?: Knowledge_Delete_Confirm_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Knowledge_Delete_Confirm_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_knowledge_delete_confirm_title(inputs)
	return zh_knowledge_delete_confirm_title(inputs)
});