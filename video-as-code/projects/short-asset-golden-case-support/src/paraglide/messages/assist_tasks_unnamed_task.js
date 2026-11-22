/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Unnamed_TaskInputs */

const en_assist_tasks_unnamed_task = /** @type {(inputs: Assist_Tasks_Unnamed_TaskInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Untitled task`)
};

const zh_assist_tasks_unnamed_task = /** @type {(inputs: Assist_Tasks_Unnamed_TaskInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未命名协助任务`)
};

/**
* | output |
* | --- |
* | "Untitled task" |
*
* @param {Assist_Tasks_Unnamed_TaskInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_unnamed_task = /** @type {((inputs?: Assist_Tasks_Unnamed_TaskInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Unnamed_TaskInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_unnamed_task(inputs)
	return zh_assist_tasks_unnamed_task(inputs)
});