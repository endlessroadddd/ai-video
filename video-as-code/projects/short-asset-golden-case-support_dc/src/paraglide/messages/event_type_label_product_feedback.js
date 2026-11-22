/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Event_Type_Label_Product_FeedbackInputs */

const en_event_type_label_product_feedback = /** @type {(inputs: Event_Type_Label_Product_FeedbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Product Feedback`)
};

const zh_event_type_label_product_feedback = /** @type {(inputs: Event_Type_Label_Product_FeedbackInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`产品反馈`)
};

/**
* | output |
* | --- |
* | "Product Feedback" |
*
* @param {Event_Type_Label_Product_FeedbackInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const event_type_label_product_feedback = /** @type {((inputs?: Event_Type_Label_Product_FeedbackInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Event_Type_Label_Product_FeedbackInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_event_type_label_product_feedback(inputs)
	return zh_event_type_label_product_feedback(inputs)
});