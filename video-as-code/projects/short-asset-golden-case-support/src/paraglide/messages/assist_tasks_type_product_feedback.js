/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Type_Product_FeedbackInputs */

const en_assist_tasks_type_product_feedback = /** @type {(inputs: Assist_Tasks_Type_Product_FeedbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Product Feedback`)
};

const zh_assist_tasks_type_product_feedback = /** @type {(inputs: Assist_Tasks_Type_Product_FeedbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`产品反馈`)
};

/**
* | output |
* | --- |
* | "Product Feedback" |
*
* @param {Assist_Tasks_Type_Product_FeedbackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_type_product_feedback = /** @type {((inputs?: Assist_Tasks_Type_Product_FeedbackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Type_Product_FeedbackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_type_product_feedback(inputs)
	return zh_assist_tasks_type_product_feedback(inputs)
});