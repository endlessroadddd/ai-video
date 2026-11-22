/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Empty_DescInputs */

const en_assist_tasks_empty_desc = /** @type {(inputs: Assist_Tasks_Empty_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Try clearing the keyword or switching filters.`)
};

const zh_assist_tasks_empty_desc = /** @type {(inputs: Assist_Tasks_Empty_DescInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可以尝试清空关键词或切换筛选条件。`)
};

/**
* | output |
* | --- |
* | "Try clearing the keyword or switching filters." |
*
* @param {Assist_Tasks_Empty_DescInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_empty_desc = /** @type {((inputs?: Assist_Tasks_Empty_DescInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Empty_DescInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_empty_desc(inputs)
	return zh_assist_tasks_empty_desc(inputs)
});