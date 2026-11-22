/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Takeover_SuccessInputs */

const en_assist_tasks_takeover_success = /** @type {(inputs: Assist_Tasks_Takeover_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Event taken over.`)
};

const zh_assist_tasks_takeover_success = /** @type {(inputs: Assist_Tasks_Takeover_SuccessInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`事件已接手。`)
};

/**
* | output |
* | --- |
* | "Event taken over." |
*
* @param {Assist_Tasks_Takeover_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_takeover_success = /** @type {((inputs?: Assist_Tasks_Takeover_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Takeover_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_takeover_success(inputs)
	return zh_assist_tasks_takeover_success(inputs)
});