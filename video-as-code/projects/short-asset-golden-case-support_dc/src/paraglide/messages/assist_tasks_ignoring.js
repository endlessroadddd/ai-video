/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_IgnoringInputs */

const en_assist_tasks_ignoring = /** @type {(inputs: Assist_Tasks_IgnoringInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ignoring...`)
};

const zh_assist_tasks_ignoring = /** @type {(inputs: Assist_Tasks_IgnoringInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`忽略中...`)
};

/**
* | output |
* | --- |
* | "Ignoring..." |
*
* @param {Assist_Tasks_IgnoringInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignoring = /** @type {((inputs?: Assist_Tasks_IgnoringInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_IgnoringInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_ignoring(inputs)
	return zh_assist_tasks_ignoring(inputs)
});