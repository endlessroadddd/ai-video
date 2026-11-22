/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Assist_Tasks_Save_PendingInputs */

const en_assist_tasks_save_pending = /** @type {(inputs: Assist_Tasks_Save_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saving...`)
};

const zh_assist_tasks_save_pending = /** @type {(inputs: Assist_Tasks_Save_PendingInputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存中...`)
};

/**
* | output |
* | --- |
* | "Saving..." |
*
* @param {Assist_Tasks_Save_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const assist_tasks_save_pending = /** @type {((inputs?: Assist_Tasks_Save_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Assist_Tasks_Save_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_assist_tasks_save_pending(inputs)
	return zh_assist_tasks_save_pending(inputs)
});