/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Filter_Status_ProcessingInputs */

const en_assist_tasks_filter_status_processing = /** @type {(inputs: Assist_Tasks_Filter_Status_ProcessingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Processing`)
};

const zh_assist_tasks_filter_status_processing = /** @type {(inputs: Assist_Tasks_Filter_Status_ProcessingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`处理中`)
};

/**
* | output |
* | --- |
* | "Processing" |
*
* @param {Assist_Tasks_Filter_Status_ProcessingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_processing = /** @type {((inputs?: Assist_Tasks_Filter_Status_ProcessingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_ProcessingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_filter_status_processing(inputs)
	return zh_assist_tasks_filter_status_processing(inputs)
});