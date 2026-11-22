/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Filter_Status_AllInputs */

const en_assist_tasks_filter_status_all = /** @type {(inputs: Assist_Tasks_Filter_Status_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`All Statuses`)
};

const zh_assist_tasks_filter_status_all = /** @type {(inputs: Assist_Tasks_Filter_Status_AllInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全部状态`)
};

/**
* | output |
* | --- |
* | "All Statuses" |
*
* @param {Assist_Tasks_Filter_Status_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_all = /** @type {((inputs?: Assist_Tasks_Filter_Status_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_filter_status_all(inputs)
	return zh_assist_tasks_filter_status_all(inputs)
});