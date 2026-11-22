/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Filter_Status_LabelInputs */

const en_assist_tasks_filter_status_label = /** @type {(inputs: Assist_Tasks_Filter_Status_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Status filter`)
};

const zh_assist_tasks_filter_status_label = /** @type {(inputs: Assist_Tasks_Filter_Status_LabelInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`状态筛选`)
};

/**
* | output |
* | --- |
* | "Status filter" |
*
* @param {Assist_Tasks_Filter_Status_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_label = /** @type {((inputs?: Assist_Tasks_Filter_Status_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_filter_status_label(inputs)
	return zh_assist_tasks_filter_status_label(inputs)
});