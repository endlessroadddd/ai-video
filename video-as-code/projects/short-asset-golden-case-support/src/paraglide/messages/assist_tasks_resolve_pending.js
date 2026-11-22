/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Resolve_PendingInputs */

const en_assist_tasks_resolve_pending = /** @type {(inputs: Assist_Tasks_Resolve_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Resolving...`)
};

const zh_assist_tasks_resolve_pending = /** @type {(inputs: Assist_Tasks_Resolve_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`结束中...`)
};

/**
* | output |
* | --- |
* | "Resolving..." |
*
* @param {Assist_Tasks_Resolve_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_resolve_pending = /** @type {((inputs?: Assist_Tasks_Resolve_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Resolve_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_resolve_pending(inputs)
	return zh_assist_tasks_resolve_pending(inputs)
});