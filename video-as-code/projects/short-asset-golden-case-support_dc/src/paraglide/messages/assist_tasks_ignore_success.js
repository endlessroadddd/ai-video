/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Ignore_SuccessInputs */

const en_assist_tasks_ignore_success = /** @type {(inputs: Assist_Tasks_Ignore_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event ignored.`)
};

const zh_assist_tasks_ignore_success = /** @type {(inputs: Assist_Tasks_Ignore_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件已忽略。`)
};

/**
* | output |
* | --- |
* | "Event ignored." |
*
* @param {Assist_Tasks_Ignore_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignore_success = /** @type {((inputs?: Assist_Tasks_Ignore_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Ignore_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_ignore_success(inputs)
	return zh_assist_tasks_ignore_success(inputs)
});