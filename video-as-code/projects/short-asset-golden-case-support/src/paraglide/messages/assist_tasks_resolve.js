/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_ResolveInputs */

const en_assist_tasks_resolve = /** @type {(inputs: Assist_Tasks_ResolveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolved`)
};

const zh_assist_tasks_resolve = /** @type {(inputs: Assist_Tasks_ResolveInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已解决`)
};

/**
* | output |
* | --- |
* | "Resolved" |
*
* @param {Assist_Tasks_ResolveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_resolve = /** @type {((inputs?: Assist_Tasks_ResolveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_ResolveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_resolve(inputs)
	return zh_assist_tasks_resolve(inputs)
});