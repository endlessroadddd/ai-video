/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_IgnoreInputs */

const en_assist_tasks_ignore = /** @type {(inputs: Assist_Tasks_IgnoreInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ignore`)
};

const zh_assist_tasks_ignore = /** @type {(inputs: Assist_Tasks_IgnoreInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`忽略`)
};

/**
* | output |
* | --- |
* | "Ignore" |
*
* @param {Assist_Tasks_IgnoreInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_ignore = /** @type {((inputs?: Assist_Tasks_IgnoreInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_IgnoreInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_ignore(inputs)
	return zh_assist_tasks_ignore(inputs)
});