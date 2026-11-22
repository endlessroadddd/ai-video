/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Type_Bug_ReportInputs */

const en_assist_tasks_type_bug_report = /** @type {(inputs: Assist_Tasks_Type_Bug_ReportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bug Report`)
};

const zh_assist_tasks_type_bug_report = /** @type {(inputs: Assist_Tasks_Type_Bug_ReportInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bug 报告`)
};

/**
* | output |
* | --- |
* | "Bug Report" |
*
* @param {Assist_Tasks_Type_Bug_ReportInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_bug_report = /** @type {((inputs?: Assist_Tasks_Type_Bug_ReportInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Bug_ReportInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_type_bug_report(inputs)
	return zh_assist_tasks_type_bug_report(inputs)
});