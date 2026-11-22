/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Review_ConfirmedInputs */

const en_assist_tasks_review_confirmed = /** @type {(inputs: Assist_Tasks_Review_ConfirmedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Manually Confirmed`)
};

const zh_assist_tasks_review_confirmed = /** @type {(inputs: Assist_Tasks_Review_ConfirmedInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`人工确认`)
};

/**
* | output |
* | --- |
* | "Manually Confirmed" |
*
* @param {Assist_Tasks_Review_ConfirmedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_review_confirmed = /** @type {((inputs?: Assist_Tasks_Review_ConfirmedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Review_ConfirmedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_review_confirmed(inputs)
	return zh_assist_tasks_review_confirmed(inputs)
});