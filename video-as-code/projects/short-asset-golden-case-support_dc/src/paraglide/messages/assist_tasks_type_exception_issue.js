/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Type_Exception_IssueInputs */

const en_assist_tasks_type_exception_issue = /** @type {(inputs: Assist_Tasks_Type_Exception_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exception Issue`)
};

const zh_assist_tasks_type_exception_issue = /** @type {(inputs: Assist_Tasks_Type_Exception_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`异常问题`)
};

/**
* | output |
* | --- |
* | "Exception Issue" |
*
* @param {Assist_Tasks_Type_Exception_IssueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_exception_issue = /** @type {((inputs?: Assist_Tasks_Type_Exception_IssueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Exception_IssueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_type_exception_issue(inputs)
	return zh_assist_tasks_type_exception_issue(inputs)
});