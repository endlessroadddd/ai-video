/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Review_Taken_OverInputs */

const en_assist_tasks_review_taken_over = /** @type {(inputs: Assist_Tasks_Review_Taken_OverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Taken Over`)
};

const zh_assist_tasks_review_taken_over = /** @type {(inputs: Assist_Tasks_Review_Taken_OverInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已接手`)
};

/**
* | output |
* | --- |
* | "Taken Over" |
*
* @param {Assist_Tasks_Review_Taken_OverInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_review_taken_over = /** @type {((inputs?: Assist_Tasks_Review_Taken_OverInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Review_Taken_OverInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_review_taken_over(inputs)
	return zh_assist_tasks_review_taken_over(inputs)
});