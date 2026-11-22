/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Review_PendingInputs */

const en_assist_tasks_review_pending = /** @type {(inputs: Assist_Tasks_Review_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pending Manual Review`)
};

const zh_assist_tasks_review_pending = /** @type {(inputs: Assist_Tasks_Review_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`待人工确认`)
};

/**
* | output |
* | --- |
* | "Pending Manual Review" |
*
* @param {Assist_Tasks_Review_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_review_pending = /** @type {((inputs?: Assist_Tasks_Review_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Review_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_review_pending(inputs)
	return zh_assist_tasks_review_pending(inputs)
});