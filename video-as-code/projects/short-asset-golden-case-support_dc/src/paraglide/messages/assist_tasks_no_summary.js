/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_No_SummaryInputs */

const en_assist_tasks_no_summary = /** @type {(inputs: Assist_Tasks_No_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No event summary`)
};

const zh_assist_tasks_no_summary = /** @type {(inputs: Assist_Tasks_No_SummaryInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暂无事件摘要`)
};

/**
* | output |
* | --- |
* | "No event summary" |
*
* @param {Assist_Tasks_No_SummaryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_no_summary = /** @type {((inputs?: Assist_Tasks_No_SummaryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_No_SummaryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_no_summary(inputs)
	return zh_assist_tasks_no_summary(inputs)
});