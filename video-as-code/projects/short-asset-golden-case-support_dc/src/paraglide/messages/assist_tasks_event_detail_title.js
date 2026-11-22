/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Event_Detail_TitleInputs */

const en_assist_tasks_event_detail_title = /** @type {(inputs: Assist_Tasks_Event_Detail_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task Detail`)
};

const zh_assist_tasks_event_detail_title = /** @type {(inputs: Assist_Tasks_Event_Detail_TitleInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任务详情`)
};

/**
* | output |
* | --- |
* | "Task Detail" |
*
* @param {Assist_Tasks_Event_Detail_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_event_detail_title = /** @type {((inputs?: Assist_Tasks_Event_Detail_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Event_Detail_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_event_detail_title(inputs)
	return zh_assist_tasks_event_detail_title(inputs)
});