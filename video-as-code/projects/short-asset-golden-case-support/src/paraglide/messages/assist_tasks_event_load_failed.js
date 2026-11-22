/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Event_Load_FailedInputs */

const en_assist_tasks_event_load_failed = /** @type {(inputs: Assist_Tasks_Event_Load_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to load events`)
};

const zh_assist_tasks_event_load_failed = /** @type {(inputs: Assist_Tasks_Event_Load_FailedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件加载失败`)
};

/**
* | output |
* | --- |
* | "Failed to load events" |
*
* @param {Assist_Tasks_Event_Load_FailedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_event_load_failed = /** @type {((inputs?: Assist_Tasks_Event_Load_FailedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Event_Load_FailedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_event_load_failed(inputs)
	return zh_assist_tasks_event_load_failed(inputs)
});