/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Type_Label_Usage_IssueInputs */

const en_event_type_label_usage_issue = /** @type {(inputs: Event_Type_Label_Usage_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Usage Issue`)
};

const zh_event_type_label_usage_issue = /** @type {(inputs: Event_Type_Label_Usage_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用问题`)
};

/**
* | output |
* | --- |
* | "Usage Issue" |
*
* @param {Event_Type_Label_Usage_IssueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_usage_issue = /** @type {((inputs?: Event_Type_Label_Usage_IssueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Usage_IssueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_type_label_usage_issue(inputs)
	return zh_event_type_label_usage_issue(inputs)
});