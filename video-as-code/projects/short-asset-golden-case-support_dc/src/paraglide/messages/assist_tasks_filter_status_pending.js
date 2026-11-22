/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Filter_Status_PendingInputs */

const en_assist_tasks_filter_status_pending = /** @type {(inputs: Assist_Tasks_Filter_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pending`)
};

const zh_assist_tasks_filter_status_pending = /** @type {(inputs: Assist_Tasks_Filter_Status_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待处理`)
};

/**
* | output |
* | --- |
* | "Pending" |
*
* @param {Assist_Tasks_Filter_Status_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_pending = /** @type {((inputs?: Assist_Tasks_Filter_Status_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_filter_status_pending(inputs)
	return zh_assist_tasks_filter_status_pending(inputs)
});