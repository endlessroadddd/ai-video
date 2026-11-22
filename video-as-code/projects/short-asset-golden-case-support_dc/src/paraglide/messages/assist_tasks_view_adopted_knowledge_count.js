/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_View_Adopted_Knowledge_CountInputs */

const en_assist_tasks_view_adopted_knowledge_count = /** @type {(inputs: Assist_Tasks_View_Adopted_Knowledge_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`View adopted knowledge, ${i?.count} item(s)`)
};

const zh_assist_tasks_view_adopted_knowledge_count = /** @type {(inputs: Assist_Tasks_View_Adopted_Knowledge_CountInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`查看采用的知识，共 ${i?.count} 条`)
};

/**
* | output |
* | --- |
* | "View adopted knowledge, {count} item(s)" |
*
* @param {Assist_Tasks_View_Adopted_Knowledge_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_view_adopted_knowledge_count = /** @type {((inputs: Assist_Tasks_View_Adopted_Knowledge_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_View_Adopted_Knowledge_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_view_adopted_knowledge_count(inputs)
	return zh_assist_tasks_view_adopted_knowledge_count(inputs)
});