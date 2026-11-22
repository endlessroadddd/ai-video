/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Empty_TitleInputs */

const en_assist_tasks_empty_title = /** @type {(inputs: Assist_Tasks_Empty_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No tasks match the current filters`)
};

const zh_assist_tasks_empty_title = /** @type {(inputs: Assist_Tasks_Empty_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前筛选条件下暂无协助任务`)
};

/**
* | output |
* | --- |
* | "No tasks match the current filters" |
*
* @param {Assist_Tasks_Empty_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_empty_title = /** @type {((inputs?: Assist_Tasks_Empty_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Empty_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_empty_title(inputs)
	return zh_assist_tasks_empty_title(inputs)
});