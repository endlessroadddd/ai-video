/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Type_Order_IssueInputs */

const en_assist_tasks_type_order_issue = /** @type {(inputs: Assist_Tasks_Type_Order_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Order Issue`)
};

const zh_assist_tasks_type_order_issue = /** @type {(inputs: Assist_Tasks_Type_Order_IssueInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`订单问题`)
};

/**
* | output |
* | --- |
* | "Order Issue" |
*
* @param {Assist_Tasks_Type_Order_IssueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_order_issue = /** @type {((inputs?: Assist_Tasks_Type_Order_IssueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Order_IssueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_type_order_issue(inputs)
	return zh_assist_tasks_type_order_issue(inputs)
});