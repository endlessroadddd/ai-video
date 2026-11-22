/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Type_Knowledge_RequestInputs */

const en_assist_tasks_type_knowledge_request = /** @type {(inputs: Assist_Tasks_Type_Knowledge_RequestInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Knowledge Request`)
};

const zh_assist_tasks_type_knowledge_request = /** @type {(inputs: Assist_Tasks_Type_Knowledge_RequestInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`知识咨询`)
};

/**
* | output |
* | --- |
* | "Knowledge Request" |
*
* @param {Assist_Tasks_Type_Knowledge_RequestInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_knowledge_request = /** @type {((inputs?: Assist_Tasks_Type_Knowledge_RequestInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Knowledge_RequestInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_type_knowledge_request(inputs)
	return zh_assist_tasks_type_knowledge_request(inputs)
});