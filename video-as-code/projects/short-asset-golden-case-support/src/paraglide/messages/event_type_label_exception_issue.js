/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Type_Label_Exception_IssueInputs */

const en_event_type_label_exception_issue = /** @type {(inputs: Event_Type_Label_Exception_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exception Issue`)
};

const zh_event_type_label_exception_issue = /** @type {(inputs: Event_Type_Label_Exception_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`异常问题`)
};

/**
* | output |
* | --- |
* | "Exception Issue" |
*
* @param {Event_Type_Label_Exception_IssueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_exception_issue = /** @type {((inputs?: Event_Type_Label_Exception_IssueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Exception_IssueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_type_label_exception_issue(inputs)
	return zh_event_type_label_exception_issue(inputs)
});