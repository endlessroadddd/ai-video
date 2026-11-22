/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_View_Adopted_KnowledgeInputs */

const en_assist_tasks_view_adopted_knowledge = /** @type {(inputs: Assist_Tasks_View_Adopted_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View adopted knowledge`)
};

const zh_assist_tasks_view_adopted_knowledge = /** @type {(inputs: Assist_Tasks_View_Adopted_KnowledgeInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看采用的知识`)
};

/**
* | output |
* | --- |
* | "View adopted knowledge" |
*
* @param {Assist_Tasks_View_Adopted_KnowledgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_view_adopted_knowledge = /** @type {((inputs?: Assist_Tasks_View_Adopted_KnowledgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_View_Adopted_KnowledgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_view_adopted_knowledge(inputs)
	return zh_assist_tasks_view_adopted_knowledge(inputs)
});