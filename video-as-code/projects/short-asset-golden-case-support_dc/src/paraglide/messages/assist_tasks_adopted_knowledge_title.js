/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Assist_Tasks_Adopted_Knowledge_TitleInputs */

const en_assist_tasks_adopted_knowledge_title = /** @type {(inputs: Assist_Tasks_Adopted_Knowledge_TitleInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Adopted Knowledge (${i?.count})`)
};

const zh_assist_tasks_adopted_knowledge_title = /** @type {(inputs: Assist_Tasks_Adopted_Knowledge_TitleInputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`采用的知识 (${i?.count})`)
};

/**
* | output |
* | --- |
* | "Adopted Knowledge ({count})" |
*
* @param {Assist_Tasks_Adopted_Knowledge_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_adopted_knowledge_title = /** @type {((inputs: Assist_Tasks_Adopted_Knowledge_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Adopted_Knowledge_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_adopted_knowledge_title(inputs)
	return zh_assist_tasks_adopted_knowledge_title(inputs)
});