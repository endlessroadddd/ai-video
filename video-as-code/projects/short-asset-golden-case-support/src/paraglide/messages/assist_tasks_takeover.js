/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_TakeoverInputs */

const en_assist_tasks_takeover = /** @type {(inputs: Assist_Tasks_TakeoverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Take Over Task`)
};

const zh_assist_tasks_takeover = /** @type {(inputs: Assist_Tasks_TakeoverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`接手任务`)
};

/**
* | output |
* | --- |
* | "Take Over Task" |
*
* @param {Assist_Tasks_TakeoverInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_takeover = /** @type {((inputs?: Assist_Tasks_TakeoverInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_TakeoverInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_takeover(inputs)
	return zh_assist_tasks_takeover(inputs)
});