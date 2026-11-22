/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Filter_Status_IgnoredInputs */

const en_assist_tasks_filter_status_ignored = /** @type {(inputs: Assist_Tasks_Filter_Status_IgnoredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ignored`)
};

const zh_assist_tasks_filter_status_ignored = /** @type {(inputs: Assist_Tasks_Filter_Status_IgnoredInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已忽略`)
};

/**
* | output |
* | --- |
* | "Ignored" |
*
* @param {Assist_Tasks_Filter_Status_IgnoredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_filter_status_ignored = /** @type {((inputs?: Assist_Tasks_Filter_Status_IgnoredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Filter_Status_IgnoredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_filter_status_ignored(inputs)
	return zh_assist_tasks_filter_status_ignored(inputs)
});